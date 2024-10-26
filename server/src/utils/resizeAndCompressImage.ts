import fs from "fs/promises";
import path from "path";
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
  const filepath = file.path;
  console.log({ filepath });

  sharp.cache(false);
  const image = await sharp(filepath).resize(maxWidth).toBuffer();

  let imageSize = image.length / 1024; //in KB
  let quality = 100;
  while (quality >= 50 && imageSize >= maxSize) {
    quality -= 5;
    const buffer = await sharp(file.path)
      .resize(maxWidth)
      .jpeg({ quality })
      .toBuffer();
    imageSize = buffer.length / 1024;
  }

  const resizedImagePath = path.join(
    __dirname,
    `./../../public/compressed/${file.originalname}`
  );

  console.log({ pathName: resizedImagePath });
  await sharp(file.path)
    .resize(maxWidth)
    .jpeg({ quality })
    .toFile(resizedImagePath);

  await fs.unlink(file.path);
  await fs.rename(resizedImagePath, file.path);
}
export default resizeAndCompressImage;
