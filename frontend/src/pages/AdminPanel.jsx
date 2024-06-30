import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  useEffect(()=>{
    if(user?.role !== "ADMIN") navigate("/");
  },[user]) 
  return (
    <div className="min-h-[calc(100vh-120px)] md:flex hidden">
      <aside className=" z-10 min-h-full w-full bg-slate-700 max-w-60 custom-shadow">
        <div className="h-32 flex flex-col justify-center items-center">
          <div className="text-5xl cursor-pointer relative flex justify-center">
            {user?.profilePic ? (
              <img className="w-16 h-16 rounded-full" src={user?.profilePic} />
            ) : (
              <FaRegCircleUser/>
            )}
          </div>
          <p className="text-lg capitalize font-semibold">{user?.name}</p>
          <p>{user?.role}</p>
        </div>
        <div>
          <nav className="grid p-4">
            <Link to="/admin/all-users" className="px-2 py-1 hover:bg-slate-800">All users</Link>
            <Link to="/admin/all-products" className="px-2 py-1 hover:bg-slate-800">All Products</Link>
          </nav>
        </div>
      </aside>
      <main className="h-full w-full p-2">main</main>
    </div>
  );
};

export default AdminPanel;
