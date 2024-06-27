import express from "express";
import userSignup from "../controller/userSignup.js";
import userSignin from "../controller/userSignin.js";


const router = express.Router()
router.post("/signup",userSignup);
router.post("/login",userSignin);
export default router;