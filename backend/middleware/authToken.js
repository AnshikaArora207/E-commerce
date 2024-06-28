import jwt from "jsonwebtoken";

async function authToken(req,res,next){
    try{
        const token = req.cookies?.token
        if(!token) return res.status(200).json({
            message : "User not login",
            error : true,
            success : false
        })
        jwt.verify(token,process.env.TOKEN_SECRET_KEY,function(err,decoded){
            req.userId = decoded?._id;
            next();
        })
        console.log("token   -    ",token);
    }
    catch(err){
        res.status(400).json({
            message : err.message,
            success : false,
            error : true,
            data : []
        })
    }
}

export default authToken;