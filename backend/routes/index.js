import express from "express";
import userSignup from "../controller/userSignup.js";
import userSignin from "../controller/userSignin.js";
import userDetail from "../controller/userDetail.js";
import authToken from "../middleware/authToken.js";
import userLogout from "../controller/userLogout.js";


const router = express.Router()
router.post("/signup",userSignup);
router.post("/login",userSignin);
router.get("/user-details",authToken,userDetail);
router.delete("/logout",userLogout);
export default router;