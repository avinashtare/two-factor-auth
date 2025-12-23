import { Secret } from "otpauth";
import envConfig from "../config/env.config";
import { generateRecoveryCodes, generateTOTP } from "../helper/2fa.heloper";
import { ApplicationException } from "../helper/error.helper";
import { signJwt } from "../helper/jwt.helper";
import { compareHash, hashValue } from "../helper/password-encryption.helper";
import { createQRCodeDataURL } from "../helper/qr.heloper";
import { serviceSuccess } from "../helper/service.heloper";
import { IUserRepository, IUserRequestData, IUserService } from "../interfaces/user.interface";
import { JwtPaylaod } from "../types/jwt.types";
import { TServiceSuccess } from "../types/service.type";
import { daysMiliSeconds, minutesMiliSeconds } from "../helper/date-time.helper";

export default class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}
  register = async (payload: IUserRequestData["register"]["body"]) => {
    //  check user exists
    const user = await this.userRepository.findOne({ email: payload.email });

    if (user) {
      throw new ApplicationException("User already exist", 400);
    }

    // hash password
    const hashPassword = await hashValue(payload.password);

    // register user in db
    const newUser = await this.userRepository.create({
      name: payload.name,
      email: payload.email,
      password: hashPassword,
      twoFactorAuth: { activated: false, secret: null, recoveryCodes: [] },
    });

    return serviceSuccess("User registered", { userId: String(newUser._id) });
  };
  login = async (payload: IUserRequestData["login"]["body"]) => {
    //  check user exists
    const user = await this.userRepository.findOne({ email: payload.email }, "+password");

    if (!user) {
      throw new ApplicationException("Invalid credentials", 400);
    }

    // comapre password
    const verifyPassword = await compareHash(payload.password, user.password);

    if (!verifyPassword) {
      // password not match
      throw new ApplicationException("Invalid credentials", 400);
    }

    // create access token (token generation using jwt)
    const tokenPayload: JwtPaylaod = {
      userId: String(user._id),
      stage: "password",
    };

    // generate short access token
    const accessToken = signJwt(tokenPayload, envConfig.ACCESS_TOKEN_SECRET, minutesMiliSeconds(5));

    return serviceSuccess("Login successfully", {
      userId: String(user._id),
      accessToken,
    });
  };

  activate2FA = async (user: IUserRequestData["activate2FA"]["user"]) => {
    const is2FAActivated = user.twoFactorAuth.activated;

    if (is2FAActivated) {
      throw new ApplicationException("Already Activated", 400);
    }

    // TOTP (time based otp) generation
    const totp = generateTOTP(user.name);
    const otpAuth = totp.toString();

    // Generate url
    const qrDataUrl = await createQRCodeDataURL(otpAuth);

    // properties
    const secret = totp.secret.base32;
    const recoveryCodes = await generateRecoveryCodes(10);

    // update user
    const updateUser = await this.userRepository.updateOne(
      { _id: String(user._id) },
      { $set: { "twoFactorAuth.secret": secret, "twoFactorAuth.recoveryCodes": recoveryCodes.hashed.map((code) => ({ code, used: false })) } },
    );

    // if not able to update secret and recoveryCodes
    if (updateUser.modifiedCount === 0) {
      throw new ApplicationException("Activation failed", 400);
    }

    // 2FA QR generation
    return serviceSuccess("Activation completed", { qrDataUrl, recoveryCodes: recoveryCodes.plainText });
  };
  verify2FA = async (payload: IUserRequestData["verify2FA"]) => {
    const { user } = payload;
    const totp = generateTOTP(user.name, user.twoFactorAuth.secret!);

    // delta value if 0 otp is valid
    const delta = totp.validate({
      token: payload.body.totp,
      window: 1, // allow only current otp like (30s not previous) is you want previous use windows 2 as you want
    });

    if (delta !== 0) {
      throw new ApplicationException("Invalid credentials", 400);
    }

    const is2FAActivated = user.twoFactorAuth.activated;

    // if already activated
    if (!is2FAActivated) {
      // update user activaton
      const updateUserActivaton = await this.userRepository.updateOne({ _id: String(user._id) }, { $set: { "twoFactorAuth.activated": true } });

      // if not able to update activated status
      if (updateUserActivaton.modifiedCount === 0) {
        throw new ApplicationException("Invalid credentials", 400);
      }
    }
    // else {
    //   throw new ApplicationException("Unauthorised", 401);
    // }

    // generate long access token
    const accessToken = signJwt({ stage: "2fa", userId: String(user._id) }, envConfig.ACCESS_TOKEN_SECRET, daysMiliSeconds(30));

    return serviceSuccess("TwoFactorAuth Suucess", { userId: String(user._id), accessToken });
  };
}
