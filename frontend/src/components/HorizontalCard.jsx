import { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../utils/fetchCategoryWiseProduct";
import rupees from "../utils/rupees";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import addToCart from "../utils/addToCart";
import Context from "../context";

const HorizontalCard = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(13).fill(null);
  const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();
  const { cart } = useContext(Context);
  const handleAdd = async(e,id)=>
  {
    await addToCart(e,id);
    cart();
  }
  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct.data);
    // console.log(categoryProduct);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };
  return (
    <div className="conatiner mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>
      <div
        className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none"
        ref={scrollElement}
      >
        <div className="justify-between w-full text-2xl hidden md:flex z-10">
          <button
            onClick={scrollLeft}
            className="bg-white shadow-md rounded-full text-black p-1 absolute left-5 text-lg hidden md:block"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={scrollRight}
            className="bg-white shadow-md rounded-full text-black p-1 absolute right-5 text-lg hidden md:block"
          >
            <FaAngleRight />
          </button>
        </div>
        {
        loading 
          ? loadingList.map((_,index) => {
              return (
                <div
                  key={index}
                  className=" flex flex-row w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-[#303030] rounded-sm shadow-md"
                >
                  <div className="h-full p-4 min-w-[120px] md:min-w-[145px] bg-[#404040] animate-pulse">
                    <img
                      src=""
                      className=" object-scale-down h-full hover:scale-110 transition-all"
                      alt=""
                    />
                  </div>
                  <div className="p-4 grid w-full gap-2">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 bg-[#404040] animate-pulse"></h2>
                    <p className="p-1 bg-[#404040] animate-pulse"></p>
                    <div className="flex flex-row gap-3 w-full">
                      <p className="text-red-500 p-1 bg-[#404040] animate-pulse"></p>
                      <p className="line-through text-slate-500 p-1 bg-[#404040] animate-pulse"></p>
                    </div>
                    <button className="bg-[#404040] px-4 py-1 rounded-full mt-2 text-sm w-full"></button>
                  </div>
                </div>
              );
            })
          :
           data.map((product, index) => {
              return (
                <Link to={`/product/${product?._id}`}
                  key={index}
                  className=" flex flex-row w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-[#303030] rounded-sm shadow-md"
                >
                  <div className="h-full p-4 min-w-[120px] md:min-w-[145px]">
                    <img
                      src={product.productImage[0]}
                      className=" object-scale-down h-full hover:scale-110 transition-all"
                      alt=""
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1">
                      {product.brandName} {product.productName}
                    </h2>
                    <p>{product.category}</p>
                    <div className="flex flex-row gap-3">
                      <p className="text-red-500">
                        {rupees(product.sellingPrice)}
                      </p>
                      <p className="line-through text-slate-500">
                        {rupees(product.price)}
                      </p>
                    </div>
                    <button onClick={(e)=>{handleAdd(e,product?._id)}} className="bg-green-700 px-4 py-1 rounded-full hover:bg-green-800 mt-2 text-sm">
                      Add to Cart
                    </button>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default HorizontalCard;
