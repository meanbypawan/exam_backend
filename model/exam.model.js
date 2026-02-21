import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
    code:{
        type:String,
        required: true,
        trim: true
    },
    status:{
        type: String,
        default: "Close"
    },
    schedule_date:{
        type: Date,
        required: true
    },
    SECRET_KEY:{
        type:String,
        default: null
    }
},{ timestamps: true });

export const Exam = mongoose.model("exam",examSchema);