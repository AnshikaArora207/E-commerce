import { useEffect, useState } from "react"
import summaryApi from "../common";
import "../index.css"
import { Link } from "react-router-dom";

const CategoryList = () => {
    const [categoryProduct, setCategoryProduct] = useState([]);
    const [loading,setLoading] = useState(false);
    const categoryLoading = new Array(13).fill(null);
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
        { loading ? (
                categoryLoading.map((el,index)=>{return(
                    <div key={index} className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-[#303030]"></div>
                )})
        ) : (
            categoryProduct.map((product,index)=>{
                return (
                    <Link to={`/product-category/${product?.category}`} key={index}>
                    <div className="cursor-pointer">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-3 bg-white flex items-center justify-center">
                            <img src={product?.productImage[0]} className="h-full object-scale-down hover:scale-110 transition-all" alt="" />
                        </div>
                        <p className="text-center text-sm md:text-base capitalize">{product?.category}</p>
                    </div>
                    </Link>
                )
            })
        )
        }
        </div>
    </div>
  )
}

export default CategoryList