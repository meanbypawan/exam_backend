import express from "express";
import { uploadQuestion } from "../controller/question.controller.js";
import multer from "multer";
const upload = multer({dest: 'paper/'});

const router = express.Router();

router.post("/upload-question",upload.single('questions'),uploadQuestion);

export default router;