import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./pages/Login";

function App() {

  return (
    <>
    <Header/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login/>}/>
            </Routes>
    <Footer/>
    </>
  )
}

export default App
