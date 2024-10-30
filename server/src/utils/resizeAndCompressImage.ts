import sharp from "sharp";
import { ResizeCompressOptions } from "../types.js";

async function resizeAndCompressImage(
  file: Express.Multer.File,
  options: ResizeCompressOptions
): Promise<Buffer> {
  const { maxWidth = 600, maxSize = 300 } = options;

  const imageBuffer = await sharp(file.buffer).resize(maxWidth).toBuffer();

  let imageSize = imageBuffer.length / 1024; //in KB

  let quality = 80;
  while (quality >= 40 && imageSize >= maxSize) {
    quality -= 2;
    const buffer = await sharp(file.buffer)
      .resize(maxWidth)
      .jpeg({ quality })
      .toBuffer();
    imageSize = buffer.length / 1024;
  }

  const compressedImageBuffer = await sharp(file.buffer)
    .resize(maxWidth)
    .jpeg({ quality })
    .toBuffer();

  return compressedImageBuffer;
}
export default resizeAndCompressImage;
