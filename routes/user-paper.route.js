import express from "express";
import { generateQuestionPaper, submitTest } from "../controller/user-paper.controller.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();
router.post("/generate",verifyToken,generateQuestionPaper);
router.post("/submit",submitTest);
export default router;  