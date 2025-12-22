import { Request } from "express";
import { IUserSchema } from "./user.type";

export interface IAuthenticatedRequest extends Request {
  user: IUserSchema;
  cookies: {
    accessToken: string;
  };
}
