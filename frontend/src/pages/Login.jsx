import { useState } from "react";
import login from "../assets/loginImg.png"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
  return (
    <section className="login">
        <div className="container p-4">
            <div className="p-2 w-full max-w-md mx-auto bg-[#323232]">
                <div className="mx-auto mb-4">
                    <img src={login} alt="" />
                </div>
                <form action="">
                    <div className="grid">
                        <label htmlFor="">Email : </label>
                        <div className="w-full py-1 rounded-md px-4 bg-slate-700 my-2"><input className="bg-slate-700 w-full" type="email" placeholder="enter your email" /></div>
                    </div>
                    <div>
                        <label htmlFor="">Password : </label>
                        <div className="w-full py-1 rounded-md px-4 bg-slate-700 my-2 flex justify-between items-center"><input className="bg-slate-700 w-full" type={showPassword ? "text" : "password"} placeholder="enter your password" />
                        <div onClick={()=>setShowPassword(!showPassword)}>
                            <span>{showPassword ? <FaEyeSlash/> : <FaEye/>}
                            </span>
                        </div>
                        </div>
                        <Link to='/forgot-password' className="hover:underline w-fit block ml-auto hover:text-cyan-600">Forgot password?</Link>
                    </div>
                    <div className="mt-4 mb-2 flex justify-center">
                        <Link to='/login'><button className="bg-green-700 w-[180px] px-6 py-2 rounded-full hover:bg-green-800">Login</button></Link>
                    </div>
                </form>
            </div>
        </div>
    </section>
  )
}

export default Login