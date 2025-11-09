import mongoose from "mongoose";

const tokenSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },

    token:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

export const Token=mongoose.model("Token",tokenSchema)