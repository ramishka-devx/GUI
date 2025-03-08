import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import OnlineCanteen from "./pages/header/Header";
import Bg from "./comp/Bg";
import { ToastContainer } from "react-toastify";
import Store from "./pages/Store/Store";
import Navbar from "./comp/navBar/NavBar";
import Slideshow from "./comp/slide/SlideShow";
import HeroSection from "./comp/Hero/Hero";
import Cart from "./pages/cart/Cart";
import ProfilePage from "./pages/profile/Profile";
import AdminHome from "./admin/pages/adminHome/AdminHome";
import SideNav from "./comp/sideNavBar/SideNavBar";
import Home from "./pages/Home/Home";
import Footer from "./comp/footer/Footer";
import NotFound from "./comp/404/NotFound";
import ScrollToTop from "./admin/components/ScrollToTop";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItemCounter, setCartItemCounter] = useState(0);
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  //user info
  const [user,setUser] = useState({
    name: "",
    email: "",
    isAdmin : false
  });

  console.log(user);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  },[]);
  // set cart count at initial render
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItemCounter(storedCart.length);
  }, []);

  

  return (
  
    <Router>
      <Navbar user = {user} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} cartItemCounter={cartItemCounter} setIsSideNavOpen = {setIsSideNavOpen} isSideNavOpen = {isSideNavOpen} />
      <ScrollToTop/>
      
      <SideNav isSideNavOpen={isSideNavOpen} setIsSideNavOpen={setIsSideNavOpen} isLoggedIn = {isLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUser = {setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/store" element={<Store setCartItemCounter={setCartItemCounter} />} />
        <Route path="/cart" element={<Cart setCartItemCounter={setCartItemCounter} />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/contact" element={<Home />} />
        <Route path="/feedback" element={<Home />} />
        <Route path="/admin/*" element={<AdminHome />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>

      <Footer/>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Router>
  );
};

export default App;
