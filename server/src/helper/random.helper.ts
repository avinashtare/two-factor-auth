import { customAlphabet } from "nanoid";

export const generateAlphaNumaricString = (length: number = 10): string => {
  const alphaNumaricStr = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomString = customAlphabet(alphaNumaricStr, length)();
  return randomString;
};

export const generateBase32Secret = (length: number = 16): string => {
  const base32Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  return customAlphabet(base32Chars, length)();
};
