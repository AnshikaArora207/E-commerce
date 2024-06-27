import userModel from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

async function userSignin(req,res){
    try{
        const {email, password} = req.body
        if(!email) throw new Error("Please provide an email");
        if(!password) throw new Error("Please provide a password");
        const user = await userModel.findOne({email});
        if(!user) throw new Error("User not found");
        const checkPassword = await bcrypt.compare(password,user.password)
        if(checkPassword){
            const tokenData = {
                _id : user._id,
                email : user.email
            }
            const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET_KEY,{expiresIn : 60*60*8})
            const tokenOptions = {
                httpOnly : true,
                secure : true
            }
            res.cookie("token",token,tokenOptions).status(200).json({
                message : "Login Successfully",
                data : token,
                success : true, 
                error : false
            })
        }
        else throw new Error("Check your password");
    }catch(err){
        res.json({
            message: err.message,
            error: true,
            success: false
        })
    }
}

export default userSignin;