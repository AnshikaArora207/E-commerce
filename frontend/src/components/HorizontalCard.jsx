import { useEffect, useState } from "react";
import fetchCategoryWiseProduct from "../utils/fetchCategoryWiseProduct";
import rupees from "../utils/rupees";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const HorizontalCard = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(13).fill(null);
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
  return (
    <div className="conatiner mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>
      <div className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none">
      <div className="justify-between w-full text-2xl hidden md:flex">
            <button
              className="bg-white shadow-md rounded-full text-black p-1 absolute left-1"
            >
              <FaAngleLeft />
            </button>
            <button
              className="bg-white shadow-md rounded-full text-black p-1 absolute right-1"
            >
              <FaAngleRight />
            </button>
          </div>
      {data.map((product, index) => {
        return (
          <div
            key={index}
            className=" flex flex-row w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-[#303030] rounded-sm shadow-md"
          >
            <div className="h-full p-4 min-w-[120px] md:min-w-[145px]">
              <img src={product.productImage[0]} className=" object-scale-down h-full hover:scale-110 transition-all" alt="" />
            </div>
            <div className="p-4">
                <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1">{product.productName}</h2>
                <p>{product.category}</p>
                <div className="flex flex-row gap-3">
                    <p className="text-red-500">{rupees(product.sellingPrice)}</p>
                    <p className="line-through text-slate-500">{rupees(product.price)}</p>
                </div>
                <button className="bg-green-700 px-4 py-1 rounded-full hover:bg-green-800 mt-2 text-sm">Add to Cart</button>
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default HorizontalCard;
