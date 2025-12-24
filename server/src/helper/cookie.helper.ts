import { CookieOptions } from "express";
import { daysMiliSeconds, minutesMiliSeconds } from "./date-time.helper";
import envConfig from "../config/env.config";

type TCookieParam =
  | {
      purpose: "auth";
      type: "minute" | "day";
      value: number;
    }
  | { purpose: "logout" };

export const getCookieOptions = (params: TCookieParam): CookieOptions => {
  const cookieOptions: CookieOptions = {
    path: "/api/v1",
    httpOnly: true,
  };

  if (params.purpose == "auth") {
    let maxAge = 0;

    switch (params.type) {
      case "minute": {
        maxAge = minutesMiliSeconds(params.value);
        break;
      }
      case "day": {
        maxAge = daysMiliSeconds(params.value);
        break;
      }
    }
    cookieOptions.sameSite = "lax";
    cookieOptions.secure = false;
    cookieOptions.maxAge = maxAge;
  }

  if (envConfig.NODE_ENV == "production") {
    cookieOptions.sameSite = "strict";
    cookieOptions.secure = true;
  }

  return cookieOptions;
};
