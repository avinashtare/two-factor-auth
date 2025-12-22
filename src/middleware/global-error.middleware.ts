import { ErrorRequestHandler } from "express";
import envConfig from "../config/env.config";
import { ApplicationException } from "../helper/error.helper";
import { ZodError } from "zod";

type TGlobalError = Error | ApplicationException;

const globalErrorMiddleware: ErrorRequestHandler = (
  err: TGlobalError,
  _req,
  res,
  _next
) => {
  let statusCode = 500;
  let errorMessage = err.message;
  let data = null;

  // check for application exception
  if (err instanceof ApplicationException) {
    statusCode = err.statusCode;
    data = err.data ?? null;
  }
  // handle zod errors
  else if (err instanceof ZodError) {
    const issues = err.issues;

    if (issues.length > 0 && issues[0]?.message) {
      data = issues.map(f => ({ message: f.message, field: f.path[0] }));

      statusCode = 422;
      errorMessage = `Invalid input`;
    }
  }

  const response = {
    success: false,
    message: errorMessage,
    statusCode,
    data
  };

  // logging
  const errorLog = {
    ...response,
    stack: err.stack,
    environment: envConfig.NODE_ENV
  };

  // console.dir(errorLog, { depth: null, colors: true });

  return res.status(statusCode).json(response);
};

export default globalErrorMiddleware;
