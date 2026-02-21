import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import questionRouter from './routes/question.route.js';
import userRouter from './routes/user.route.js';
import userPaperRouter from './routes/user-paper.route.js';
import adminRouter from "./routes/admin.route.js";
import examRouter from "./routes/exam.route.js";
import cors from "cors";
import dotenv from "dotenv"
dotenv.config();
const app = express();

mongoose.connect(process.env.DB_URL).then(result=>{
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use("/question",questionRouter);
    app.use("/user",userRouter);
    app.use("/paper",userPaperRouter);
    app.use("/admin",adminRouter);
    app.use("/exam",examRouter);
    app.listen(process.env.PORT, () => {
        console.log("Server Running..");
    })
}).catch(err=>{
   console.log(err);
});