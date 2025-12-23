import { Router } from "express";
import UserRepository from "../repositories/user.repository";
import UserService from "../services/user.services";
import UserController from "../controller/user.controller";
import authMiddleware from "../middleware/auth.middleware";

const userRouter = Router();

// Repository
const userRepository = new UserRepository();

// Service
const userService = new UserService(userRepository);

// Controller
const userController = new UserController(userService);

userRouter.route("/register").post(userController.register);
userRouter.route("/login").post(userController.login);

userRouter.route("/activate-2fa").post(authMiddleware({ stage: ["password"], repositories: { userRepository } }), userController.activate2FA);

userRouter.route("/verify-2fa").post(authMiddleware({ stage: ["2fa"], repositories: { userRepository } }), userController.verify2FA);

export default userRouter;
