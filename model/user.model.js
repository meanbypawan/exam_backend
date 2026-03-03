import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    Email_Id:{
        type: String,
        required: true,
        trim: true
    },
    Name:{
        type: String,
        required: true
    },
    DOB:{
      type:String
    },
    Gender:{
      type:String
    },
    Mobile_No:{
        type: String,
        required: true,
        trim: true
    },
    Local_Address:{
        type:String
    },
    Permanent_Address:{
        type:String
    },
    Marital_Status:{
        type:String
    },
    Qualification:{
        type:String
    },
    Annual_Income:{
        type:String
    },
    password:{
        type: String,
        default: null
    },
    examStatus:{
        type: Boolean,
        default: false
    },
    code:{
        type: String,
        required: true
    },
    score:{
        type: Number
    },
    College_Name:{
        type: String,
        default:""
    }
});

export const User = mongoose.model("user",userSchema);