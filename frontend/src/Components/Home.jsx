// src/pages/HomePage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import logo from "./../assets/logo.png";

const HomePage = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      darkMode 
        ? "bg-gray-900 text-gray-100" 
        : "bg-gradient-to-b from-white via-gray-50 to-white text-gray-900"
    }`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-8 py-32">
        {/* Text Section */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
            <span className="block">Academic Curriculum</span>
            <span className={`block ${darkMode ? "text-emerald-400" : "text-emerald-600"}`}>
              Development Environment
            </span>
          </h1>
          
          <p className={`text-xl md:text-2xl font-semibold ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}>
            Streamlining Curriculum Development for Pondicherry University
          </p>
          
          <p className={`max-w-lg ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}>
            A comprehensive platform for faculty to design, collaborate on, and manage course syllabi across departments.
          </p>

          <div className="flex gap-4 mt-8 justify-center md:justify-start">
            <button
              onClick={() => navigate("/departments")}
              className={`px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300 ${
                darkMode 
                  ? "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700" 
                  : "bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200"
              }`}
            >
              Explore Departments
            </button>
            <button
              onClick={() => navigate("/getstarted")}
              className={`px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300 ${
                darkMode
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-emerald-500 hover:bg-emerald-600 text-white"
              }`}
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center md:justify-end mb-12 md:mb-0 ">
          <div className={`p-6 rounded-3xl ${
      darkMode 
        ? "bg-gray-900 text-gray-100" 
        : "bg-gradient-to-b from-white via-gray-50 to-white text-gray-900 "
          }`}>
            <img
              src={logo}
              alt="University Curriculum System"
            className="max-w-xs md:max-w-lg transition-all duration-300 hover:scale-105 rounded-lg p-1 bg-[radial-gradient(circle,rgba(255,223,120,0.35)_0%,transparent_50%)]"
              
            />
          </div >
        </div>
      </main>

      {/* Subtle Background Pattern */}
      <div className={`absolute inset-0 -z-10 ${
        darkMode 
          ? "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800/30 via-gray-900 to-gray-900" 
          : "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-100/50 via-gray-50/50 to-white"
      }`}></div>
    </div>
  );
};

export default HomePage;
