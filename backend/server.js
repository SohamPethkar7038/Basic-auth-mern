
import express from "express"
import dotenv from 'dotenv'

// files
import { connectDB } from "./config/db.database.js";


const app=express();
dotenv.config();

app.get('/',(req,res)=>{
    res.send("started builing auth using mern")
});

connectDB();

app.listen(process.env.PORT || 5000,()=>{
    console.log(`server started at port ${process.env.PORT}`)
})

