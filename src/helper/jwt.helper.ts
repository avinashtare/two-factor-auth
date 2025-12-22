import jwt from "jsonwebtoken";
import { JwtPaylaod } from "../types/jwt.types";

export const signJwt = (payload: JwtPaylaod, secret: string, expiresIn: number) => jwt.sign(payload, secret, { expiresIn });

export const verityJWT = (token: string, secret: string) => jwt.verify(token, secret);
