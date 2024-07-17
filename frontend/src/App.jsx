import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home"
import { Route, Routes } from 'react-router-dom';
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Signup from "./pages/Signup";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import summaryApi from "./common";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import AdminPanel from "./pages/AdminPanel";
import AllUsers from "./pages/AllUsers";
import AllProducts from "./pages/AllProducts";
import Category from "./pages/Category";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Search from "./pages/Search";

function App() {
  const dispatch = useDispatch();
  const [cartProduct,setCartProduct] = useState(0);
  const fetchUserDetail = async()=>{
    const ResponseData = await fetch(summaryApi.current_user.url,{
      method : summaryApi.current_user.method,
      credentials : 'include'
    })
    const data = await ResponseData.json();
    if(data.success) dispatch(setUserDetails(data.data))
    // console.log("api hitted",data.data);
  }
  const cart = async()=>{
    const ResponseData = await fetch(summaryApi.countCart.url,{
      method : summaryApi.countCart.method,
      credentials : 'include'
    })
    const data = await ResponseData.json();
    setCartProduct(data.data.count);
    // console.log(data.data.count);
    // console.log("api hitted",data.data);
  }
  useEffect(()=>{
    fetchUserDetail();
    cart();
  },[])
  return (
    <>
    <Context.Provider value={{
      fetchUserDetail,
      cart,
      cartProduct
    }}>
    <ToastContainer/>
    <Header/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/product/:id" element={<ProductDetails/>}/>
                <Route path="/product-category/:categoryName" element={<Category/>}/>
                <Route path="/admin" element={<AdminPanel/>}/>
                <Route path="/admin/all-users" element={<AllUsers/>}/>
                <Route path="/admin/all-products" element={<AllProducts/>}/>
                <Route path="/my-cart" element={<Cart/>}/>
                <Route path="/search" element={<Search/>}/>
            </Routes>
    <Footer/>
    </Context.Provider>
    </>
  )
}

export default App
