import express from "express";
import { createPost, getPost } from "../controllers/postController";
import auth from "../middlewares/authMiddleware";
const router = express.Router();

router.post("/", auth, createPost);
router.get("/", getPost);

export default router;
