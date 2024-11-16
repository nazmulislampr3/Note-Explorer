const extractImageFromFile = (file: File | null): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve(null);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string); // Resolve with the image data URL
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file); // Start reading the file
  });
};

export default extractImageFromFile;
