import productModel from "../models/product.js"

const filterProduct = async(req,res)=>{
    try{
        const categoryList = req.body.category
        const product = await productModel.find({
            category : {
                "$in" : categoryList
            }
        })
        res.json({
            data : product,
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
export default filterProduct;