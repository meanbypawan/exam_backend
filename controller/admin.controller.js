import Admin from "../model/admin.model.js";
export const login = (request,response,next)=>{
    const {username,password} = request.body;
    Admin.find({username,password})
    .then(result=>{
        if(result.length)
          return response.status(200).json({status: true,message: "Sign in success"});
        return response.status(200).json({status:false,message: "Invalid username or password"});
    }).catch(err=>{
        return response.status(500).json({error: "Internal Server Error"});
    })
}