import { RequestHandler } from "express";
import { IUserRepository } from "../interfaces/user.interface";
import { IAuthenticatedRequest } from "../types/auth.type";
import { verityJWT } from "../helper/jwt.helper";
import envConfig from "../config/env.config";
import { JwtPaylaod } from "../types/jwt.types";
import { ApplicationException } from "../helper/error.helper";

type TAuthMiddlewareParams = {
  stage: ("password" | "2fa")[];
  repositories: {
    userRepository: IUserRepository;
  };
};

const authMiddleware = (params: TAuthMiddlewareParams): RequestHandler => async (_req, res, next) => {
  const req = _req as IAuthenticatedRequest;

  const accessToken = req.cookies?.accessToken;

  if (accessToken) {
    // jwt verify
    const jwtPaylaodFData = verityJWT(accessToken, envConfig.ACCESS_TOKEN_SECRET) as JwtPaylaod;

    let isAuthenticated = false;
    if (params.stage.includes(jwtPaylaodFData.stage)) {
      isAuthenticated = true;
    }

    if (isAuthenticated) {
      const user = await params.repositories.userRepository.findOne({ _id: jwtPaylaodFData.userId }, "+twoFactorAuth.secret");

      if (user) {
        req.user = user;
        res.setHeader("X-Auth-Stage", jwtPaylaodFData.stage);
        return next();
      }
    }
  }

  next(new ApplicationException("Unauthorized", 401));
};

export default authMiddleware;
