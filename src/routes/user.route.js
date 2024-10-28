import express from "express";

const userRouter = express.Router();

userRouter.route("/user").get((req, res) => {
  res.send("Hello from user");
});

export { userRouter };
