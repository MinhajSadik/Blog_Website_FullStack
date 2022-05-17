import express from "express";
import { createPost, getPost, getPosts } from "../controllers/postController";
import checkAuth from "../middlewares/authMiddleware";
const router = express.Router();

router.post("/", checkAuth, createPost);
router.get("/", getPosts);
router.get("/:id", getPost);

export default router;
