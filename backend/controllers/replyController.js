import CommentModel from "../models/commentModel.js";
import ReplyModel from "../models/replyModel.js";

export const addReply = async (req, res) => {
  const { reply, commentId, author } = req.body;
  try {
    const comment = await CommentModel.findById(commentId);
    const newReply = new ReplyModel({
      reply,
      commentId,
      author,
    });
    const saveReply = await newReply.save();

    comment.replies.push(saveReply);
    await comment.save();
    res.status(201).json(saveReply);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getReply = async (req, res) => {
  const { id } = req.params;
  try {
    const reply = await ReplyModel.find({ commentId: id })
      .populate("author", "name")
      .populate("author", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json(reply);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
