import multer from "multer";
import { FileTypes, ImageMimeType } from "../types";
import path from "path";

const storage = (fileType: FileTypes) =>
  multer.diskStorage({
    destination: (req, file, callback) => {
      let error: Error | null = null;
      if (fileType === "image" && !(file.mimetype as ImageMimeType)) {
        error = {
          message: "Invalid image.",
          name: "Image input error.",
        };
      }

      const pathName = path.join(__dirname, "./../../public/uploads");
      callback(error, pathName);
    },
    filename: (req, file, callback) => {
      const [name, extension] = file.originalname.split(".");

      const filename = `${name.replace(
        "-",
        "_"
      )}_${new Date().getTime()}.${extension}`;
      callback(null, filename);
    },
  });

export const uploadImage = multer({ storage: storage("image") });
