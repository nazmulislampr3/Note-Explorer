import { ResizeCompressOptions } from "../types.js";
import asyncHandler from "../utils/asyncHandler.js";
import uploadPhoto from "../utils/cloudinary/uploadPhoto.cloudinary.js";

export const uploadImage = (
  folder: string,
  options: ResizeCompressOptions = {}
) => {
  return asyncHandler(async (req, res) => {
    const { maxWidth = 600, maxSize = 300 } = options;
    const url = await uploadPhoto(folder, req.file!, {
      maxWidth,
      maxSize,
    });

    return res.json({ url });
  });
};
