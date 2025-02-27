import React from 'react'

const Navbar = () => {
  return (
          <nav
            className={`${
              darkMode ? "bg-gray-800" : "bg-emerald-200"
            } px-6 py-5 flex justify-between items-center shadow-md`}
          >
            <a href="/">
              <img className="h-12 w-auto" src={home} alt="Home Logo" />
            </a>
            <div className="flex items-center space-x-8">
              <a
                href="#"
                className={`text-lg font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                Home
              </a>
              <a
                href="#"
                className={`text-lg font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                About
              </a>
    
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-14 h-7 ${
                  darkMode ? "bg-gray-600" : "bg-gray-300"
                } rounded-full p-1 flex items-center transition-all`}
              >
                <div
                  className={`w-5 h-5 rounded-full transition-all ${
                    darkMode ? "bg-yellow-600 ml-auto" : "bg-gray-800"
                  }`}
                ></div>
              </button>
            </div>
          </nav>
  )
}

export default Navbar