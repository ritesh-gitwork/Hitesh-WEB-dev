/*_id string pk
  watchHistory objectId videos
  username string
  fullName string
  avatar string
  coverImage string
  password string
  refreshToken string
  createdAt Date
  updatedAt Date
  */
import bcrypt from "bcrypt";
import mongoose, { Schema } from "mongoose";
import jsonwebtoken from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //cloudnary url
      required: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "video",
      },
    ],
    password: {
      type: String,
      required: [true, "password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  this.password = bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  // short lived access token
  return (
    jwt.sign(
      {
        _id: this._id,
        email: this.email,
        username: this.username,
      },
      process.env.ACCESS_TOKEN_SECRET
    ),
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

userSchema.methods.generateRefreshToken = function () {
  // short lived access token
  return (
    jwt.sign(
      {
        _id: this._id,
        email: this.email,
        username: this.username,
      },
      process.env.REFRESH_TOKEN_SECRET
    ),
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

export const User = mongoose.model("User", userSchema);
