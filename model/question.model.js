import mongoose, { model } from "mongoose";
const questionSchema = new mongoose.Schema({
  Id:{
    type: Number
  },
  Question:{
    type: String,
    required: true,
    trim: true
  },
  A:{
    type: String,
    required: true,
    trim: true
  },
  B:{
    type: String,
    required: true,
    trim: true
  },
  C:{
    type: String,
    required: true,
    trim: true
  },
  D:{
    type: String,
    required: true,
    trim: true
  },
  Answer:{
    type: String,
    required: true,
    trim: true
  },
  Category:{
    type: String,
    required: true,
    trim: true
  },
  AnswerKey:{
    type: String,
    trim: true
  },
  MarkedForReview:{
    type: String,
    trim: true
  }
});

export const Question = mongoose.model("question",questionSchema);  