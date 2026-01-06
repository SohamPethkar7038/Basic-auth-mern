import express from 'express'

import User from '../models/User.models.js'
import { generateAccessAndRefreshTokens } from '../utility/user.utility.js';

const registerUser=async(req,res)=>{
    const {userName,email,password}=req.body;

    try {

        if(!userName || !email || !password){
            return res.status(400)
            .json({message:"please fill all the fields"})
        }

        const userExists=await User.findOne({email});

        if(userExists){
            return res.status(400)
            .json({message:"User already exists"})
        }

        const user=await User.create({
            userName,
            email,
            password
        })

        const createdUser = await User.findById(user._id)
      .select("-password -refreshToken");

      return res
      .status(201)
      .json({
        user: createdUser,
        message: "user registered successfully",
      });
    

    } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({
        message: "server error",
        error: error.message
    });
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
        const {accessToken,refreshToken}=await generateAccessAndRefreshTokens(user._id);
        const loggedInUser=await User.findById(user._id)
        .select("-password -refreshToken")
        
        const options={
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        }

        return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",refreshToken,options)
        .json({
            user:loggedInUser,
            accessToken,
            refreshToken,
            message:"User logged in successfully"
        })



        
    } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({
        message: "server error",
    });
}
}


export {registerUser,loginUser};