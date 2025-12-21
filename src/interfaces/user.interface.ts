import { IUserSchema } from "../types/user.types";
import { QueryFilter, UpdateQuery, UpdateWriteOpResult } from "mongoose";

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
