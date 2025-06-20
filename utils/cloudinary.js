import cloudinary from "../config/cloudinary.js";
import fs from "fs";

// Upload file to cloudinary
export const uploadToCloudinary = async (filePath, folder) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
    });

    // Delete local file after upload
    fs.unlinkSync(filePath);

    return result;
  } catch (error) {
    throw new Error("Cloudinary upload failed");
  }
};
