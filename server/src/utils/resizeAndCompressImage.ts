import sharp from "sharp";

interface ResizeCompressOptions {
  maxWidth?: number;
  maxSize?: number; //kb
}

async function resizeAndCompressImage(
  file: Express.Multer.File,
  options: ResizeCompressOptions
): Promise<Buffer> {
  const { maxWidth = 400, maxSize = 300 } = options;

  const imageBuffer = await sharp(file.buffer).resize(maxWidth).toBuffer();

  let imageSize = imageBuffer.length / 1024; //in KB
  let quality = 100;
  while (quality >= 50 && imageSize >= maxSize) {
    quality -= 5;
    const buffer = await sharp(file.path)
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
