import fs from "fs/promises";
import { CloudinaryImage } from "../types";
import cloudinary from "../utils/cloudinary";
import resizeAndCompressImage from "../utils/resizeAndCompressImage";
import stream from "stream";

const upload = async (folder: string, buffer: Buffer): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: `note-explorer/${folder}` },
      (err, result) => {
        if (err || !result) {
          reject(err || "Not uploaded.");
        }
        if (result) {
          resolve(result.url);
        }
      }
    );

    const readable = stream.Readable.from(buffer);
    readable.pipe(uploadStream);
  });
};

const cloudinaryUploadPhoto = async (
  cloudinaryFolder: string,
  file: Express.Multer.File
): Promise<string> => {
  const compressedImageBuffer = await resizeAndCompressImage(file, {
    maxWidth: 600,
    maxSize: 300,
  });

  const url = await upload(cloudinaryFolder, compressedImageBuffer);
  return url;
};

export default cloudinaryUploadPhoto;
