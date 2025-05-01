import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

const Getstarted = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const navigate = useNavigate();

  const handleOptionSelect = (option) => {
    setShowPopup(false);
    if (option === 'curriculum') navigate('/curriculum-dashboard');
    else if (option === 'syllabus') navigate('/syllabusdashboard');
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setShowPopup(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [darkMode]);

  return (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className={`flex flex-col min-h-[calc(100vh-64px)] transition-colors duration-500 px-4 py-12 ${
        darkMode 
          ? "bg-gray-900 text-gray-100" 
          : "bg-gradient-to-br from-blue-50 to-white text-gray-800"
      }`}>
        {/* Header Section */}
        <section className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Curriculum Development Environment</h1>
          <p className={`text-lg md:text-xl ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}>
            Design, manage, and streamline your course curriculum and syllabus with ease.
          </p>
        </section>

        {/* Features Grid */}
        <section className="grid gap-8 grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto mb-16">
          <FeatureCard
            title="📘 Curriculum Builder"
            description="Create, structure, and visualize academic programs. Define outcomes, modules, and learning paths."
            darkMode={darkMode}
          />
          <FeatureCard
            title="📝 Syllabus Designer"
            description="Generate subject-wise syllabi with objectives, prerequisites, and assessments."
            darkMode={darkMode}
          />
          <FeatureCard
            title="📊 Outcome Mapping"
            description="Map curriculum to program outcomes & Bloom's taxonomy automatically."
            darkMode={darkMode}
          />
          <FeatureCard
            title="🔗 AI Assistance"
            description="Get AI suggestions for content, outcomes, and assessments using GPT/Gemini."
            darkMode={darkMode}
          />
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div
            className={`inline-block p-6 rounded-full shadow-lg hover:shadow-2xl transition-all cursor-pointer ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
            onClick={() => setShowPopup(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-20 w-20 ${
              darkMode ? "text-emerald-400" : "text-blue-500"
            }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <p className={`mt-4 text-lg font-medium ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}>Create New Curriculum or Syllabus</p>
        </section>

        {/* HomePage-style Popup Modal */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className={`rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-5xl mx-4 animate-fadeIn ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Choose an Option</h2>
                <button 
                  className={`${darkMode ? "text-gray-300 hover:text-gray-100" : "text-gray-500 hover:text-gray-700"}`}
                  onClick={() => setShowPopup(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* HomePage Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Curriculum Card */}
                <div className={`rounded-lg shadow-md overflow-hidden border ${
                  darkMode 
                    ? "bg-gray-700 border-gray-600" 
                    : "bg-white border-gray-200"
                }`}>
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex items-start mb-4">
                      <div className={`w-14 h-14 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 ${
                        darkMode ? "bg-blue-900/50" : "bg-blue-100"
                      }`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-7 w-7 ${
                          darkMode ? "text-blue-300" : "text-blue-600"
                        }`} viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-xl font-bold mb-2">Curriculum Builder</h2>
                        <p className={`text-sm ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}>
                          Create comprehensive curricula with integrated course structures, learning outcomes, and assessment strategies.
                        </p>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <button 
                        onClick={() => handleOptionSelect('curriculum')}
                        className={`w-full py-3 rounded-lg font-medium ${
                          darkMode 
                            ? "bg-blue-600 hover:bg-blue-700 text-white" 
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                      >
                        Access Curriculum Dashboard
                      </button>
                    </div>
                  </div>
                </div>

                {/* Syllabus Card */}
                <div className={`rounded-lg shadow-md overflow-hidden border ${
                  darkMode 
                    ? "bg-gray-700 border-gray-600" 
                    : "bg-white border-gray-200"
                }`}>
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex items-start mb-4">
                      <div className={`w-14 h-14 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 ${
                        darkMode ? "bg-green-900/50" : "bg-green-100"
                      }`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-7 w-7 ${
                          darkMode ? "text-green-300" : "text-green-600"
                        }`} viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                          <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-xl font-bold mb-2">Syllabus Designer</h2>
                        <p className={`text-sm ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}>
                          Develop detailed course syllabi with objectives, topics, references, and evaluation components.
                        </p>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <button 
                        onClick={() => handleOptionSelect('syllabus')}
                        className={`w-full py-3 rounded-lg font-medium ${
                          darkMode 
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                            : "bg-green-600 hover:bg-green-700 text-white"
                        }`}
                      >
                        Access Syllabus Dashboard
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowPopup(false)}
                className={`mt-6 w-full py-2 rounded-xl transition ${
                  darkMode
                    ? "border border-gray-600 text-gray-300 hover:bg-gray-700"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        
        {/* Subtle Background Pattern like HomePage */}
        <div className={`absolute inset-0 -z-10 ${
          darkMode
            ? "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800/30 via-gray-900 to-gray-900"
            : "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-100/50 via-gray-50/50 to-white"
        }`}></div>
      </div>
    </>
  );
};

const FeatureCard = ({ title, description, darkMode }) => (
  <div className={`rounded-2xl shadow-md p-6 hover:shadow-xl transition ${
    darkMode ? "bg-gray-800" : "bg-white"
  }`}>
    <h3 className="text-2xl font-semibold mb-2">{title}</h3>
    <p className={darkMode ? "text-gray-300" : "text-gray-600"}>{description}</p>
  </div>
);

export default Getstarted;