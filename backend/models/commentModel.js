import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reply" }],
    updateAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamp: true }
);

const CommentModel = mongoose.model("Comment", commentSchema);

export default CommentModel;
