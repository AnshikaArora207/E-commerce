import { useParams } from "react-router-dom"
import productCategory from "../utils/productCategory"
import { useState } from "react";

const Category = () => {
  const params = useParams();
  const [data,setData] = useState([]);
  const [loading,setLoading] = useState(false);
  const fetchData = async()=>{
    const response = await fetch();
    const responseData = await response.json();
    setData(responseData.data);  
    console.log(responseData);
  }
  return (
    <div className="conatiner mx-auto p-4">
      <div className="hidden lg:grid grid-cols-[200px,1px]">
        <div className="bg-[#343434] p-2 min-h-[calc(100vh-120px)] overflow-y-scroll scrollbar-none">
          <div className="">
            <h3 className="text-lg uppercase font-medium text-slate-300 border-b pb-1 border-slate-300">Sort by </h3>
            <form action="" className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input type="radio" name="sortBy" id="" />
                <label htmlFor="">Price - Low to High</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="radio" name="sortBy" id="" />
                <label htmlFor="">Price - High to Low</label>
              </div>
            </form>
          </div>

          <div className="">
            <h3 className="text-lg uppercase font-medium text-slate-300 border-b pb-1 border-slate-300">Category</h3>
            <form action="" className="text-sm flex flex-col gap-2 py-2">
              {
                productCategory.map((name,index)=>{
                  return <div className="flex items-center gap-3" key={index}>
                    <input type="checkbox" name="category" id={name.value} />
                    <label htmlFor={name.value}>{name.label}</label>
                  </div>
                })
              }
            </form>
          </div>
        </div>
        <div>diplay product</div>
      </div>
    </div>
  )
}

export default Category