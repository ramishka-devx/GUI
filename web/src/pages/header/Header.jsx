import React, { useState, useEffect } from "react";
import Store  from "../Store/Store";
import { Link } from "react-router-dom";

const OnlineCanteen = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll handler to toggle isScrolled state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative bg-gray-200 min-h-screen overflow-auto">
      {/* Login Button */}
      <div className="flex gap-2 absolute top-4 right-4 z-30">
        <Link to="/login">
          <button className="bg-MyBeat text-yellow-400 px-4 py-2 shadow-md pointer transition duration-300 focus:outline-none w-24">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="bg-MyBeat text-yellow-400 px-4 py-2 shadow-md pointer transition duration-300 focus:outline-none w-24">
            Register
          </button>
        </Link>
      </div>
      {/* Main Content */}
      <div className="relative z-20">
        {/* Image Section */}
        <div className="w-full max-w-5xl mx-auto">
          <div className="relative">
            {/* Main Image */}
            <img
              src="./bg2.png"
              alt="Delicious burger with toppings"
              className="w-full h-40 sm:h-52 md:h-60 lg:h-64 xl:h-72 object-cover "
            />

            {/* Yellow Bar */}
            <div className="absolute bottom-0 w-full bg-yellow-400 py-4 px-6 flex flex-wrap items-center justify-between shadow-md ">
              <div className="flex items-center">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-brown-700 flex-shrink-0"></div>
                <div className="ml-4 text-center lg:text-left">
                  <h1 className="text-base lg:text-lg font-bold">
                    ONLINE Canteen
                  </h1>
                  <p className="text-sm text-gray-800">
                    Delicious food at your fingertips
                  </p>
                </div>
              </div>
              {/* Location */}
              <div className="flex items-center mt-4 lg:mt-0 text-sm text-gray-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 6.05a7 7 0 1110.1 0c.58.59 1.134 1.278 1.677 2.093.724 1.046 1.33 2.285 1.813 3.678a25.543 25.543 0 01-.196 9.306A7 7 0 1112 20a7 7 0 01-6.95-13.95zM6.5 8a2.5 2.5 0 105 0 2.5 2.5 0 00-5 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Location: Your City
              </div>
            </div>
          </div>
        </div>

        {/* Gray Section with Cards */}
        <div className="bg-gray-200 w-full py-10">
          <Store />
        </div>
      </div>{" "}
      {/* End Main Content */}
    </div>
  );
};

export default OnlineCanteen;
