import productModel from "../models/product.js";

const getProductDetails = async(req,res)=>{
    try{
        const {productId} = req.body
        const product = await productModel.findById(productId)
        res.json({
            data:product,
            success : true,
            error : false,
            message : "ok"
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
export default getProductDetails;