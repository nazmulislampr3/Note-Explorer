import { Router } from "express";
import authRouter from "./auth.route";
import asyncHandler from "../utils/asyncHandler";
import multer from "multer";
import cloudinary from "../utils/cloudinary";
import ApiError from "../utils/ApiError";
import stream from "stream";

const router = Router();

router.use("/auth", authRouter);

const uploadToCloudinary = async (
  buffer: Buffer,
  folder: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: `note-explorer/${folder}` },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    const readableStream = stream.Readable.from(buffer);
    readableStream.pipe(uploadStream);
  });
};

const upload = multer({ storage: multer.memoryStorage() });
router.put(
  "/upload-test",
  upload.single("avatar"),
  asyncHandler(async (req, res) => {
    if (!req.file) return res.status(400).send("No file uploaded.");

    try {
      //   const compressedImageBuffer = await sharp(req.file.buffer)
      //     .resize(800, 800) // Example: resize to 800x800 pixels
      //     .jpeg({ quality: 70 }) // Adjust quality as needed
      //     .toBuffer();

      const result = await uploadToCloudinary(req.file.buffer, "avatars");
      res.status(200).json({ url: result.secure_url });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error processing image");
    }
    return res.json();
  })
);

export default router;
