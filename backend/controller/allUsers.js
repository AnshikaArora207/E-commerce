import userModel from "../models/user.js";

async function allUsers(req,res){
    try{
        console.log(req.userId);
        const allUsers = await userModel.find()
        res.json({
            message : "All Users",
            data : allUsers,
            success :true,
            error : false
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

export default allUsers;