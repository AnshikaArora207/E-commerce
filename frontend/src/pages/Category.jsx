import { Link, useParams } from "react-router-dom"
import productCategory from "../utils/productCategory"
import fetchCategoryWiseProduct from "../utils/fetchCategoryWiseProduct";
import { useEffect, useState } from "react";
import rupees from "../utils/rupees";
import summaryApi from "../common";

const Category = () => {
  const params = useParams();
  // console.log(params);
  const [data,setData] = useState([]);
  const [loading,setLoading] = useState(false);
  const [selectCategory, setSelectCategory] = useState({});
  const [filterList,setFilterList] = useState([]);
  const fetchData = async()=>{
    setLoading(true);
    const response = await fetch(summaryApi.filter.url,
      {
        method : summaryApi.filter.method,
        headers : {
          "content-type" : "application/json",
        },
        body : JSON.stringify({
          category : filterList
        })
      }
    );
    const responseData = await response.json();
    setData(responseData.data || []);  
    setLoading(false);
    console.log(responseData);
  }
  const initial = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(params.categoryName);
    setLoading(false);
    setData(categoryProduct.data);
    // console.log(categoryProduct);
  };
  const handleSelect = (e)=>{
    const {name,value,checked} = e.target
    setSelectCategory((prev)=>{
      return{
        ...prev,
         [value] : checked}
    })
    // console.log(name,value);
  }
  useEffect(() => {
    const categoryArray = Object.keys(selectCategory).map(name=>{
      if(selectCategory[name]) return name
      return null
    }).filter(el=>el)
    setFilterList(categoryArray)
    // console.log(categoryArray);
  }, [selectCategory]);
  useEffect(()=>{
    fetchData();
  },[filterList])
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
                    <input type="checkbox" name="category" checked={selectCategory[name.value]} value={name.value} id={name.value} onClick={handleSelect} />
                    <label htmlFor={name.value}>{name.label}</label>
                  </div>
                })
              }
            </form>
          </div>
        </div>
        {!loading && <div className="grid grid-cols-[400px,400px,400px] justify-evenly sm:justify-around mt-4 ml-8">
        {data.map((product,index)=>{
            return (<Link to={`/product/${product?._id}`}
              key={index}
              className=" flex flex-col w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] m-3 h-72 bg-[#303030] rounded-sm shadow-md"
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
        </div>}
      </div>
    </div>
  )
}

export default Category