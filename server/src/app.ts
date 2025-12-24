import express = require("express");
import globalErrorMiddleware from "./middleware/global-error.middleware";
import { ApplicationException } from "./helper/error.helper";
import router from "./router/init.router";
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// cors
app.use(
  cors({
    origin: "http://localhost:5173", // EXACT frontend origin
    credentials: true,
  }),
);

// cookie parser
app.use(cookieParser());

// Middleware
app.use(express.json());

// all the routes
app.use("/", router);

// 404 Handler
app.use((_req, _res, next) => {
  return next(new ApplicationException("Sorry, the page you're looking for doesn't exist.", 404));
});

// Global Error Handler
app.use(globalErrorMiddleware);

export default app;
