export type JwtPaylaod = {
  userId: string;
  stage: "password" | "auth-code";
};
