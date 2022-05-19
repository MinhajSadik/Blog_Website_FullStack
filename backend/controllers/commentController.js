import CommentModel from "../models/commentModel";
import PostModel from "../models/postModel";

export const createComment = async (req, res) => {
  const { comment, postId } = req.body;
  try {
    const oldPost = await PostModel.findById(postId);
    console.log("oldPost", oldPost);
    const newComment = new CommentModel({
      comment,
      postId,
    });
    const savedComment = await newComment.save();

    oldPost.comments.push(savedComment._id);
    await oldPost.save();
    res.status(201).json(savedComment);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await CommentModel.find({})
      .populate("author", "name email")
      .populate("replies");
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
