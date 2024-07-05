import productModel from "../models/product.js"

const getCategory = async(req,res)=>{
    try{
        const productCategory = await productModel.distinct("category");
        const productByCategory = [];
        for(const category of productCategory){
            const product = await productModel.findOne({category});
            if(product) productByCategory.push(product);
        }
        // console.log("category : ",product);
        res.status(200).json({
            message : "Products by category",
            error : false,
            success : true,
            data : productByCategory
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
export default getCategory;