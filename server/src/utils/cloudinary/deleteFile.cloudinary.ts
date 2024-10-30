import cloudinary from "./cloudinary.js";

const deleteFile = async (url: string) => {
  const isCloudinaryFile = url.includes("res.cloudinary.com");
  if (isCloudinaryFile) {
    const public_id: string | null =
      url.match(/(note-explorer\/[^.]+)(?=\.)/)?.[0] || null;
    if (public_id) {
      await cloudinary.uploader.destroy(public_id);
    }
  }
};

export default deleteFile;
