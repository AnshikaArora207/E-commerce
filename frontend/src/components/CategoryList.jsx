import { useEffect, useState } from "react"
import summaryApi from "../common";
import "../index.css"

const CategoryList = () => {
    const [categoryProduct, setCategoryProduct] = useState([]);
    const [loading,setLoading] = useState(false);
    const fetchCategoryProduct = async()=>{
            setLoading(true);
            const response = await fetch(summaryApi.getCategory.url,{
            method : summaryApi.getProduct.method
        })
        const responseData = await response.json();
        setLoading(false);
        setCategoryProduct(responseData.data);
    }
    useEffect(()=>{
        fetchCategoryProduct();
    },[])
  return (
    <div className="container mx-auto p-4">
        <div className="flex items-center gap-4 justify-between overflow-scroll scrollbar-none">
        {
            categoryProduct.map((product,index)=>{
                return (
                    <div key={index} className="cursor-pointer">
                        <div className="w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden p-3 bg-white flex items-center justify-center">
                            <img src={product?.productImage[0]} className="h-full object-fill" alt="" />
                        </div>
                        <p className="text-center text-sm md:text-base capitalize">{product?.category}</p>
                    </div>
                )
            })
        }
        </div>
    </div>
  )
}

export default CategoryList