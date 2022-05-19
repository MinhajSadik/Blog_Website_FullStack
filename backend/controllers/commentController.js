import CommentModel from "../models/commentModel";
import PostModel from "../models/postModel";

export const createComment = async (req, res) => {
  const comment = req.body;
  try {
    const newPost = new PostModel({
      ...comment,
    });
    const newComment = new CommentModel({
      ...comment,
    });
    const savedComment = await newComment.save();
    const saveCommentedPost = await newPost.comments.push(savedComment);
    res.status(201).json({ savedComment, saveCommentedPost });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await CommentModel.find({}).populate("replies");
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
