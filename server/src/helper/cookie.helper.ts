import { CookieOptions } from "express";
import { daysMiliSeconds, minutesMiliSeconds } from "./date-time.helper";
import envConfig from "../config/env.config";

type TCookieParam =
  | {
      purpose: "auth" | "no-auth";
      type: "minute" | "day";
      value: number;
    }
  | { purpose: "logout" };

export const getCookieOptions = (params: TCookieParam): CookieOptions => {
  const cookieOptions: CookieOptions = {
    path: "/api/v1",
    httpOnly: params.purpose === "no-auth" ? false : true,
  };

  let maxAge = 0;

  if (params.purpose !== "logout") {
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
  }

  cookieOptions.maxAge = maxAge;
  cookieOptions.sameSite = "lax";
  cookieOptions.secure = false;

  if (envConfig.NODE_ENV == "production") {
    cookieOptions.sameSite = "strict";
    cookieOptions.secure = true;
  }

  return cookieOptions;
};
