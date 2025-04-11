import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import home from "./../assets/image.png";
import logo from "./../assets/logo.png";

const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <nav className={`${darkMode ? "bg-gray-800 text-white" : "bg-emerald-200 text-black"} px-6 py-5 flex items-center shadow-md`}> 
      {/* Logo */}
      <a href="/" className="flex-none">
        <img className="h-12 w-auto" src={home} alt="Home Logo" />
      </a>
      
      {/* Title */}
      <div className="flex-1 flex justify-center">
        <h1 className="lg:text-5xl font-extrabold text-justify">
          <span>Pondicherry</span>{' '}
          <span className={darkMode ? "text-cyan-400" : "text-cyan-500"}>University</span>
        </h1>
      </div>
      
      {/* Navigation & Dark Mode Toggle */}
      <div className="flex items-center space-x-8 flex-none">
        <Link to="/" className={`text-lg font-medium ${darkMode ? 
          "text-gray-200" : "text-gray-800"}`}>Home</Link>
        <Link to="/about" className={`text-lg font-medium ${darkMode ?
           "text-gray-200" : "text-gray-800"}`}>About</Link>
        
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`w-14 h-7 ${darkMode ? "bg-gray-600" : "bg-gray-300"} rounded-full p-1 flex items-center transition-all`}
        >
          <div
            className={`w-5 h-5 rounded-full transition-all ${darkMode ? "bg-yellow-600 ml-auto" : "bg-gray-800"}`}
          ></div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

