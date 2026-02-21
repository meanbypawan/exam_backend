import express from "express";
import { uploadUser, userSignIn, fetchDataSheet } from "../controller/user.controller.js";
import multer from "multer";
const upload = multer({dest: "paper/"});
const router  = express.Router();

router.post("/upload-user",upload.single("users"),uploadUser);
router.post("/signin",userSignIn);
router.post("/data-sheet",fetchDataSheet);
export default router;