import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db.database.js";
import userRouter from "./routes/auth.routes.js";

dotenv.config();

const app = express();

/* BODY PARSERS */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true, 
}));

app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("started building auth using mern");
});

connectDB();
6
app.use("/api/v1/user", userRouter);

app.listen(process.env.PORT || 5000, () => {
    console.log(`server started at port ${process.env.PORT}`);
});
