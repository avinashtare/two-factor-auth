import { RequestHandler } from "express";
import { IUserController, IUserRequestData, IUserService } from "../interfaces/user.interface";
import { loginUserValidator, registerUserValidator } from "../validator/user.validator";
import { getCookieOptions } from "../helper/cookie.helper";
import envConfig from "../config/env.config";

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
        const cookieOptions = getCookieOptions({ purpose: "auth", type: "minute", value: envConfig.ACCESS_TOKEN_EXPIRE });
        res.cookie("accessToken", response.data.accessToken, cookieOptions);

        res.status(200).json(response);
    };
}
