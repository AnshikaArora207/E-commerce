import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import summaryApi from "../common";
import { FaStar } from "react-icons/fa";
import rupees from "../utils/rupees";

const ProductDetails = () => {
    const [data,setData] = useState({
        productName : "",
        brandName : "",
        category : "",
        productImage : [],
        description : "",
        price : "",
        sellingPrice : ""
    })
    const {productImage} = data;
    const imageList = new Array(4).fill(null)
    const [loading,setLoading] = useState(false);
    const [activeImage,setActiveImage] = useState("");
    const params = useParams();
    const fetchDetails = async()=>{
        setLoading(true);
        const response = await fetch(summaryApi.productDetails.url,{
            method : summaryApi.productDetails.method,
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                productId : params?.id
            })
        })
        setLoading(false);
        const dataResponse = await response.json();
        setData(dataResponse.data);
        setActiveImage(dataResponse?.data?.productImage[0]);
    }
    useEffect(()=>{
        fetchDetails();
    },[])
    const handleHover = (image)=>{
        setActiveImage(image);
    }
  return (
    <div className="container mx-auto p-4">
        <div className="min-h-[200px] flex flex-col lg:flex-row">
            <div className="h-96 flex flex-col lg:flex-row gap-4 ml-4">
                <div className="flex flex-row-reverse gap-4">
                <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-[#303030]">
                    <img src={activeImage} className="w-full h-full object-scale-down" alt="" />
                </div>
                <div className="h-full">
                    {
                        loading ? <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                            {
                                imageList.map((el)=>{
                                    return <div className="h-20 w-20 bg-[#404040] rounded animate-pulse"></div>
                                })
                            }
                        </div> : 
                        <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                            {
                                productImage.map((image,index)=>{
                                    return <div key={index} className="h-20 w-20 bg-[#404040] rounded p-1">
                                        <img src={image} className="w-full h-full object-scale-down cursor-pointer" onClick={()=>handleHover(image)} onMouseEnter={()=>handleHover(image)} alt="" />
                                    </div>
                                })
                            }
                        </div>
                    }
                </div>
                </div>
                {
                    loading ? (<div className="flex flex-col gap-4 ml-8">
                        <p className="px-2 rounded-full w-full p-1 animate-pulse h-6 min-w-[580px] bg-[#404040]"></p>
                        <h2 className="text-2xl lg:text-4xl font-medium p-1 animate-pulse h-6 bg-[#404040] rounded-full min-w-[380px]"></h2>
                        <p className="capitalize text-slate-400 p-1 animate-pulse h-6 bg-[#404040] rounded-full min-w-[380px] mt-4"></p>
                        <div className="flex items-center gap-1 p-1 bg-[#404040] rounded-full">
                            
                        </div>
                        <div className="flex items-center gap-4 text-2xl my-1 font-medium mt-14">
                            <p className="text-red-500 p-1 animate-pulse h-6 bg-[#404040] rounded-full min-w-[180px]"></p>
                            <p className="text-slate-400 line-through p-1 animate-pulse h-6 bg-[#404040] rounded-full min-w-[180px]"></p>
                        </div>
                        <div className="flex flex-row gap-3 my-2 items-center mt-9">
                            <button className="bg-[#404040] px-4 py-1 font-medium rounded-full p-1 h-6 animate-pulse min-w-[380px]"></button>
                            <button className="bg-[#404040] px-4 py-1 rounded-full font-medium h-6 p-1 animate-pulse min-w-[380px]"></button>
                        </div>
                        <div>
                            <p className="text-slate-400 font-medium my-1 p-1 h-6 animate-pulse min-w-[180px] rounded-full"></p>
                            <p className="p-1 h-6 animate-pulse min-w-[180px] rounded-full"></p>
                        </div>
                    </div>) : (
                        <div className="flex flex-col gap-1 ml-8">
                <p className="bg-green-200 text-green-600 px-2 rounded-full w-fit">{data?.brandName}</p>
                <h2 className="text-2xl lg:text-4xl font-medium">{data?.productName}</h2>
                <p className="capitalize text-slate-400">{data?.category}</p>
                <div className="flex items-center gap-1">
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                </div>
                <div className="flex items-center gap-2 text-2xl my-1 font-medium">
                    <p className="text-red-500">{rupees(data?.sellingPrice)}</p>
                    <p className="text-slate-400 line-through">{rupees(data?.price)}</p>
                </div>
                <div className="flex flex-row gap-3 my-2 items-center">
                    <button className="bg-green-700 px-4 py-1 font-medium rounded-full hover:bg-green-800 min-w-[120px]">Buy</button>
                    <button className="bg-green-700 px-4 py-1 rounded-full font-medium hover:bg-green-800 min-w-[120px]">Add To Cart</button>
                </div>
                <div>
                    <p className="text-slate-400 font-medium my-1">Description : </p>
                    <p>{data?.description}</p>
                </div>
            </div>)
                }
            </div>
        </div>
    </div>
  )
}

export default ProductDetails