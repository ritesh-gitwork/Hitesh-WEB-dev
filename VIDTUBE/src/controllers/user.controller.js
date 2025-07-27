import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import {
  uploadonCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (requestAnimationFrame, res) => {
  // todo
  const { fullname, email, username, password } = req.body;

  //validation
  if (
    // [fullname, email, username, password].some((field) => field?.trim() === "")
    !fullname ||
    !email ||
    !username ||
    !password
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const exitedUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (exitedUser) {
    throw new ApiError(409, "USer with email or username already exists");
  }

  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverLocalPath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar file is missing");
  }

  // const avatar = await uploadonCloudinary(avatarLocalPath);

  // let coverImage = "";
  // if (coverLocalPath) {
  //   const coverImage = await uploadonCloudinary(coverImage);
  // }

  let avatar;
  try {
    avatar = await uploadonCloudinary(avatarLocalPath);
    console.log("uploaded avatar ", avatar);
  } catch (error) {
    console.log("error uloading avatar", error);
    throw new ApiError(500, "failed to upload avatar");
  }

  let coverImage;
  try {
    avatar = await uploadonCloudinary(coverLocalPath);
    console.log("uploaded coverImage ", coverImage);
  } catch (error) {
    console.log("error uloading coverImage", error);
    throw new ApiError(500, "failed to upload coverImage");
  }

  try {
    const user = await User.create({
      fullname,
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
      email,
      password,
      username: username.toLowerCase(),
    });

    const createUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createUser) {
      throw new ApiError(500, "Something went wrong whilw registering a user");
    }

    return res
      .status(201)
      .json(new ApiResponse(200, createUser, "User registered successfully"));
  } catch (error) {
    console.log("user creation failed");

    if (avatar) {
      await deleteFromCloudinary(avatar.public_id);
    }

    if (coverImage) {
      await deleteFromCloudinary(coverImage.public_id);
    }

    throw new ApiError(
      500,
      "Something went wrong whilw registering a user and images were deleted"
    );
  }
});

export { registerUser };
