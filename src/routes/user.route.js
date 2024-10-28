import express from "express";
import { handleRegisterUser } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.route("/signup").post(handleRegisterUser);

export { userRouter };
