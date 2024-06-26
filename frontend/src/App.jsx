import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <>
    <Header/>
      <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
            </Routes>
      </Router>
    <Footer/>
    </>
  )
}

export default App
