import ReplyModel from "../models/replyModel";

export const createReply = async (req, res) => {
  const reply = req.body;
  try {
    const newReply = new ReplyModel({
      ...reply,
    });
    const savedReply = await newReply.save();
    res.status(201).json(savedReply);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getReplies = async (req, res) => {
  try {
    const replies = await ReplyModel.find({})
      //   .populate("author", "name email")
      .populate("comments", "comment, postId");
    res.status(200).json(replies);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
