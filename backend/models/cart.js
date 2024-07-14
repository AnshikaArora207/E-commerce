import mongoose, { mongo } from "mongoose";

const cartSchema = new mongoose.Schema({
    productId : String,
    quantity : Number,
    userId : String
},{timestamps : true
})

const cartModel = mongoose.model("cart",cartSchema)
export default cartModel;