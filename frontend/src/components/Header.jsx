import logo from "../assets/logo.png"
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector(state => state?.user?.user)
  console.log("user" , user);
  return (
    <header className="shadow-md">
      <div className="container mx-auto flex items-center py-2 px-4 justify-between">
        <div className="">
          <Link to='/'><img className="h-[60px] w-[60px]" src={logo} alt="" /></Link>
        </div>
        <div className="hidden lg:flex flex-row">
          <input className="bg-slate-700 text-white px-4 py-1 rounded-l-2xl min-w-[300px] hover:border-white hover:border-[1px] hover:cursor-pointer" type="text" placeholder="Search product here..." />
          <div className="flex justify-center items-center px-2 bg-green-700 rounded-r-2xl">
            <GrSearch size={22}/>
          </div>
        </div>
        <div className="flex flex-row gap-8">
        <div className="flex flex-row gap-4 cursor-pointer items-center relative">
          {user?.profilePic ? (<img className="w-11 h-11 rounded-full" src={user?.profilePic}/>) : (<FaRegCircleUser size={24}/>)}
          <div className="flex flex-col items-center">
            <span><MdOutlineShoppingCart size={24}/></span>
            <div className="absolute bg-red-600 w-4 h-4 rounded-full flex items-center justify-center text-center -right-2 -top-2">
              <p>0</p>
            </div>
          </div>
        </div>
        <div>
          <Link to='/login'><button className="bg-green-700 px-4 py-1 rounded-full hover:bg-green-800">Login</button></Link>
        </div>
        </div>
      </div>
    </header>
  )
}

export default Header