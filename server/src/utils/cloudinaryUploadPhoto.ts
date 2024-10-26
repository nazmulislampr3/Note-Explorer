import fs from "fs/promises";
import { CloudinaryImage } from "../types";
import cloudinary from "../utils/cloudinary";
import resizeAndCompressImage from "../utils/resizeAndCompressImage";

const cloudinaryUploadPhoto = async (
  cloudinaryFolder: string,
  file: Express.Multer.File
): Promise<CloudinaryImage> => {
  await resizeAndCompressImage(file, {
    maxWidth: 600,
    maxSize: 300,
  });

  const { url, public_id } = await cloudinary.uploader.upload(file?.path!, {
    folder: `note-explorer/${cloudinaryFolder}`,
  });

  fs.unlink(file?.path!);
  return { url, public_id };
};

export default cloudinaryUploadPhoto;
