import logo from "../assets/logo.png";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import summaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import { useContext, useState } from "react";
import Context from "../context";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let searchInput = useLocation();
  const URLsearch = new URLSearchParams(searchInput.search);
  const searchQuery = URLsearch.getAll("q");
  searchInput = searchInput.search.split("=")[1];
  const [search,setSearch] = useState(searchQuery);
  // console.log("user", user);
  const handleLogout = async () => {
    const fetchData = await fetch(summaryApi.logout.url, {
      method: summaryApi.logout.method,
      credentials: "include",
    });
    const data = await fetchData.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
    }
    if (data.error) toast.error(data.message);
    navigate("/home");
  };
  // console.log(context);
  const handleSearch = (e)=>{
    const {value} = e.target
    setSearch(value)
    if(value) navigate(`/search?q=${value}`)
  }
  return (
    <header className="shadow-md">
      <div className="container mx-auto flex items-center py-2 px-4 justify-between">
        <div className="">
          <Link to="/">
            <img className="h-[60px] w-[60px]" src={logo} alt="" />
          </Link>
        </div>
        <div className="hidden lg:flex flex-row">
          <input
            className="bg-slate-700 text-white px-4 py-1 rounded-l-2xl min-w-[300px] hover:border-white hover:border-[1px] hover:cursor-pointer"
            type="text"
            placeholder="Search product here..."
            onChange={handleSearch}
            value={search}
          />
          <div className="flex justify-center items-center px-2 bg-green-700 rounded-r-2xl">
            <GrSearch size={22} />
          </div>
        </div>
        <div className="flex flex-row gap-8">
          <div className="flex flex-row gap-4 cursor-pointer items-center relative">
            <div className="relative flex justify-center">
              {user?._id && (
                <div
                  onClick={() => {
                    setMenuDisplay(!menuDisplay);
                  }}
                >
                  {user?.profilePic ? (
                    <img
                      className="w-10 h-10 rounded-full"
                      src={user?.profilePic}
                    />
                  ) : (
                    <FaRegCircleUser size={26} />
                  )}
                </div>
              )}
              {menuDisplay && (
                <div className="absolute bottom-0 top-12 shadow-lg h-fit p-4 bg-[#262626] rounded">
                  <nav>
                    {user?.role === "ADMIN" && (
                      <Link
                        onClick={() => {
                          setMenuDisplay(!menuDisplay);
                        }}
                        to="/admin"
                        className=" whitespace-nowrap hover:bg-slate-700 p-2 hidden md:block"
                      >
                        Admin Panel
                      </Link>
                    )}
                  </nav>
                </div>
              )}
            </div>
            {user?._id && (
              <Link to={"/my-cart"} className="flex flex-col items-center">
                <span>
                  <MdOutlineShoppingCart size={26} />
                </span>{" "}
                <div className="absolute bg-red-600 w-4 h-4 rounded-full flex items-center justify-center text-center -right-2 -top-2">
                  <p>{context.cartProduct}</p>
                </div>
              </Link>
            )}
          </div>
          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="bg-red-700 px-4 py-1 rounded-full hover:bg-red-800"
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className="bg-green-700 px-4 py-1 rounded-full hover:bg-green-800">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
