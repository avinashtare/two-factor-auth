import envConfig from "../config/env.config";
import { generateRecoveryCodes, generateTOTP } from "../helper/2fa.heloper";
import { ApplicationException } from "../helper/error.helper";
import { signJwt } from "../helper/jwt.helper";
import { compareHash, hashValue } from "../helper/password-encryption.helper";
import { createQRCodeDataURL } from "../helper/qr.heloper";
import { serviceSuccess } from "../helper/service.heloper";
import { IUserRepository, IUserRequestData, IUserService } from "../interfaces/user.interface";
import { JwtPaylaod } from "../types/jwt.types";
import { daysMiliSeconds, minutesMiliSeconds } from "../helper/date-time.helper";
import { IUserSchema } from "../types/user.type";

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

  recover2FA = async (payload: IUserRequestData["recover2FA"]) => {
    const { body, user } = payload;

    // user param recovery code
    const inputRecoverCode = body.recoverCode;

    // all recover code
    const recoveryCodes = user.twoFactorAuth.recoveryCodes;

    // check user 2fa activated or not
    const is2FAActivated = user.twoFactorAuth.activated;

    if (!is2FAActivated) throw new ApplicationException("Recovery failed", 400);

    let validRCodes: IUserSchema["twoFactorAuth"]["recoveryCodes"][0] | null = null;

    for (const rc of recoveryCodes) {
      if (!rc.used) {
        const isCodeValid = await compareHash(inputRecoverCode, rc.code);

        // recovery code match
        if (isCodeValid) {
          validRCodes = rc;
          break;
        }
      }
    }

    // recovery code no mathc
    if (!validRCodes) {
      throw new ApplicationException("Recovery failed", 400);
    }

    // update used recovery code
    const updateRecoveryCodes = recoveryCodes.map((rc) => {
      if (rc.code == validRCodes.code) {
        return { code: rc.code, used: true };
      }
      return rc;
    });

    const updateCodes = await this.userRepository.updateOne(
      { _id: String(user._id) },
      { $set: { "twoFactorAuth.recoveryCodes": updateRecoveryCodes } },
    );

    // if not able to update  recoveryCodes
    if (updateCodes.modifiedCount === 0) {
      throw new ApplicationException("Recovery failed", 400);
    }

    // generate long access token
    const accessToken = signJwt({ stage: "2fa", userId: String(user._id) }, envConfig.ACCESS_TOKEN_SECRET, daysMiliSeconds(30));

    return serviceSuccess("Logged in using recovery success", { userId: String(user._id), accessToken });
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
  me = (payload: IUserRequestData["me"]) => {
    let { user } = payload;

    return serviceSuccess("User data", {
      userId: String(user._id),
      name: user.name,
      email: user.email,
      twoFactorAuth: { activated: false },
      createdAt: user.createdAt!,
    });
  };
  logout = (payload: IUserRequestData["logout"]) => {
    return serviceSuccess("Logout success", { userId: String(payload.user._id) });
  };
}
