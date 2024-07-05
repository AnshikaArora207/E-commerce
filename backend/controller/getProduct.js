import productModel from "../models/product.js"

const getProduct = async(req,res)=>{
    try{
        const allProduct = await productModel.find().sort({createdAt : -1});
        res.status(200).json({
            message : "All Products",
            error : false,
            success : true,
            data : allProduct
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
export default getProduct;