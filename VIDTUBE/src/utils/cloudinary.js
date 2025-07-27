import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

//CONFIGURATION
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadonCloudinary = async (localFilePath) => {
  try {
    console.log("initial error");

    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("File upload on cloudinary File Src:" + response.url);
    // Once the file is uploaded , we would like to delete it from our server
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    console.log("Deleted from cloudinary. PUblic id");
  } catch (error) {
    console.log("Error deleting from cloudinary", error);
  }
};

export { uploadonCloudinary, deleteFromCloudinary };
