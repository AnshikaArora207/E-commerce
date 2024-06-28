import userModel from "../models/user.js";

async function userDetail(req,res){
    try{
        console.log(req.userId);
        const user = await userModel.findById(req.userId)
        res.status(200).json({
            data : user,
            success : true,
            error : false,
            message : "user details"
        })
    }catch(err){
        res.status(400).json({
            message : err.message,
            error : true,
            success : false
        })
    }
}

export default userDetail;