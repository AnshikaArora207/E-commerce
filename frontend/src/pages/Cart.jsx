import { useEffect, useState } from "react"
import summaryApi from "../common";

const Cart = () => {
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);
    const fetchData = async()=>{
        const response = await fetch(summaryApi.viewCart.url,{
            method : summaryApi.viewCart.method,
            credentials : 'include',
            header : {
                "content-type" : "application/json"
            }, 
        })
        const responseData = await response.json();
        if(responseData.success) setData(responseData.data);
    }
    useEffect(()=>{
        fetchData();
    },[])
  return (
    <div className="container mx-auto">
        <div className="text-center text-lg py-2 m-3">
        {
            data.length === 0 && !loading && (
                <p className="py-5">No data</p>
            )
        }
        </div>
        <div></div>
    </div>
  )
}

export default Cart