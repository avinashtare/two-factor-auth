export type JwtPaylaod = {
  userId: string;
  stage: "password" | "2fa";
};
