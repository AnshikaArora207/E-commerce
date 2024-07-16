import { useContext, useEffect, useState } from "react"
import summaryApi from "../common";
import Context from "../context";
import rupees from "../utils/rupees";
import { MdDelete } from "react-icons/md";

const Cart = () => {
    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(false);
    const context = useContext(Context)
    const loadingCart = new Array(context.cartProduct).fill(null);
    const fetchData = async()=>{
        setLoading(true);
        const response = await fetch(summaryApi.viewCart.url,{
            method : summaryApi.viewCart.method,
            credentials : 'include',
            header : {
                "content-type" : "application/json"
            }, 
        })
        const responseData = await response.json();
        setLoading(false);
        if(responseData.success) {
            // console.log("entered");
        setProducts(responseData.data);
        }
        // console.log(responseData.data);
        // console.log(products);
    }
    useEffect(()=>{
        fetchData();
    },[])
    const increase = async(id,qty)=>{
        const response = await fetch(summaryApi.updateCart.url,{
            method : summaryApi.updateCart.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                _id : id,
                quantity : qty+1
            })
        })
        const responseData = await response.json();
        // console.log(responseData.success);
        // if(responseData.success) 
            fetchData();
    }
    const decrease = async(id,qty)=>{
        if(qty>=2){
        const response = await fetch(summaryApi.updateCart.url,{
            method : summaryApi.updateCart.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                _id : id,
                quantity : qty-1
            })
        })
        const responseData = await response.json();
        // if(responseData.success) 
            fetchData();
    }
    }
    const deleteProduct= async(id)=>{
        const response = await fetch(summaryApi.deleteProduct.url,{
            method : summaryApi.deleteProduct.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                _id : id,
            })
        })
        const responseData = await response.json();
        // console.log(responseData.success);
        // if(responseData.success) 
            fetchData();
        context.cart();
    }
  return (
    <div className="container mx-auto">
        <div className="text-center text-lg py-2 m-3 h-full">
        {
            products.length === 0 && !loading && (
                <p className="py-5 h-full">No data</p>
            )
        }
        </div>
        <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
            <div className="w-full max-w-4xl">
                {
                    loading ? (
                        loadingCart.map((_,index)=>{return <div key={index} className="w-full bg-[#404040] h-32 my-2 border border-[#343434] animate-pulse rounded"></div>})
                    ) : (
                        products.map((el,index)=>{
                            return <div key={index} className="w-full bg-[#343434] h-32 my-2 border border-[#343434] rounded grid grid-cols-[128px,1fr]">
                                <div className="w-28 h-28">
                                    <img src={el?.productId.productImage[0]} alt="" className="w-full h-full object-scale-down" />
                                </div>
                                <div className="px-4 py-2 relative">
                                    <div className="absolute right-0 text-red-500 rounded-full p-2 hover:text-white hover:bg-red-500 cursor-pointer" onClick={()=>{deleteProduct(el?._id)}}>
                                        <MdDelete/>
                                    </div>
                                    <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">{el?.productId.productName}</h2>
                                    <p className=" capitalize text-slate-500">{el?.productId.category}</p>
                                    <p className="text-red-500">{rupees(el?.productId.sellingPrice)}</p>
                                    <div className="flex flex-row gap-2 my-2">
                                        <button onClick={()=>{decrease(el?._id,el?.quantity)}} className="border border-green-600 hover:bg-green-600 hover:text-white text-green-600 w-6 h-6 flex justify-center items-center">-</button>
                                        <span>{el?.quantity}</span>
                                        <button onClick={()=>{increase(el?._id,el?.quantity)}} className="border border-green-600 hover:bg-green-600 hover:text-white text-green-600 w-6 h-6 flex justify-center items-center">+</button>
                                    </div>
                                </div>
                            </div>
                        })
                    )
                }
            </div>
            <div className="mt-5 w-full lg:mt-0 max-w-md">
            {
                !loading && <div className="h-36 bg-[#343434]">Total</div>
            }
            </div>
        </div>
    </div>
  )
}

export default Cart