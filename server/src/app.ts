import cors from "cors";
import express from "express";
import errorHandler from "./middlewares/errorHandler.middleware";
import routers from "./routes";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URI }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routers);

app.use(errorHandler as any);

export default app;
