import fs from "fs/promises";
import sharp from "sharp";

interface ResizeCompressOptions {
  maxWidth?: number;
  maxSize?: number; //kb
}

async function resizeAndCompressImage(
  file: Express.Multer.File,
  options: ResizeCompressOptions
): Promise<void> {
  const { maxWidth = 400, maxSize = 300 } = options;

  sharp.cache(false);
  const image = await sharp(file.path).resize(maxWidth).toBuffer();

  let imageSize = image.length / 1024; //in KB
  let quality = 100;
  while (quality >= 50 && imageSize >= maxSize) {
    quality -= 5;
    const buffer = await sharp(file.path)
      .resize(2000, 3000)
      .jpeg({ quality })
      .toBuffer();
    imageSize = buffer.length / 1024;
  }

  const resizedImagePath = `./public/compressed/${file.originalname}`;
  await sharp(file.path)
    .resize(maxWidth)
    .jpeg({ quality })
    .toFile(resizedImagePath);

  await fs.unlink(file.path);
  await fs.rename(resizedImagePath, file.path);
}
export default resizeAndCompressImage;
