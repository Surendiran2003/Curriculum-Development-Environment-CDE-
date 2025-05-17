import Navbar from "./Navbar";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import home from "./../assets/image.png";
import logo from "./../assets/logo.png";

const HomePage = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      {/* Navbar */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      
      {/* Main Content */}
      <main className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-6 py-16">
        {/* Left Content - Text */}
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight max-w-3xl mt-10">
            <span className="whitespace-nowrap">Curriculum Development</span>
            <br />
            <span className={darkMode ? "text-cyan-300" : "text-cyan-500"}>Environment</span>
          </h1>
          <h2 className={`text-2xl md:text-3xl font-semibold ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
            Empower Educators, Simplify Curriculum Design
          </h2>
          <p className={`max-w-lg mx-auto md:mx-0 text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            A modern open-source tool for creating, managing, and sharing course syllabi effortlessly.
          </p>
          <button
            onClick={() => navigate("/syllabusnew")}
            className={`mt-4 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 shadow-lg ${darkMode ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-emerald-400 hover:bg-emerald-500 text-black"}`}
          >
            Get Started
          </button>
        </div>

        {/* Right Content - Image */}
        <div className="md:w-1/2 flex justify-center md:justify-end mt-10 md:mt-0">
          <img
            className="max-w-xs md:max-w-lg transition-all duration-300 hover:scale-105 rounded-lg p-3 bg-[radial-gradient(circle,rgba(255,223,120,0.35)_0%,transparent_70%)]"
            src={logo}
            alt="Logo"
          />
        </div>
      </main>
    </div>
  );
};

export default HomePage;