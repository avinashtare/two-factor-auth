import bcrypt from "bcrypt";

export const hashValue = (value: string): Promise<string> =>
  bcrypt.hash(value, 10);
