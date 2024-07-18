const filterPrroduct = async(req,res)=>{
    try{}
    catch(err){
        res.status(400).json({
            message: err.message,
            error: true,
            success: false
        })
    }
}
export default filterPrroduct;