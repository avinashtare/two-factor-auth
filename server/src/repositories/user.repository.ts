import { QueryFilter, UpdateQuery, UpdateWriteOpResult } from "mongoose";
import { IUserRepository } from "../interfaces/user.interface";
import { IUserSchema } from "../types/user.type";
import userModel from "../models/user.model";

export default class UserRepository implements IUserRepository {
  findOne = (filter: QueryFilter<IUserSchema>, select: string = "") => {
    return userModel.findOne(filter).select(select);
  };

  create = (payload: Omit<IUserSchema, "id">) => {
    return userModel.create(payload);
  };

  updateOne = (
    filter: QueryFilter<IUserSchema>,
    update: UpdateQuery<IUserSchema>
  ) => {
    return userModel.updateOne(filter, update);
  };
}
