// import cloudinary from "../config/cloudinary.js";
// import fs from "fs";

// // Upload file to cloudinary
// export const uploadToCloudinary = async (filePath, folder) => {
//   try {
//     const result = await cloudinary.uploader.upload(filePath, {
//       folder,
//     });

//     // Delete local file after upload
//     fs.unlinkSync(filePath);

//     return result;
//   } catch (error) {
//     throw new Error("Cloudinary upload failed");
//   }
// };


import cloudinary from "../config/cloudinary.js";
import { v2 as cloudinaryV2 } from "cloudinary";
import { Readable } from "stream";

export const uploadToCloudinary = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinaryV2.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    const readable = new Readable();
    readable._read = () => {};
    readable.push(buffer);
    readable.push(null);
    readable.pipe(stream);
  });
};
