import envConfig from "../config/env.config";
import { ApplicationException } from "../helper/error.helper";
import { signJwt } from "../helper/jwt.helper";
import { compareHash, hashValue } from "../helper/password-encryption.helper";
import { serviceSuccess } from "../helper/service.heloper";
import {
  IUserRepository,
  IUserRequestData,
  IUserService
} from "../interfaces/user.interface";
import { JwtPaylaod } from "../types/jwt.types";
import { TServiceSuccess } from "../types/service.type";

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
      twoFactorAuth: { activated: false, secret: null, recoveryCodes: [] }
    });

    return serviceSuccess("User registered", { userId: String(newUser._id) });
  };
  login = async (payload: IUserRequestData["login"]["body"]) => {
    //  check user exists
    const user = await this.userRepository.findOne(
      { email: payload.email },
      "+password"
    );

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
      stage: "password"
    };

    const accessToken = signJwt(
      tokenPayload,
      envConfig.ACCESS_TOKEN_SECRET,
      envConfig.ACCESS_TOKEN_EXPIRE
    );

    return serviceSuccess("Login successfully", {
      userId: String(user._id),
      accessToken
    });
  };
}
