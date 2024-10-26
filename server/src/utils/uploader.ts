import multer, { memoryStorage } from "multer";
import { FileTypes } from "../types";
import ApiError from "./ApiError";

const fileFilter = (fileType?: any) => {
  return (
    req: any,
    file: Express.Multer.File,
    callback: multer.FileFilterCallback
  ) => {
    if (fileType && !file.mimetype.startsWith(fileType)) {
      return callback(null, false);
    }
    callback(null, true);
  };
};

export const uploadImage = multer({
  storage: memoryStorage(),
  fileFilter: fileFilter("image"),
});
