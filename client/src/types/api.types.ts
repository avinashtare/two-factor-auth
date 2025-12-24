type TApiSuccess<T> = {
  success: true;
  message: string;
  data: T;
};

export type TRegisterAPsuccess = TApiSuccess<{ userId: string }>;
export type TLoginAPsuccess = TApiSuccess<{
  userId: string;
  accessToken: string;
}>;

export type TActivate2FaSuccess = TApiSuccess<{
  qrDataUrl: string;
  secret: string;
  activated?: boolean;
}>;

export type TVerify2FaSuccess = TApiSuccess<{
  userId: string;
  accessToken: string;
  recoveryCodes: string[];
}>;
