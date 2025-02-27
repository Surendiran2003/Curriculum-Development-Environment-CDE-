import React, { useState, useEffect } from "react";
import home from "./../assets/image.png";
import logo from "./../assets/logo.png";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Navigation Bar */}
      <nav className={`${darkMode ? "bg-gray-800" : "bg-emerald-200"} px-6 py-5 flex items-center shadow-md`}>
  {/* Logo on the Left */}
  <a href="/" className="flex-none">
    <img className="h-12 w-auto" src={home} alt="Home Logo" />
  </a>

  {/* Centered Title */}
  <div className="flex-1 flex justify-center">
    <h1 className="lg:text-5xl font-extrabold text-justify">
      <span>Pondicherry</span>{' '}
      <span className={darkMode ? "text-cyan-400" : "text-cyan-500"}>University</span>
    </h1>
  </div>

  {/* Navigation & Dark Mode Toggle */}
  <div className="flex items-center space-x-8 flex-none">
    <a href="#" className={`text-lg font-medium ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
      Home
    </a>
    <a href="#" className={`text-lg font-medium ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
      About
    </a>

    {/* Dark Mode Toggle */}
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`w-14 h-7 ${darkMode ? "bg-gray-600" : "bg-gray-300"} rounded-full p-1 flex items-center transition-all`}
    >
      <div
        className={`w-5 h-5 rounded-full transition-all ${
          darkMode ? "bg-yellow-600 ml-auto" : "bg-gray-800"
        }`}
      ></div>
    </button>
  </div>
</nav>

      {/* Main Content */}
      <main className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-center px-6 py-16 mt-12">
        {/* Left Content - Text */}
      
        <div className="md:w-1/2 text-center md:text-left space-y-6">
        <br/>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight max-w-3xl">
            <span className="whitespace-nowrap">
              Curriculum Development
            </span>
            <br />
            <span
              className={darkMode ? "text-cyan-300" : "text-cyan-500"}
            >
              Environment
            </span>
          </h1>
          <h2
            className={`text-2xl md:text-3xl font-semibold ${
              darkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Empower Educators, Simplify Curriculum Design
          </h2>
          <p
            className={`max-w-lg mx-auto md:mx-0 text-lg ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            A modern open-source tool for creating, managing, and sharing course
            syllabi effortlessly.
          </p>
          <br/>
          <button
            onClick={() => navigate("/syllabus")}
            className={`${
              darkMode
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : "bg-emerald-400 hover:bg-emerald-500 text-black"
            } text-lg font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:brightness-110 hover:scale-110 shadow-lg`}
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
