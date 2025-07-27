import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import {
  uploadonCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  console.log("📩 registerUser called!");
  console.log("📝 req.body:", req.body);
  console.log("📁 req.files:", req.files);

  const { fullname, email, username, password } = req.body;

  // Validation
  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverLocalPath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar file is missing");
  }

  let avatar;
  try {
    avatar = await uploadonCloudinary(avatarLocalPath);
    console.log("✅ Uploaded avatar:", avatar);
  } catch (error) {
    console.error("❌ Error uploading avatar:", error);
    throw new ApiError(500, "Failed to upload avatar");
  }

  let coverImage;
  if (coverLocalPath) {
    try {
      coverImage = await uploadonCloudinary(coverLocalPath);
      console.log("✅ Uploaded coverImage:", coverImage);
    } catch (error) {
      console.error("❌ Error uploading coverImage:", error);
      throw new ApiError(500, "Failed to upload cover image");
    }
  }

  try {
    const user = await User.create({
      fullname,
      avatar: {
        public_id: avatar.public_id,
        url: avatar.url,
      },
      coverImage: coverImage
        ? {
            public_id: coverImage.public_id,
            url: coverImage.url,
          }
        : undefined,
      email,
      password,
      username: username.toLowerCase(),
    });

    const createUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createUser) {
      throw new ApiError(500, "Something went wrong while registering a user");
    }

    return res
      .status(201)
      .json(new ApiResponse(200, createUser, "User registered successfully"));
  } catch (error) {
    console.error("❌ User creation failed");

    if (avatar?.public_id) {
      await deleteFromCloudinary(avatar.public_id);
    }

    if (coverImage?.public_id) {
      await deleteFromCloudinary(coverImage.public_id);
    }

    throw new ApiError(
      500,
      "Something went wrong while registering a user and images were deleted"
    );
  }
});

export { registerUser };
