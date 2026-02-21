import mongoose from "mongoose";

const userPaperSchema  = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user" 
  },
  questionsList:[],
});

export const UserPaper = mongoose.model("user-paper",userPaperSchema);
