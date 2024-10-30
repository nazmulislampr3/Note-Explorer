import { ResizeCompressOptions } from "../../types";
import resizeAndCompressImage from "../resizeAndCompressImage";
import cloudinaryUploadFile from "./uploadFile.cloudinary";

const uploadPhoto = async (
  cloudinaryFolder: string,
  file: Express.Multer.File,
  options: ResizeCompressOptions = {}
): Promise<string> => {
  const { maxWidth = 600, maxSize = 300 } = options;
  const compressedImageBuffer = await resizeAndCompressImage(file, {
    maxWidth: maxWidth,
    maxSize: maxSize,
  });

  const url = await cloudinaryUploadFile(
    cloudinaryFolder,
    compressedImageBuffer
  );
  return url;
};

export default uploadPhoto;
