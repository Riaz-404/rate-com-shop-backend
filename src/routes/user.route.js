import express from "express";
import {
  handleLoginUser,
  handleRegisterUser,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.route("/signup").post(handleRegisterUser);
userRouter.route("/login").post(handleLoginUser);

export { userRouter };
