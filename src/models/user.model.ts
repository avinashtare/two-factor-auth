import { model, Schema } from "mongoose";
import { IUserSchema } from "../types/user.types";

const twoFactorAuthRecoveryCodeSchema = new Schema<
  IUserSchema["twoFactorAuth"]["recoveryCodes"][0]
>(
  {
    code: { type: String, required: true },
    used: { type: Boolean, required: true, default: false }
  },
  { _id: false }
);

const twoFactorAuthSchema = new Schema<IUserSchema["twoFactorAuth"]>(
  {
    activated: {
      type: Boolean,
      required: true,
      defualt: false
    },
    secret: {
      type: String,
      required: true,
      select: false
    },
    recoveryCodes: {
      type: [twoFactorAuthRecoveryCodeSchema],
      required: true,
      select: false,
      default: []
    }
  },
  { _id: false }
);

const userSchema = new Schema<IUserSchema>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  twoFactorAuth: {
    type: twoFactorAuthSchema,
    required: true
  }
});

export default model("user", userSchema);
