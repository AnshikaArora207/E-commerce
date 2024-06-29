import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home"
import { Route, Routes } from 'react-router-dom';
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Signup from "./pages/Signup";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import summaryApi from "./common";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import AdminPanel from "./pages/AdminPanel";
import AllUsers from "./pages/AllUsers";
import AllProducts from "./pages/AllProducts";

function App() {
  const dispatch = useDispatch();
  const fetchUserDetail = async()=>{
    const ResponseData = await fetch(summaryApi.current_user.url,{
      method : summaryApi.current_user.method,
      credentials : 'include'
    })
    const data = await ResponseData.json();
    if(data.success) dispatch(setUserDetails(data.data))
    // console.log("api hitted",data.data);
  }
  useEffect(()=>{
    fetchUserDetail();
  },[])
  return (
    <>
    <Context.Provider value={{
      fetchUserDetail
    }}>
    <ToastContainer/>
    <Header/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/admin" element={<AdminPanel/>}/>
                <Route path="/admin/all-users" element={<AllUsers/>}/>
                <Route path="/admin/all-products" element={<AllProducts/>}/>
            </Routes>
    <Footer/>
    </Context.Provider>
    </>
  )
}

export default App
