import express from 'express'

import User from '../models/User.models.js'

const registerUser=async(req,res)=>{
    const {userName,email,password}=req.body;

    try {
        if(!username || !email || !password){
            return res.status(400)
            .json({message:"please fill all the fields"})
        }

        const userExists=await User.findOne({email});

        if(userExists){
            return res.status(400)
            .json({message:"User already exists"})
        }

        const user=await User.create({userName,email,password})
        res.status(400).json({
            id:user._id,
            userName:user.userName,
            email : user.email,
        })
    } catch (error) {
        res.status(500)
        .json({message :"server error"});
    }
}


const loginUser=async(req,res)=>{
     const {email,password}=req.body;

    try {
        if(!email || !password){
            return res
            .status(400)
            .json({message:"please fill all the fields"});
        }

        const user=await User.findOne({email});

        if(!user || !(await user.matchPassword(password))){
            return res
            .status(401)
            .json({message: "Invalid credentials"});
        }

        res.status(201)
        .json({
           id:user._id,
           username: user.userName,
           email:user.email
        });
    } catch (error) {
        res.status(500)
        .json({message:"server error"});
    }
}


export {registerUser,loginUser};