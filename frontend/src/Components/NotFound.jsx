// src/pages/NotFoundPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { Construction, ArrowLeft } from "lucide-react";

const NotFoundPage = () => {
  // Get the dark mode setting from localStorage
  const darkMode = localStorage.getItem("theme") === "dark";
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      darkMode
        ? "bg-gray-900 text-gray-100"
        : "bg-gradient-to-b from-white via-gray-50 to-white text-gray-900"
    }`}>
      <Navbar darkMode={darkMode} />
      <main className="container mx-auto flex flex-col items-center justify-center px-8 py-32 text-center">
        {/* Construction Icon */}
        <div className={`p-8 rounded-full mb-8 ${
          darkMode ? "bg-gray-800" : "bg-gray-100"
        }`}>
          <Construction size={64} className={darkMode ? "text-emerald-400" : "text-emerald-600"} />
        </div>
        
        {/* Error Message */}
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
          <span className={darkMode ? "text-emerald-400" : "text-emerald-600"}>404</span> | Page Not Found
        </h1>
        
        <p className={`text-xl md:text-2xl font-semibold mb-6 ${
          darkMode ? "text-gray-300" : "text-gray-700"
        }`}>
          This page is under construction
        </p>
        
        <p className={`max-w-lg mb-12 ${
          darkMode ? "text-gray-400" : "text-gray-600"
        }`}>
          We're working on building this section of the Academic Curriculum Development Environment. 
          Please check back later or explore other parts of the platform.
        </p>
        
        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className={`px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
              darkMode
                ? "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
                : "bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200"
            }`}
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            className={`px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300 ${
              darkMode
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : "bg-emerald-500 hover:bg-emerald-600 text-white"
            }`}
          >
            Return Home
          </button>
        </div>
      </main>

      {/* Subtle Background Pattern - same as HomePage for consistency */}
      <div className={`absolute inset-0 -z-10 ${
        darkMode
          ? "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800/30 via-gray-900 to-gray-900"
          : "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-100/50 via-gray-50/50 to-white"
      }`}></div>
    </div>
  );
};

export default NotFoundPage;