import jwt from "jsonwebtoken";
export const verifyToken = async (request,response,next)=>{
   try{
     console.log(request.headers.authorization);
     next();  
   }
   catch(err){
     return response.status(401).json({error: "Bad request(Unauthorized user)"});
   }
}   