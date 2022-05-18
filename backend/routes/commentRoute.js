import express from "express";
import { createComment } from "../controllers/commentController";
const router = express.Router();

router.post("/", createComment);

export default router;
