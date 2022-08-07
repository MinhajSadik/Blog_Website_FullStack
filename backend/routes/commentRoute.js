import express from "express";
import { addComment, getComment } from "../controllers/commentController.js";
import checkAuth from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/", checkAuth, addComment);
router.get("/:id", getComment);

export default router;
