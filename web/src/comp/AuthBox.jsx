import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AuthBox = ({isLoggedIn}) => {


  return (
    <div className="flex gap-4 absolute top-4 right-4 z-30 bg-myBgWhite bg-opacity-5 backdrop-blur-md py-2 px-6 rounded-lg shadow-lg">
      {isLoggedIn ? (
        <div className="flex items-center gap-3">
          <img src={"https://res.cloudinary.com/dftbkrs4f/image/upload/v1732101562/avatar2_d0vokh.png"} alt="Profile" className="w-10 h-10 rounded-full border-2 border-yellow-400" />
          <span className="text-yellow-400 font-semibold">{"Ramishka"}</span>
        </div>
      ) : (
        <>
          <Link to="/login">
            <button className="bg-MyBeat text-white px-4 py-2 rounded-md shadow-md transition duration-300 hover:bg-MyBrown focus:outline-none w-24">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-MyYello text-white px-4 py-2 rounded-md shadow-md transition duration-300 hover:bg-MyCream focus:outline-none w-24">
              Register
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthBox;