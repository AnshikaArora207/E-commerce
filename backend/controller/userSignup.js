import userModel from "../models/user.js";
import bcrypt from "bcryptjs"

async function userSignup(req,res){
    try{
        const {email, password, name} = req.body
        const user = await userModel.findOne({email});
        if(user) throw new Error("User already exists");
        if(!email) throw new Error("Please provide an email");
        if(!password) throw new Error("Please provide a password");
        if(!name) throw new Error("Please provide a name");
        const salt = bcrypt.genSaltSync(10);
        const hashPassword =await bcrypt.hashSync(password,salt);
        if(!hashPassword) throw new Error("Something is wrong");

        const payload = {
            ...req.body,
            role : "GENERAL",
            password : hashPassword
        }

        const userData = new userModel(payload)
        const saveUser = await userData.save();

        res.status(201).json({
            message : "User created successfully",
            error : false,
            success : true,
            data : saveUser
        })
    }
    catch(err){
        res.json({
            message: err.message,
            error: true,
            success: false
        })
    }
}

export default userSignup;