import { Router } from "express";
import { uploadImage } from "./../controllers/upload.controller";
import { imageUploader } from "./../utils/multer/uploader.multer";

const uploadRouter = Router();
const allImageUploadRouter = Router();
const specificImageUploadRouter = Router();
specificImageUploadRouter
  .route("/avatar")
  .post(imageUploader.single("avatar"), uploadImage("avatars"));

allImageUploadRouter.use("/image", specificImageUploadRouter);

uploadRouter.use("/", allImageUploadRouter);

export default uploadRouter;
