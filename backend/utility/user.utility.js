import express from "express"
import {User} from "../models/User.models.js"

export const generateAccessAndRefreshTokens=async(userId)=>{
    try {
        const user=await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        const accessToken=user.generateAccessToken();
        const refreshToken=user.generateRefreshToken();

        user.refreshToken=refreshToken;

        await user.save({ validateBeforeSave: false });

        return {accessToken,refreshToken};
    } catch (error) {
        throw new Error(
      "Something went wrong while generating access and refresh tokens"
    );
}

}