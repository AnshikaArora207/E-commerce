import express from "express";
import userSignup from "../controller/userSignup.js";
import userSignin from "../controller/userSignin.js";
import userDetail from "../controller/userDetail.js";
import authToken from "../middleware/authToken.js";
import userLogout from "../controller/userLogout.js";
import allUsers from "../controller/allUsers.js";
import updateUser from "../controller/updateUser.js";


const router = express.Router()
router.post("/signup",userSignup);
router.post("/login",userSignin);
router.get("/user-details",authToken,userDetail);
router.delete("/logout",userLogout);

router.get("/admin/all-users",authToken,allUsers);
router.post("/admin/update-user",authToken,updateUser);

export default router;