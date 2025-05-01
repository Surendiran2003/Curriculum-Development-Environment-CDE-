import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import home from "./../assets/image.png";
import logo from "./../assets/logo.png";

const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <nav 
      className={`${
        darkMode 
          ? "bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-900 text-white" 
          : "bg-gradient-to-r from-white via-blue-50 to-indigo-100 text-gray-800"
      } px-6 py-4 flex items-center justify-between shadow-lg transition-all duration-300`}
    >
      {/* Logo & Title Group */}
      <div className="flex items-center">
        <a href="/" className="flex-none mr-4">
          <img 
            className={`h-12 w-auto rounded-full ${darkMode ? "border-2 border-blue-400" : "border-2 border-indigo-400"} shadow-md transition-all duration-300`} 
            src={home} 
            alt="Home Logo" 
          />
        </a>
        
        {/* Title - Now left-aligned */}
        <h1 className="lg:text-4xl md:text-3xl text-2xl font-extrabold">
          <span className={darkMode ? "text-gray-100" : "text-indigo-900"}>Pondicherry</span>{' '}
          <span className={`${darkMode ? "text-blue-400" : "text-blue-600"} transition-colors duration-300`}>University</span>
        </h1>
      </div>

      {/* Navigation & Dark Mode Toggle */}
      <div className="flex items-center space-x-4">
        <Link 
          to="/" 
          className={`text-lg font-medium px-4 py-2 rounded-lg transition-all duration-200 ${
            darkMode 
              ? "hover:bg-blue-800/40 hover:text-blue-200 focus:ring-2 focus:ring-blue-500" 
              : "hover:bg-indigo-200/70 hover:text-indigo-900 focus:ring-2 focus:ring-indigo-400"
          }`}
        >
          Home
        </Link>
        <Link 
          to="/about" 
          className={`text-lg font-medium px-4 py-2 rounded-lg transition-all duration-200 ${
            darkMode 
              ? "hover:bg-blue-800/40 hover:text-blue-200 focus:ring-2 focus:ring-blue-500" 
              : "hover:bg-indigo-200/70 hover:text-indigo-900 focus:ring-2 focus:ring-indigo-400"
          }`}
        >
          About
        </Link>

        {/* Dark Mode Toggle - Enhanced */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`relative w-16 h-8 ${
            darkMode ? "bg-slate-700" : "bg-blue-100"
          } rounded-full p-1 flex items-center transition-all duration-300 focus:outline-none focus:ring-2 ${
            darkMode ? "focus:ring-blue-400" : "focus:ring-indigo-400"
          } shadow-inner`}
          aria-label="Toggle dark mode"
        >
          <span className="sr-only">Toggle dark mode</span>
          <div
            className={`absolute left-1 top-1 w-6 h-6 rounded-full transition-all duration-300 shadow-md transform ${
              darkMode 
                ? "translate-x-8 bg-blue-400" 
                : "translate-x-0 bg-indigo-600"
            } flex items-center justify-center`}
          >
            {darkMode ? (
              <span className="text-xs">🌙</span>
            ) : (
              <span className="text-xs">☀️</span>
            )}
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;