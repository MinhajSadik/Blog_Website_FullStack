import express from "express";
import { createPost, getPost } from "../controllers/postController";
import checkAuth from "../middlewares/authMiddleware";
const router = express.Router();

router.post("/", checkAuth, createPost);
router.get("/", getPost);

export default router;
