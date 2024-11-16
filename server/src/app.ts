import cors from "cors";
import express from "express";
import errorHandler from "./middlewares/errorHandler.middleware";
import routers from "./routes";
import asyncHandler from "./utils/asyncHandler";
import cookieParser from "cookie-parser";
import ApiError from "utils/ApiError";

const app = express();

const origins =
  process.env.NODE_ENV === "development"
    ? ["http://192.168.0.103:5173", process.env.CLIENT_URI_DEVELOPMENT]
    : [process.env.CLIENT_URI];

app.use(
  cors({
    origin: (origin, callback) => {
      if (origins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by cors!"));
      }
    },
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routers);

app.get(
  "/",
  asyncHandler(async (req, res) => {
    return res.status(200).json({ testJson: true, origin });
  })
);

app.use(errorHandler as any);

export default app;
