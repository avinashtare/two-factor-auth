import { customAlphabet } from "nanoid";
import OTPauth from "otpauth";
import { hashValue } from "./password-encryption.helper";

export const generateTOTP = (name: string, base32?: string) => {
  const totp = new OTPauth.TOTP({
    issuer: "avinash.com", // app/website name
    label: name, // user info
    algorithm: "SHA256",
    digits: 6, // otp count min:6 count
    period: 30, // new otp time min: 30s
    ...(base32 ? { secret: OTPauth.Secret.fromBase32(base32) } : {}),
  });

  return totp;
};

export type TRecoveryCodes = Record<"plainText" | "hashed", string[]>;

export const generateRecoveryCodes = async (count: number): Promise<TRecoveryCodes> => {
  const alphaNumaricStr = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const recoveryCodes: TRecoveryCodes = {
    plainText: [],
    hashed: [],
  };

  for (let i = 0; i < count; i++) {
    const recoveryCode = customAlphabet(alphaNumaricStr, 10)();
    recoveryCodes.plainText.push(recoveryCode);

    const hashedRecoveryCode = await hashValue(recoveryCode);
    recoveryCodes.hashed.push(hashedRecoveryCode);
  }

  return recoveryCodes;
};
