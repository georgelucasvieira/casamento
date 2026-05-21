import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function uploadBase64(dataUrl: string, folder = "casamento") {
  // dataUrl should be like data:image/jpeg;base64,...
  const res = await cloudinary.uploader.upload(dataUrl, {
    folder,
    resource_type: "image",
  });
  return res.secure_url;
}

export default cloudinary;
