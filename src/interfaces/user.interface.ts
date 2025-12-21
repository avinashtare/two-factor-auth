import { IUserSchema } from "../types/user.type";
import { QueryFilter, UpdateQuery, UpdateWriteOpResult } from "mongoose";
import { RequestHandler } from "express";
import { TServiceSuccess } from "../types/service.type";
import z from "zod";
import { registerUserValidator } from "../validator/user.validator";

export interface IUserRequestData {
  register: {
    body: z.infer<typeof registerUserValidator>;
  };
}

export interface IUserController {
  register: RequestHandler;
}

export interface IUserService {
  register: (
    paylaod: IUserRequestData["register"]["body"]
  ) => Promise<TServiceSuccess<{ userId: string }>>;
}

export interface IUserRepository {
  findOne: (
    filter: QueryFilter<IUserSchema>,
    select?: string
  ) => Promise<IUserSchema | null>;

  create: (payload: IUserSchema) => Promise<IUserSchema>;

  updateOne: (
    filter: QueryFilter<IUserSchema>,
    update: UpdateQuery<IUserSchema>
  ) => Promise<UpdateWriteOpResult>;
}
