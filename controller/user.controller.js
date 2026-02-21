import path from "path";
import { fileURLToPath } from 'url';
import xlsx from 'xlsx';
import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const fetchDataSheet = (request,response,next)=>{
  let {code} = request.body;
  User.find({code})
  .then(result=>{
    return response.status(200).json({result});
  }).catch(err=>{
    return response.status(500).json({error: "Internal Server Error"});
  });
}

export const userSignIn = async(request,response,next)=>{
  try{  
    let user = await User.findOne({Mobile_No: request.body.mobile});
    if(user){
      if(user.password != request.body.password)
        return response.status(401).json({error:"Invalid password"});
      if(user.examStatus!=false)  
        return response.status(401).json({error: "Already you have appeared in exam"});
      
      const token = await generateToken(user);  
      delete user.password;
      return response.status(200).json({message: 'Sign success', user: user, token: token});
    }
    return response.status(401).json({error: "Invalid mobile number"});
  }
  catch(err){
    console.log(err);
    return response.status(500).json({error: "Server error"});
  } 
} 
export const uploadUser = async (request,response,next)=>{
   try{ 
    let code = request.body.code;
    const filePath = path.join(__dirname,'../',request.file.path); 
    const workbook = xlsx.readFile(filePath);
    let workbook_sheet = workbook.SheetNames;                
    let workbook_response = xlsx.utils.sheet_to_json(
        workbook.Sheets[workbook_sheet[0]]
    );

    for(let user of JSON.parse(JSON.stringify(workbook_response))){
      user.code = code; 
      await User.create(user);
    }
    return response.status(200).json({message: "Data uploaded successfully"});
  }
  catch(err){
    console.log(err);
    return response.status(500).json({error: "Server error"});
  } 
}
const generateToken = async(user)=>{
    const payload = {payload: user.Mobile_No.toString()};
    let token = await jwt.sign(payload,"dfdklereerxvcvcvdsferowirueiourecnmvxvcfdfjljflfdfpreieod");
    return token;
}