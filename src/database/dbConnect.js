import mongoose from "mongoose";
import { DB_NAME, DB_URI } from "../constants.js";

const dbConnect = async () => {
  try {
    const mongoDbInstances = await mongoose.connect(DB_URI, {
      dbName: DB_NAME,
    });

    console.log(
      "MongoDB connected successfully with " + mongoDbInstances.connection.host,
    );
  } catch (error) {
    console.log(error);
  }
};

export { dbConnect };
