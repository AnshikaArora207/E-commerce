import cartModel from "../models/cart.js";

const viewCart = async(req,res)=>{
    try{
        const currentUser = req.userId;
        const allProduct = await cartModel.find({userId:currentUser}).populate("productId");
        res.json({
            success : true,
            error : false,
            data : allProduct,
            message : "ok"
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
export default viewCart;