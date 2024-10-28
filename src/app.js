import express from "express";
import cors from "cors";
import { healthCheckController } from "./controllers/healthCheck.controller.js";
import { userRouter } from "./routes/user.route.js";
import { productRouter } from "./routes/product.route.js";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(express.static("public"));

app.use("/api/v1/health-check", healthCheckController);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);

export default app;
