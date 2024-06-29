import userModel from "../models/user.js";

async function updateUser(req,res)
{
    try{
        const sessionUser = req.userId;
        const {userId , name , email , role} = req.body;
         const payload = {
            ...(email && {email : email}),
            ...(name && {name : name}),
            ...(role && {role : role}) 
         }
         const user =  await userModel.findById(sessionUser);
         console.log(user.role);
         const updatedUser = await userModel.findByIdAndUpdate(userId,payload);
         res.json({
            data : updatedUser,
            message : "User updated",
            success :true,
            error:false
         })
    }
    catch(err){
        res.status(400).json({
            message: err.message,
            error: true,
            success: false
        })
    }
}

export default updateUser;