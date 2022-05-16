import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamp: true }
);

const PostModel = mongoose.model("Post", postSchema);

export default PostModel;
