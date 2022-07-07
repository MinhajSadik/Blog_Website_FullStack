import express from "express";
import {
  addPost,
  getPost,
  getPostByAuthor,
  getPostBySearch,
  getPosts,
} from "../controllers/postController.js";
import checkAuth from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/", checkAuth, addPost);
router.get("/", getPosts);
router.get("/:id", getPost);
router.get("/search/:searchValue", getPostBySearch);
router.get("/author/:author", getPostByAuthor);

export default router;
