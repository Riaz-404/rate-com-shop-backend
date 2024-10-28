import dotenv from "dotenv";

dotenv.config();

export const DB_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@rate-com-shop.bynlp.mongodb.net/?retryWrites=true&w=majority&appName=Rate-com-shop`;

export const DB_NAME = "Rate-com-shop";
