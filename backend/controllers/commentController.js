import CommentModel from "../models/commentModel";
import PostModel from "../models/postModel";

export const addComment = async (req, res) => {
  const { comment, postId, author } = req.body;
  try {
    const oldPost = await PostModel.findById(postId);
    const newComment = new CommentModel({
      comment,
      postId,
      author,
    });

    const savedComment = await newComment.save();
    await oldPost.comments.push(savedComment._id);
    await oldPost.save();

    console.log("oldPost", oldPost);
    res.status(201).json(savedComment);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Server Error",
      // message: error.message,
    });
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await CommentModel.find({})
      .populate("replies")
      .populate("author")
      .sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
