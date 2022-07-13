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

export const getPostByAuthor = async (req, res) => {
  const { author } = req.params;
  try {
    const user = await PostModel.find({ author })
      .populate("author", "name email")
      .populate({
        path: "comments",
        populate: {
          path: "replies",
          model: "Reply",
        },
      })
      .sort({ createdAt: -1 });
    res.status(200).send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getPostBySearch = async (req, res) => {
  const searchName = req.params.searchValue
    .toLowerCase()
    .replace(/\s/g, "")
    .trim();
  try {
    const searches = await PostModel.find({
      title: { $regex: searchName, $options: "i" },
      content: { $regex: searchName, $options: "i" },
    })
      .populate("author", "name email")
      .populate({
        path: "comments",
        populate: {
          path: "replies",
          model: "Reply",
        },
      })
      .sort({ createdAt: -1 });
    if (!searchName || searchName.length < 3) {
      res.status(404).json({
        message: `No posts found for ${searchName}`,
      });
    }

    return res.status(200).send(searches);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};
