import { IUserSchema } from "../types/user.type";
import { QueryFilter, UpdateQuery, UpdateWriteOpResult } from "mongoose";
import { RequestHandler } from "express";
import { TServiceSuccess } from "../types/service.type";
import z from "zod";
import { loginUserValidator, registerUserValidator, verify2FAValidator } from "../validator/user.validator";

export interface IUserRequestData {
  register: {
    body: z.infer<typeof registerUserValidator>;
  };
  login: {
    body: z.infer<typeof loginUserValidator>;
  };
  activate2FA: {
    user: IUserSchema;
  };
  verify2FA: {
    user: IUserSchema;
    body: z.infer<typeof verify2FAValidator>;
  };
}

// controller
export interface IUserController {
  register: RequestHandler;
  login: RequestHandler;
  activate2FA: RequestHandler;
  verify2FA: RequestHandler;
}

export interface IUserService {
  register: (payload: IUserRequestData["register"]["body"]) => Promise<TServiceSuccess<{ userId: string }>>;
  login: (payload: IUserRequestData["login"]["body"]) => Promise<TServiceSuccess<{ userId: string; accessToken: string }>>;
  activate2FA: (payload: IUserRequestData["activate2FA"]["user"]) => Promise<TServiceSuccess<{ qrDataUrl: string; recoveryCodes: string[] }>>;
  verify2FA: (payload: IUserRequestData["verify2FA"]) => Promise<TServiceSuccess<{ userId: string; accessToken: string }>>;
}

export interface IUserRepository {
  findOne: (filter: QueryFilter<IUserSchema>, select?: string) => Promise<IUserSchema | null>;

  create: (payload: IUserSchema) => Promise<IUserSchema>;

  updateOne: (filter: QueryFilter<IUserSchema>, update: UpdateQuery<IUserSchema>) => Promise<UpdateWriteOpResult>;
}
