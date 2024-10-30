import cors from "cors";
import express from "express";
import errorHandler from "./middlewares/errorHandler.middleware";
import routers from "./routes";
import asyncHandler from "./utils/asyncHandler";
// import { accountRecoverOTPMail } from "./utils/mailer/mails";
// import sendMail from "./utils/mailer/sendMail";
// (async () => {
//   sendMail({
//     to: "nazmulislampr3@gmail.com",
//     html: await accountRecoverOTPMail({
//       otp: "123444",
//       reciever: "Md Niloy Khan",
//     }),
//     subject: "test user mail",
//   });
// })();

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
