import { RequestHandler } from "express";
import { IUserController, IUserRequestData, IUserService } from "../interfaces/user.interface";
import { loginUserValidator, registerUserValidator, verify2FAValidator } from "../validator/user.validator";
import { getCookieOptions } from "../helper/cookie.helper";
import { IAuthenticatedRequest } from "../types/auth.type";
import { daysMiliSeconds, minutesSeconds } from "../helper/date-time.helper";

export default class UserController implements IUserController {
  constructor(private userService: IUserService) {}
  register: RequestHandler = async (req, res, next) => {
    const body = req.body as IUserRequestData["register"]["body"];

    // validate user data
    const { success, data, error } = registerUserValidator.safeParse(body);

    if (!success) {
      next(error);
      return;
    }

    // create user service
    const response = await this.userService.register(data);

    res.status(201).json(response);
  };
  login: RequestHandler = async (req, res, next) => {
    const body = req.body as IUserRequestData["login"]["body"];

    // validate user data
    const { success, data, error } = loginUserValidator.safeParse(body);

    if (!success) {
      next(error);
      return;
    }

    // login user
    const response = await this.userService.login(data);

    // set cookie
    const cookieOptions = getCookieOptions({ purpose: "auth", type: "minute", value: minutesSeconds(5) });
    res.cookie("accessToken", response.data.accessToken, cookieOptions);

    res.status(200).json(response);
  };
  activate2FA: RequestHandler = async (req, res, next) => {
    const { user } = req as IAuthenticatedRequest;

    const response = await this.userService.activate2FA(user);

    res.status(200).json(response);
  };
  verify2FA: RequestHandler = async (req, res, next) => {
    const { user } = req as IAuthenticatedRequest;

    const body = req.body as IUserRequestData["verify2FA"]["body"];

    // validate user data
    const { success, data, error } = verify2FAValidator.safeParse(body);

    if (!success) {
      next(error);
      return;
    }
    // login user
    const response = await this.userService.verify2FA({ user, body: { totp: data.totp } });

    // set cookie
    const cookieOptions = getCookieOptions({ purpose: "auth", type: "day", value: daysMiliSeconds(30) });
    res.cookie("accessToken", response.data.accessToken, cookieOptions);

    res.status(200).json(response);
  };
  me: RequestHandler = async (req, res, next) => {
    const { user } = req as IAuthenticatedRequest;

    const response = await this.userService.me({ user });

    res.status(200).json(response);
  };
}
