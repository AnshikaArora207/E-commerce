const url = `https://api.cloudinary.com/v1_1/dgjhs8yha/image/upload`
const uploadImage = async(image)=>{
    const formData = new FormData()
    formData.append("file",image)
    formData.append("upload_preset","E-commerce")
    const responseData = await fetch(url,{
        method :"post",
        body : formData
    });
    const response = await responseData.json();
    return response;
}
export default uploadImage;