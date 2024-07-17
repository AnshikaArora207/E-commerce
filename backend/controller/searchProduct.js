import productModel from "../models/product.js";

const searchProduct = async(req,res)=>{
    try{
        const query = req.query.q;
        const regex = new RegExp(query,'i','g')
        const product = await productModel.find({
            "$or" : [
                {productName : regex},
                {category : regex}
            ]
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
export default searchProduct;