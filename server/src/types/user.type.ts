import { Types } from "mongoose";

export type TTwoFactorAuthRecoveryCode = {
  code: string;
  used: boolean;
};

export type TTwoFactorAuth = {
  activated: boolean;
  secret: string | null;
  recoveryCodes: TTwoFactorAuthRecoveryCode[];
};

export interface IUserSchema {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  twoFactorAuth: TTwoFactorAuth;
  createdAt?: Date;
  updatedAt?: Date;
}
