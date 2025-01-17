import React, { useState } from "react";
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

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn = {setIsLoggedIn}/>
      <br /><br />
      <HeroSection/>
      <Slideshow/>
      <Routes>
        {/* <Route path="/" element={<Store />} /> */}
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/register" element={<Register />} />
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
