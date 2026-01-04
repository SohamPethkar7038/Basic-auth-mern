
import express from "express"
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";

// files
import { connectDB } from "./config/db.database.js";


const app=express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    Credential:true
}))

dotenv.config();

app.use(cookieParser())

app.get('/',(req,res)=>{
    res.send("started builing auth using mern")
});

connectDB();

app.listen(process.env.PORT || 5000,()=>{
    console.log(`server started at port ${process.env.PORT}`)
})

