import express from "express";
import { createReply, getReplies } from "../controllers/replyController";
const router = express.Router();

router.post("/", createReply);
router.get("/", getReplies);

export default router;
