import stream from "stream";
import cloudinary from "./cloudinary.js";

const cloudinaryUploadFile = async (
  folder: string,
  buffer: Buffer
): Promise<string> => {
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

export default cloudinaryUploadFile;
