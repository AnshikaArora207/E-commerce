import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home"
import { Route, Routes } from 'react-router-dom';
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Signup from "./pages/Signup";

function App() {

  return (
    <>
    <Header/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/signup" element={<Signup/>}/>
            </Routes>
    <Footer/>
    </>
  )
}

export default App
