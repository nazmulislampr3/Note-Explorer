import multer, { memoryStorage } from "multer";

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

export const imageUploader = multer({
  storage: memoryStorage(),
  fileFilter: fileFilter("image"),
});
