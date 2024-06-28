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

function App() {
  const fetchUserDetail = async()=>{
    const ResponseData = await fetch(summaryApi.current_user.url,{
      method : summaryApi.current_user.method,
      credentials : 'include'
    })
    const data = ResponseData.json();
    console.log("api hitted",data);
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
            </Routes>
    <Footer/>
    </Context.Provider>
    </>
  )
}

export default App
