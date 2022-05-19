import express from "express";
import { createReply, getReplies } from "../controllers/replyController";
import checkAuth from "../middlewares/authMiddleware";
const router = express.Router();

router.post("/", checkAuth, createReply);
router.get("/", getReplies);

export default router;
