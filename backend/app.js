import express from "express"
import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./route/auth.route.js"
import userRoutes from "./route/user.route.js"
import productRoutes from "./route/product.route.js"
import "./passport/googleStrategy.js"





dotenv.config();

const app=express();


app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use(cors({origin:"https://p-p1-taupe.vercel.app",credentials:true}));

//routes

app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes)
app.use("/api/products",productRoutes)




export default app


