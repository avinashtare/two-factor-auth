import { Router } from "express";
import userRouter from "./user.router";

const apiRouter = Router();

apiRouter.use("/v1/user", userRouter);

export default apiRouter;
