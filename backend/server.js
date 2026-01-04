import express from "express"
import dotenv from 'dotenv'


const app=express();
dotenv.config();

app.get('/',(req,res)=>{
    res.send("started builing auth using mern")
});

app.listen(process.env.PORT || 5000,()=>{
    console.log(`server started at port ${process.env.PORT}`)
})