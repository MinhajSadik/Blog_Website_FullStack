import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    comment: {
      type: String,
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reply" }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamp: true }
);

const CommentModel = mongoose.model("Comment", commentSchema);

export default CommentModel;
