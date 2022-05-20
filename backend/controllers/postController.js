import PostModel from "../models/postModel";

export const addPost = async (req, res) => {
  const post = req.body;
  try {
    const newPost = new PostModel(post);
    const savePost = await newPost.save();
    res.status(201).send(savePost);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find({}).populate({
      path: "comments",
      populate: {
        path: "replies",
        model: "Reply",
      },
    });
    res.status(200).send(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostModel.findById(id).populate({
      path: "comments",
      populate: {
        path: "replies",
        model: "Reply",
      },
    });
    res.status(200).send(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};
