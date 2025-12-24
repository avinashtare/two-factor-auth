import OTPauth from "otpauth";
import { hashValue } from "./password-encryption.helper";
import { generateAlphaNumaricString } from "./random.helper";

export const generateTOTP = (name: string, base32?: string) => {
  const secret = base32 ?? generateAlphaNumaricString(16);

  const totp = new OTPauth.TOTP({
    issuer: "avinash.com", // app/website name
    label: name, // user info
    algorithm: "SHA1", // you can use SHA256
    digits: 6, // otp count min:6 count
    period: 30, // new otp time min: 30s
    secret,
  });

  return totp;
};

export type TRecoveryCodes = Record<"plainText" | "hashed", string[]>;

export const generateRecoveryCodes = async (count: number): Promise<TRecoveryCodes> => {
  const recoveryCodes: TRecoveryCodes = {
    plainText: [],
    hashed: [],
  };

  for (let i = 0; i < count; i++) {
    const recoveryCode = generateAlphaNumaricString(10);
    recoveryCodes.plainText.push(recoveryCode);

    const hashedRecoveryCode = await hashValue(recoveryCode);
    recoveryCodes.hashed.push(hashedRecoveryCode);
  }

  return recoveryCodes;
};
