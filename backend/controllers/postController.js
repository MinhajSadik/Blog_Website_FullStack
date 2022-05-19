import PostModel from "../models/postModel";

export const createPost = async (req, res) => {
  const post = req.body;
  try {
    const newPost = new PostModel({
      ...post,
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find({})
      .populate("author", "name email")
      .populate("postId");
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
    const post = await PostModel.findOne(id);
    res.status(200).json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};
