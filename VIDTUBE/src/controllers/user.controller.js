import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import {
  uploadonCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessTokenandRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    //small check for existence (homework)

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Generate tokens using schema methods
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Save refreshToken to DB (but skip validation like email/password check)

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    // Return both tokens as an object

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong while generating accessToken and refreshToken"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  console.log("📩 registerUser called!");
  // console.log("📝 req.body:", req.body);
  // console.log("📁 req.files:", req.files);

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

const loginUser = asyncHandler(async (req, res) => {
  //get data from body

  const { email, username, password } = req.body;

  //validation

  if (!email && !username) {
    throw new ApiError(400, "email and username is required");
  }

  // Find user in the db

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "user not found");
  }

  // validate password

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "invalid PAssword");
  }

  // Generate access token and refresh token

  const { accessToken, refreshToken } =
    await generateAccessTokenandRefreshToken(user._id);

  // Prepare user data hide sensitive fields

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  //check for loggedInuser
  // cookie option
  /*
  httpOnly: Cookie can’t be accessed via JS (protects from XSS).

  secure: Only send cookie over HTTPS in production.
  */

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "user Logged in Successfully"
      )
    );
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefrshToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefrshToken) {
    throw new ApiError(401, "refresh token is required");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefrshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid Refresh token");
    }

    if (incomingRefrshToken !== user?.refreshToken) {
      throw new ApiError(401, "Invalid Refresh token");
    }

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessTokenandRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            accessToken,
            refreshToken: newRefreshToken,
          },
          "Access token refresh successfully"
        )
      );
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong while refreshing access token"
    );
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);

  const isPasswordValid = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordValid) {
    throw new ApiError(401, "old password is incorrect");
  }

  user.password = newPassword;

  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, {}, "Current user details"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullname, email } = req.body;
  if (!(fullname || email)) {
    throw new ApiError(200, "fullname and email are required");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullname,
        email: email,
      },
    },
    { new: true }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Account details updated successfully"));
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.files?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "File is required");
  }

  const avatar = await uploadonCloudinary(avatarLocalPath);

  if (!avatar.url) {
    throw new ApiError(401, "Something went wrong while uploading the avatar");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: avatar.url,
    },
    { new: true }
  ).select("-password -refreshToken");

  res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar has been updated successfully"));
});

const updateCoverImage = asyncHandler(async (req, res) => {
  const coverImageLocalPath = req.files?.path;

  if (!coverImageLocalPath) {
    throw new ApiError(400, "File is required");
  }

  const coverImage = await uploadonCloudinary(coverImageLocalPath);

  if (!coverImage.url) {
    throw new ApiError(
      401,
      "Something went wrong while uploading the coverImage"
    );
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: coverImage.url,
    },
    { new: true }
  ).select("-password -refreshToken");

  res
    .status(200)
    .json(
      new ApiResponse(200, user, "Cover Image has been updated successfully")
    );
});

const getUserChannelProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;

  if (!username?.trim()) {
    throw new ApiError(400,"username is required")
  }


});
const getWatchHistory = asyncHandler(async (req, res) => {});

export {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  updateCoverImage,
};
