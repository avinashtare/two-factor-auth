import { ErrorRequestHandler } from "express";
import envConfig from "../config/env.config";
import { ApplicationException } from "../helper/error.helper";

type TGlobalError = Error | ApplicationException;

const globalErrorMiddleware: ErrorRequestHandler = (
  err: TGlobalError,
  _req,
  res,
  _next
) => {
  let statusCode = 500;
  let errorMessage = err.message;

  if (err instanceof ApplicationException) {
    statusCode = err.statusCode;
  }

  const response = {
    success: false,
    message: errorMessage,
    statusCode
  };

  // logging
  console.dir(
    {
      ...response,
      stack: err.stack,
      environment: envConfig.NODE_ENV
    },
    { depth: null, colors: true }
  );

  return res.status(statusCode).json(response);
};

export default globalErrorMiddleware;
