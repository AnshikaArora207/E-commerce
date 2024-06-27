import express from "express";
import userSignup from "../controller/userSignup.js";


const router = express.Router()
router.post("/signup",userSignup);
export default router;