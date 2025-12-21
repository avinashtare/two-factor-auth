import { RequestHandler } from "express";
import {
  IUserController,
  IUserRequestData,
  IUserService
} from "../interfaces/user.interface";
import { registerUserValidator } from "../validator/user.validator";

export default class UserController implements IUserController {
  constructor(private userService: IUserService) {}
  register: RequestHandler = async (req, res, next) => {
    const body = req.body as IUserRequestData;

    // validate user data
    const { success, data, error } = registerUserValidator.safeParse(body);

    if (!success) {
      next(error);
      return;
    }

    const response = await this.userService.register(data);

    res.status(201).json(response);
  };
}
