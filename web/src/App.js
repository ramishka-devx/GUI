import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItemCounter, setCartItemCounter] = useState(0);

  // set cart count at initial render
    useEffect(() => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItemCounter(storedCart.length);
    }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn = {setIsLoggedIn} cartItemCounter = {cartItemCounter} />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/register" element={<Register />} />

        <Route path="/store" element={<Store setCartItemCounter = {setCartItemCounter} />} />
        <Route path="/cart" element={<Cart setCartItemCounter = {setCartItemCounter} />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>

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
