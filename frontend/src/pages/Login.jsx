import { useState } from "react";
import login from "../assets/loginImg.png";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import summaryApi from "../common";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  console.log(data);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(summaryApi.signin.url, {
      method: summaryApi.signin.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resolvedResponse = await response.json();
    if (resolvedResponse.success) {
      toast.success(resolvedResponse.message);
      navigate("/home");
    }
    if (resolvedResponse.error) toast.error(resolvedResponse.message);
  };
  return (
    <section className="login">
      <div className="container p-4">
        <div className="p-2 w-full max-w-md mx-auto bg-[#323232]">
          <div className="mx-auto mb-4 flex justify-center">
            <img className="h-[300px]" src={login} alt="" />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid">
              <label htmlFor="">Email : </label>
              <div className="w-full py-1 rounded-md px-4 bg-slate-700 my-2">
                <input
                  className="bg-slate-700 w-full"
                  onChange={handleChange}
                  name="email"
                  value={data.email}
                  type="email"
                  placeholder="enter your email"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="">Password : </label>
              <div className="w-full py-1 rounded-md px-4 bg-slate-700 my-2 flex justify-between items-center">
                <input
                  className="bg-slate-700 w-full"
                  onChange={handleChange}
                  name="password"
                  value={data.password}
                  type={showPassword ? "text" : "password"}
                  placeholder="enter your password"
                  required
                />
                <div onClick={() => setShowPassword(!showPassword)}>
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link
                to="/forgot-password"
                className="hover:underline w-fit block ml-auto hover:text-cyan-500"
              >
                Forgot password?
              </Link>
            </div>
            <div className="mt-4 mb-2 flex justify-center">
              <button
                type="submit"
                className="bg-green-700 w-[180px] px-6 py-2 rounded-full hover:bg-green-800"
              >
                Login
              </button>
            </div>
          </form>
          <p className="m-2">
            Don&apos;t have an account ?{" "}
            <Link to="/signup" className="text-cyan-500">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
