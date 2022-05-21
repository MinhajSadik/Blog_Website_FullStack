import express from "express";
import { addComment, getComment } from "../controllers/commentController";
const router = express.Router();

router.post("/", addComment);
router.get("/:id", getComment);

export default router;
