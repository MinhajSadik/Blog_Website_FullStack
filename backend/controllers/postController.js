import PostModel from "../models/postModel";

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostModel({
    ...post,
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
  // const { title, content, date } = req.body;
  // const newPost = new PostModel({
  //   title,
  //   content,
  //   date,
  //   createAt: new Date().toISOString(),
  // });
  // try {
  //   await newPost.save();
  //   res.status(201).json(newPost);
  // } catch (error) {
  //   console.error(error.message);
  //   res.status(500).json({
  //     message: error.message,
  //   });
  // }
};

export const getPost = async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
