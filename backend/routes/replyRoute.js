import express from "express";
import { addReply, getReply } from "../controllers/replyController.js";
const router = express.Router();

router.post("/", addReply);
router.get("/:id", getReply);

export default router;
