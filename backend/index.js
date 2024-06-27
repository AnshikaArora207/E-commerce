import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api",router);
connectDB();
const PORT = 8000;
app.listen(PORT,()=>{
    console.log("server is running on " ,PORT);
})