import CommentModel from "../models/commentModel";
import ReplyModel from "../models/replyModel";

export const addReply = async (req, res) => {
  const { reply, commentId, user } = req.body;
  try {
    const comment = await CommentModel.findById(commentId);
    const newReply = new ReplyModel({
      reply,
      commentId,
      user,
    });
    const saveReply = await newReply.save();

    comment.replies.push(saveReply._id);
    await comment.save();
    res.status(201).json(saveReply);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getReplies = async (req, res) => {
  try {
    const replies = await ReplyModel.find({})
      .populate("comments", "comment, postId");
    res.status(200).json(replies);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
