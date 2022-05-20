import express from "express";
import { addReply, getReplies } from "../controllers/replyController";
const router = express.Router();

router.post("/", addReply);
router.get("/", getReplies);

export default router;
