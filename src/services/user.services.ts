import { ApplicationException } from "../helper/error.helper";
import { hashValue } from "../helper/password-encryption.helper";
import { serviceSuccess } from "../helper/service.heloper";
import {
  IUserRepository,
  IUserRequestData,
  IUserService
} from "../interfaces/user.interface";
import { TServiceSuccess } from "../types/service.type";

export default class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}
  // register= async(paylaod: IUserRequestData["register"]["body"]) => Promise<TServiceSuccess<{ userId: string; }>>;
  register = async (paylaod: IUserRequestData["register"]["body"]) => {
    //  check user exists
    const user = await this.userRepository.findOne({ email: paylaod.email });

    if (user) {
      throw new ApplicationException("User already exist", 400);
    }

    // hash password
    const hashPassword = await hashValue(paylaod.password);

    // register user in db
    const newUser = await this.userRepository.create({
      name: paylaod.name,
      email: paylaod.email,
      password: hashPassword,
      twoFactorAuth: { activated: false, secret: null, recoveryCodes: [] }
    });

    return serviceSuccess("User registered", { userId: String(newUser._id) });
  };
}
