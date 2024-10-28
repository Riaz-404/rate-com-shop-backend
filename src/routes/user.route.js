import express from "express";
import {
  handleLoginUser,
  handleRegisterUser,
  handleUserDetails,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.route("/signup").post(handleRegisterUser);
userRouter.route("/login").post(handleLoginUser);
userRouter.route("/").get(verifyToken, handleUserDetails);

export { userRouter };
