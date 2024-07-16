import cartModel from "../models/cart.js"

const deleteProduct = async(req,res)=>{
    try{
        const currentUser = req.userId
        const productId = req.body._id
        const deleted = await cartModel.deleteOne({_id : productId})
        res.json({
            message : "product deleted from cart",
            success : true,
            error : false,
            data : deleted
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
export default deleteProduct;