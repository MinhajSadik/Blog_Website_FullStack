import express from "express";
import { addPost, getPost, getPosts } from "../controllers/postController.js";
import checkAuth from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/", checkAuth, addPost);
router.get("/", getPosts);
router.get("/:id", getPost);

export default router;
