import uploadProductPermission from "../helpers/permission.js";
import productModel from "../models/product.js"

async function uploadProduct(req,res){
    try{
        const sessionUser = req.userId
        if(!uploadProductPermission(sessionUser)) throw new Error("Permission denied");
        const product = new productModel(req.body)
        const savedProduct = await product.save();

        res.status(200).json({
            message : "Product uploaded successfully",
            erro : false,
            success : true,
            data : savedProduct
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

export default uploadProduct;