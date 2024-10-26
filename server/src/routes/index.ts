import { Router } from "express";
import authRouter from "./auth.route";
import asyncHandler from "../utils/asyncHandler";
import multer from "multer";
import cloudinary from "../utils/cloudinary";
import ApiError from "../utils/ApiError";
import stream from "stream";

const router = Router();

router.use("/auth", authRouter);

export default router;
