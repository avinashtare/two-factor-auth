import express = require("express");
import globalErrorMiddleware from "./middleware/global-error.middleware";
import { ApplicationException } from "./helper/error.helper";

const app = express();

// Middleware
app.use(express.json());

// 404 Handler
app.use((_req, _res, next) => {
  next(new ApplicationException("Page Not Found", 404));
});

// Global Error Handler
app.use(globalErrorMiddleware);

export default app;
