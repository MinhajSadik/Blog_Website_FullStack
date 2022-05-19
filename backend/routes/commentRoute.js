import express from "express";
import { createComment, getComments } from "../controllers/commentController";
import checkAuth from "../middlewares/authMiddleware";
const router = express.Router();

router.post("/", checkAuth, createComment);
router.get("/", getComments);

export default router;
