import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";


export const authMiddleware=async(req,res,next)=>{
    try {
        const auth=req.headers.authorization;
        if(!auth||!auth.startsWith("Bearer ")) return res.status(401).json({message:"Not Authorized"});

        const token=auth.split(' ')[1]
       
        const payload= jwt.verify(token,process.env.JWT_ACCESS_SECRET);

        const user=await User.findById(payload.id);
        if(!user) return res.status(400).json({message:"User Not Found"});

        req.user=user
        next()
        
    } catch (error) {
        return res.status(401).json({message:"Not Authorized"})
        
    }
}