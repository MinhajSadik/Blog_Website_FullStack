import PostModel from "../models/postModel.js";

export const addPost = async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const newPost = new PostModel({
      title,
      content,
      author,
    });
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
    const posts = await PostModel.find({})
      .populate("author", "name email")
      .populate({
        path: "comments",
        populate: {
          path: "replies",
          model: "Reply",
        },
      })
      .sort({ createdAt: -1 });
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
    const post = await PostModel.findById(id)
      .populate("author", "name email")
      .populate({
        path: "comments",
        populate: {
          path: "replies",
          model: "Reply",
        },
      })
      .sort({ createdAt: -1 });
    res.status(200).send(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};
