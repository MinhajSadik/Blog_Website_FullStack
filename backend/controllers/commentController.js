import CommentModel from "../models/commentModel";
import PostModel from "../models/postModel";

export const addComment = async (req, res) => {
  const { comment, postId, author, replies } = req.body;
  try {
    const oldPost = await PostModel.findById(postId);
    const newComment = new CommentModel({
      comment,
      postId,
      author,
      replies,
    });

    const savedComment = await newComment.save();
    await oldPost.comments.push(savedComment._id);
    await oldPost.save();
    res.status(201).json(savedComment);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Server Error",
      // message: error.message,
    });
  }
};

export const getComment = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await CommentModel.find({ postId: id })
      .populate("replies")
      .populate("author", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
