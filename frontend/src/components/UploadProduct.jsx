import { useState } from "react"
import { IoClose, IoCloudUpload } from "react-icons/io5"
import productCategory from "../utils/productCategory.js";
import { IoMdCloudUpload } from "react-icons/io";
import uploadImage from "../utils/uploadImage.js";
import { MdDelete } from "react-icons/md";

const UploadProduct = ({onClose}) => {
    const [data,setData] = useState({
        productName : "",
        brandName : "",
        category : "",
        productImage :[],
        description : "",
        price: "",
        sellingPrice: ""
    });
    const [inputImage, setInputImage] = useState("");
    const handleChange = (e)=>{
        const {name,value} = e.target;
        setData((prev)=>{
            return{
                ...prev,
                [name] : value
            }
        })
    }
    const handleUploadImage = async(e)=>{
        const file = e.target.files[0];
        setInputImage(file.name);
        const uploadImageCloudinary = await uploadImage(file)
        // console.log(uploadImageCloudinary.url);
        setData((prev)=>{
            return{
                ...prev,
                productImage : [...prev.productImage,uploadImageCloudinary.url]
            }
        })
    }
    const handleDelete = async(index)=>{
        const newProductImage = [...data.productImage]
        newProductImage.splice(index,1)
        setData((prev)=>{
            return{
                ...prev,
                productImage : [...newProductImage]
            }
        })
    }
  return (
    <div className="h-full w-full fixed top-0 bottom-0 left-0 z-10 flex justify-center items-center bg-white bg-opacity-30">
        <div className="w-full mx-auto bg-[#262626] shadow-xl max-w-lg p-4 max-h-[80%] overflow-scroll">
            <div className="flex justify-center items-center">
                <h2 className="font-bold text-lg">Upload a new product</h2>
                <button className="block ml-auto" onClick={onClose}>
                    <IoClose />
                </button>
            </div>
            <form className="grid p-4 gap-3 h-full">
                <label htmlFor="productName">Product Name :</label>
                <input className="p-2 bg-slate-600 border rounded" type="text" id="productName" placeholder="enter product name" value={data.productName} onChange={handleChange} />
                <label htmlFor="brandName">Brand Name :</label>
                <input className="p-2 bg-slate-600 border rounded" type="text" id="brandName" placeholder="enter brand name" value={data.brandName} onChange={handleChange} />
                <label htmlFor="category">Category :</label>
                <select value={data.category} onChange={handleChange} className="p-2 bg-slate-600 border rounded" name="category" id="">
                    {
                        <option value={""}>Select Category</option>
                        productCategory.map((el,index)=>{
                            return(
                                <option value={el.label} key={el.id}>{el.label}</option>
                            )
                        })
                    }
                </select>
                <label htmlFor="productImage">Product Image :</label>
                <label htmlFor="uploadImage">
                    <div className="p-2 border rounded h-32 w-full bg-slate-600 flex justify-center items-center">
                        <div className="text-slate-400 flex flex-col justify-center items-center">
                            <IoCloudUpload size={40}/>
                            <p>Upload Product Image</p>
                            <input type="file" id="uploadImage" className="hidden cursor-pointer" onChange={handleUploadImage} />
                        </div>
                    </div>
                </label>
                <div className="flex flex-row gap-2">
                    {data.productImage[0] ? (data.productImage.map((el,index)=>{
                        return (<div key={index} className="relative group cursor-pointer"><img src={el} width={100} height={100} className="bg-slate-600" alt="" /><div onClick={()=>{handleDelete(index)}} className="absolute bottom-0 right-0 p-1 z-10 hidden group-hover:block"><MdDelete color="red"/></div></div>)
                    })) : (<p className="text-red-600 text-xs">Upload Image</p>)
                }
                </div>
                <label htmlFor="price">Price :</label>
                <input className="p-2 bg-slate-600 border rounded" type="number" id="price" placeholder="enter price" value={data.price} onChange={handleChange} />
                <label htmlFor="price">Selling Price :</label>
                <input className="p-2 bg-slate-600 border rounded" type="numer" id="sellingPrice" placeholder="enter selling price" value={data.sellingPrice} onChange={handleChange} />
                <label htmlFor="description">Description :</label>
                <textarea name="description" className="h-28 bg-slate-600 border resize-none p-1" placeholder="enter product description" rows={3} id="" value={data.description}></textarea>
                <button className="px-3 py-2 bg-green-600 mb-10 hover:bg-green-700">Upload Product</button>
            </form>
        </div>
    </div>
  )
}

export default UploadProduct