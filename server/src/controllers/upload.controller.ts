import { ResizeCompressOptions } from "./../types";
import asyncHandler from "./../utils/asyncHandler";
import uploadPhoto from "./../utils/cloudinary/uploadPhoto.cloudinary";

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
