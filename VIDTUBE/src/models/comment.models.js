import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, "Comment content is required"],
      trim: true,
    },
    video: {
      type: Schema.Types.ObjectId,
      ref: "Video",
      required: [true, "Associated video is required"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Comment owner is required"],
    },
  },
  {
    timestamps: true,
  }
);

// Add pagination plugin
commentSchema.plugin(mongooseAggregatePaginate);

// Create and export model
export const Comment = mongoose.model("Comment", commentSchema);
