import { customAlphabet } from "nanoid";

export const generateAlphaNumaricString = (length: number = 10): string => {
  const alphaNumaricStr = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomString = customAlphabet(alphaNumaricStr, length)();
  return randomString;
};
