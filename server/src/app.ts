import cors from "cors";
import express from "express";
import errorHandler from "./middlewares/errorHandler.middleware";
import routers from "./routes";
import asyncHandler from "./utils/asyncHandler";
import cookieParser from "cookie-parser";

const app = express();

const origin =
  process.env.NODE_ENV === "development"
    ? process.env.CLIENT_URI_DEVELOPMENT
    : process.env.CLIENT_URI;

console.log({ origin });

app.use(cors({ origin, credentials: true }));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routers);

app.get(
  "/",
  asyncHandler(async (req, res) => {
    return res.status(200).json({ testJson: true });
  })
);

app.use(errorHandler as any);

export default app;
