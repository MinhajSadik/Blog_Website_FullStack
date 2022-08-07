import express from "express";
import { addReply, getReply } from "../controllers/replyController.js";
import checkAuth from "../middlewares/authMiddleware";
const router = express.Router();

router.post("/", checkAuth, addReply);
router.get("/:id", getReply);

export default router;
