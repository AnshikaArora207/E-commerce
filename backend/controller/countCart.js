import cartModel from "../models/cart.js";

const countCart = async(req,res)=>{
    try{
        const userId = req.userId;
        const count = await cartModel.countDocuments({userId})
        res.json({
            data : {
                count : count
            },
            message : "ok",
            success : true,
            error : false
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
export default countCart;