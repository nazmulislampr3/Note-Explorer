import mongoose from "mongoose";
import ApiError from "../utils/ApiError.js";

const connectMongo = async (): Promise<any> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Mongodb connected successfully!");
  } catch (error) {
    throw new ApiError(503, "Mongodb connection failed.");
  }
};

export default connectMongo;
