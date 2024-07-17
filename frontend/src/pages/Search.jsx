import { Link, useLocation } from "react-router-dom"
import summaryApi from "../common";
import { useContext, useEffect, useState } from "react";
import rupees from "../utils/rupees";
import addToCart from "../utils/addToCart";
import Context from "../context";

const Search = () => {
    const query = useLocation();
    const [data,setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { cart } = useContext(Context);
    const handleAdd = async(e,id)=>
      {
        await addToCart(e,id);
        cart();
      }
    const fetchData = async()=>{
      setLoading(true);
      const response = await fetch(summaryApi.search.url+query.search,{
        method : summaryApi.search.method
      })
      const responseData = await response.json();
      // console.log(responseData);
      setData(responseData.data);
      setLoading(false);
    }
    useEffect(()=>{
      fetchData();
    },[query])
    // console.log(query.search);
  return (
    <div className="container mx-auto p-4">
      {
        loading && <p className="text-lg text-center">Loading...</p>
      }
      <p className="text-lg font-semibold my-3">Search Results : {data.length}</p>
      {
        data.length === 0 && !loading && (
          <p className="text-lg text-center p-4 bg-[#343434]">No Data Found...</p>
        )
      }
      {
        data.length !== 0 && !loading && (
          <div className="flex flex-row flex-wrap gap-[24px] justify-between sm:justify-around mt-4">
            {data.map((product,index)=>{
            return (<Link to={`/product/${product?._id}`}
              key={index}
              className=" flex flex-col w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-72 bg-[#303030] rounded-sm shadow-md"
            >
              <div className="h-32 p-4 min-w-[120px] md:min-w-[145px] flex items-center justify-center">
                <img src={product.productImage[0]} className=" object-scale-down h-full hover:scale-110 transition-all" alt="" />
              </div>
              <div className="p-4">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1">{product.brandName} {product.productName}</h2>
                  <p>{product.category}</p>
                  <div className="flex flex-row gap-3">
                      <p className="text-red-500">{rupees(product.sellingPrice)}</p>
                      <p className="line-through text-slate-500">{rupees(product.price)}</p>
                  </div>
                  <div className="flex items-center justify-center">
                  <button className="bg-green-700 px-4 py-1 rounded-full hover:bg-green-800 mt-2 text-sm">Add to Cart</button>
                  </div>
              </div>
            </Link>)
          })}
          </div>
        )
      }
    </div>
  )
}

export default Search