import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { cloudinary, hasCloudinaryConfig } from "../config/cloudinary.js";

export const uploadDir = "uploads/";

fs.mkdirSync(uploadDir, { recursive: true });

const saveLocalFile = async (file) => {
  const extension = path.extname(file.originalname) || ".jpg";
  const filename = `${Date.now()}-${randomUUID()}${extension}`;
  const targetPath = path.join(uploadDir, filename);

  await fs.promises.writeFile(targetPath, file.buffer);

  return `/uploads/${filename}`;
};

const uploadToCloudinary = (file, folder = "manju-ladies-tailors") =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    );

    stream.end(file.buffer);
  });

export const resolveImagePath = async (file, folder = "manju-ladies-tailors") => {
  if (hasCloudinaryConfig) {
    return uploadToCloudinary(file, folder);
  }

  return saveLocalFile(file);
};

export const deleteUploadedFile = (imagePath) => {
  if (!imagePath) {
    return;
  }

  if (imagePath.startsWith("http")) {
    const uploadSegment = imagePath.split("/upload/")[1];
    const publicIdWithExt = uploadSegment?.split("/").slice(1).join("/");
    const publicId = publicIdWithExt ? publicIdWithExt.replace(path.extname(publicIdWithExt), "") : null;

    if (publicId) {
      cloudinary.uploader.destroy(publicId).catch(() => {});
    }
    return;
  }

  if (imagePath.startsWith("/uploads/")) {
    const localPath = imagePath.replace(/^\/uploads\//, `${uploadDir}`);
    fs.rm(localPath, { force: true }, () => {});
  }
};
