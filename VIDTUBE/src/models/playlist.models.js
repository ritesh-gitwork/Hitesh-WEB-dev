/*
_id string pk
  name string
  description string
  createdAt Date
  updatedAt Date
  videos objectId[] videos
  owner objectId users
*/

import mongoose, { Schema } from "mongoose";

const playlistSchema = new Schema(
  {
    name: {
      type: String,
      rquired: true,
    },
    description: {
      type: true,
      rquired: true,
    },
    videos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Playlist = mongoose.model("Playlist", playlistSchema);
