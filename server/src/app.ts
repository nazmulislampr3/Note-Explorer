import cors from "cors";
import express from "express";
import errorHandler from "./middlewares/errorHandler.middleware";
import routers from "./routes";
import asyncHandler from "./utils/asyncHandler";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URI, credentials: true }));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routers);

app.post(
  "/",
  asyncHandler(async (req, res) => {
    return res.status(200).json({ testJson: true });
  })
);

app.use(errorHandler as any);

export default app;
