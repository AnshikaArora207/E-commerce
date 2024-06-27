import mongoose from "mongoose";

async function connectDB(){
    try{
        mongoose.connect(process.env.MONGO_URL);
        console.log("connected to DB");
    }
    catch(err){
        console.log(err);
    }
}
export default connectDB;