import cartModel from "../models/cart.js"

const updateCart = async(req,res)=>{
    try{
        const currentUser = req.userId
        const productId = req.body._id
        const q = req.body.quantity
        const updateProduct = await cartModel.updateOne({_id : productId},{
            ...(q && {quantity : q})
        })
        re.json({
            message : "updated product",
            data : updateProduct,
            success : true,
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
export default updateCart;