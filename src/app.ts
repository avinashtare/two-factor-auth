import express = require("express");
import globalErrorMiddleware from "./middleware/global-error.middleware";
import { ApplicationException } from "./helper/error.helper";

const app = express();

// Middleware
app.use(express.json());

// 404 Handler
app.use((_req, _res, next) => {
  return next(
    new ApplicationException(
      "Sorry, the page you’re looking for doesn’t exist.",
      404
    )
  );
});

// Global Error Handler
app.use(globalErrorMiddleware);

export default app;
