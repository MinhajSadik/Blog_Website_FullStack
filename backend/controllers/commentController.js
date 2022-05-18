import CommentModel from "../models/commentModel";
//comment controller

export const createComment = async (req, res) => {
  const comment = req.body;
  const newComment = new CommentModel({
    ...comment,
  });
  try {
    const savedComment = await newComment.save();
    res.status(201).json({
      result: savedComment,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};
