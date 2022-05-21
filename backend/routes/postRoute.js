import express from "express";
import { addPost, getPost, getPosts } from "../controllers/postController.js";
import checkAuth from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/", checkAuth, addPost);
router.get("/", checkAuth, getPosts);
router.get("/:id", checkAuth, getPost);

export default router;
