import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import summaryApi from "../common";
import AdminProductCard from "../components/AdminProductCard";
const AllProducts = () => {
  const user = useSelector((state) => state?.user?.user);
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const response = await fetch(summaryApi.getProduct.url, {
      method: summaryApi.getProduct.method,
      credentials: "include",
    });
    const responseData = await response.json();
    setProducts(responseData?.data || []);
  };
  const navigate = useNavigate();
  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    if (user?.role !== "ADMIN") navigate("/");
  }, [user]);
  return (
    <div className="min-h-[calc(100vh-120px)] md:flex hidden">
      <aside className=" z-10 min-h-full w-full bg-slate-700 max-w-60 custom-shadow">
        <div className="h-32 flex flex-col justify-center items-center">
          <div className="text-5xl cursor-pointer relative flex justify-center">
            {user?.profilePic ? (
              <img className="w-16 h-16 rounded-full" src={user?.profilePic} />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className="text-lg capitalize font-semibold">{user?.name}</p>
          <p>{user?.role}</p>
        </div>
        <div>
          <nav className="grid p-4">
            <Link
              to="/admin/all-users"
              className="px-2 py-1 hover:bg-slate-800"
            >
              All users
            </Link>
            <Link
              to="/admin/all-products"
              className="px-2 py-1 hover:bg-slate-800"
            >
              All Products
            </Link>
          </nav>
        </div>
      </aside>
      <main className="w-full h-full p-2">
        <div>
          <div className="py-2 px-4 flex justify-between items-center">
            <h2 className="font-bold text-lg">All Products</h2>
            <button
              onClick={() => setOpen(true)}
              className="border border-green-600 text-green-600 py-2 px-4 rounded-full hover:text-white transition-all hover:bg-green-700"
            >
              Upload Product
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-5 py-4">
            {products.map((el, index) => {
              return <AdminProductCard data={el} key={index} />;
            })}
          </div>
          {open && <UploadProduct fetchProducts = {fetchProducts} onClose={() => setOpen(false)} />}
        </div>
      </main>
    </div>
  );
};

export default AllProducts;
