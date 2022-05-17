import PostModel from "../models/postModel";

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostModel({
    ...post,
    author: req.user._id,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find({});
    // .populate("author", "name email");
    // .populate("comments.replies");
    // .populate({
    //   path: "comments",
    //   model: "Comment",
    //   populate: {
    //     path: "replies",
    //     model: "Reply",
    //   },
    // });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params.id;
  try {
    const post = await PostModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};
