import { User } from "../model/user.model.js"


export const getProfile=async(req,res)=>{
   
    res.json(req.user)
   
}


export const updateProfile=async(req,res)=>{

}