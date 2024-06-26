import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa6"
import { Link } from "react-router-dom"
import user from "../assets/signup.png"
import ImageTo64 from "../utils/ImageTo64";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [data,setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        profilePic: ""
    })
    const handlePic = async(e)=>{
      const file = e.target.files[0]
      const image = await ImageTo64(file)
      setData(prevData => ({
        ...prevData,
        profilePic: image
    }));
    }
    const handleChange = (e)=>{
        const {name, value} = e.target
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }
    console.log(data);
    const handleSubmit = (e)=>{
        e.preventDefault();
    }
  return (
    <section className="login">
        <div className="container p-4">
            <div className="p-2 w-full max-w-md mx-auto bg-[#323232]">
                <div className="mx-auto mb-4 flex flex-col justify-center items-center">
                  <div>
                    <img className="h-[80px]" src={data.profilePic || user} alt="" />
                  </div>
                  <div className="m-2 mx-auto"><label className="shadow-md p-2">Upload Photo<input onChange={handlePic} className="hidden" type="file" name="" id="" /></label></div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid">
                        <label htmlFor="">Name : </label>
                        <div className="w-full py-1 rounded-md px-4 bg-slate-700 my-2"><input className="bg-slate-700 w-full" onChange={handleChange} name ="name" value={data.name} type="text" placeholder="enter your name" required /></div>
                    </div>
                    <div className="grid">
                        <label htmlFor="">Email : </label>
                        <div className="w-full py-1 rounded-md px-4 bg-slate-700 my-2"><input className="bg-slate-700 w-full" onChange={handleChange} name ="email" value={data.email} type="email" placeholder="enter your email" required /></div>
                    </div>
                    <div>
                        <label htmlFor="">Password : </label>
                        <div className="w-full py-1 rounded-md px-4 bg-slate-700 my-2 flex justify-between items-center"><input className="bg-slate-700 w-full" onChange={handleChange} name ="password" value={data.password} type={showPassword ? "text" : "password"} placeholder="enter your password" required/>
                        <div onClick={()=>setShowPassword(!showPassword)}>
                            <span>{showPassword ? <FaEyeSlash/> : <FaEye/>}
                            </span>
                        </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="">Confirm Password : </label>
                        <div className="w-full py-1 rounded-md px-4 bg-slate-700 my-2 flex justify-between items-center"><input className="bg-slate-700 w-full" onChange={handleChange} name ="confirmPassword" value={data.confirmPassword} type={showConfirmPassword ? "text" : "password"} placeholder="confirm your password" required />
                        <div onClick={()=>setShowConfirmPassword(!showConfirmPassword)}>
                            <span>{showConfirmPassword ? <FaEyeSlash/> : <FaEye/>}
                            </span>
                        </div>
                        </div>
                    </div>
                    <div className="mt-4 mb-2 flex justify-center">
                        <Link to='/login'><button className="bg-green-700 w-[180px] px-6 py-2 rounded-full hover:bg-green-800">Signup</button></Link>
                    </div>
                </form>
                <p className="m-2">Already have an account ? <Link to='/login' className="text-cyan-500">Login</Link></p>
            </div>
        </div>
    </section>
  )
}

export default Signup