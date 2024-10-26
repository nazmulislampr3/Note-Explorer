import cors from "cors";
import express from "express";
import errorHandler from "./middlewares/errorHandler.middleware";
import routers from "./routes";
import asyncHandler from "./utils/asyncHandler";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URI }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routers);

app.use(
  "/",
  asyncHandler(async (req, res) => {
    return res.status(200).json({ testJson: true });
  })
);

app.use(errorHandler as any);

export default app;
