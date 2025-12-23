import bcrypt from "bcrypt";

export const hashValue = (value: string): Promise<string> =>
  bcrypt.hash(value, 10);

export const compareHash = (value: string, hash: string): Promise<boolean> =>
  bcrypt.compare(value, hash);
