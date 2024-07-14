import cartModel from "../models/cart.js"

const addToCart = async(req,res)=>
{
    try{
        const {productId} = req?.body
        const currentUser = req.userId
        const isProductAvailable = await cartModel.findOne({productId})
        if(isProductAvailable)
        {
            return res.json({
                message : "Already exist in your cart",
                success : false,
                error : true
            })
        }
        const payload = {
            productId : productId,
            quantity : 1,
            userId : currentUser
        }
        const newAdded = new cartModel(payload);
        const saved = await newAdded.save();
        res.json({
            message: "Product added to your cart",
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
export default addToCart;