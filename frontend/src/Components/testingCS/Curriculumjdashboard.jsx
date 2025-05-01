import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';


const CurriculumDashboard = () => {
  const navigate = useNavigate();
  const [curriculums, setCurriculums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  
  // Load saved curriculums from localStorage on component mount
  useEffect(() => {
    loadCurriculums();
  }, []);
  
  const loadCurriculums = () => {
    setIsLoading(true);
    try {
      const savedCurriculums = JSON.parse(localStorage.getItem('curriculums') || '[]');
      setCurriculums(savedCurriculums);
    } catch (error) {
      console.error('Error loading curriculums:', error);
      setCurriculums([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Delete a curriculum
  const handleDelete = (e, id) => {
    e.stopPropagation(); // Prevent navigation to the curriculum editor
    
    if (window.confirm('Are you sure you want to delete this curriculum?')) {
      try {
        // Get curriculums from localStorage
        const savedCurriculums = JSON.parse(localStorage.getItem('curriculums') || '[]');
        
        // Remove the curriculum with the given id
        const updatedCurriculums = savedCurriculums.filter(c => c.id !== id);
        
        // Save back to localStorage
        localStorage.setItem('curriculums', JSON.stringify(updatedCurriculums));
        
        // Update state to reflect changes
        setCurriculums(updatedCurriculums);
        
        alert('Curriculum deleted successfully!');
      } catch (error) {
        console.error('Error deleting curriculum:', error);
        alert('Failed to delete curriculum. Please try again.');
      }
    }
  };
  
  // Duplicate a curriculum
  const handleDuplicate = (e, curriculum) => {
    e.stopPropagation(); // Prevent navigation to the curriculum editor
    
    try {
      // Get curriculums from localStorage
      const savedCurriculums = JSON.parse(localStorage.getItem('curriculums') || '[]');
      
      // Create a new curriculum object with a new ID and updated name
      const duplicatedCurriculum = {
        ...curriculum,
        id: Date.now(),
        name: `${curriculum.name} (Copy)`,
        lastModified: new Date().toISOString().split('T')[0],
      };
      
      // Add the duplicated curriculum to the array
      savedCurriculums.push(duplicatedCurriculum);
      
      // Save back to localStorage
      localStorage.setItem('curriculums', JSON.stringify(savedCurriculums));
      
      // Update state to reflect changes
      setCurriculums(savedCurriculums);
      
      alert('Curriculum duplicated successfully!');
    } catch (error) {
      console.error('Error duplicating curriculum:', error);
      alert('Failed to duplicate curriculum. Please try again.');
    }
  };
  
  // Handle clicking the Edit button
  const handleEdit = (e, id) => {
    e.stopPropagation(); // Prevent the parent div click from triggering
    navigate(`/curriculum-builder/${id}`);
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      {/* Navbar */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Curriculum Dashboard</h1>
          <button 
            onClick={() => navigate('/')}
            className={`px-4 py-2 ${darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-800"}`}
          >
            Back to Home
          </button>
        </div>

        {/* Create New Curriculum Card */}
        <div 
          className={`border-2 border-dashed ${
            darkMode ? "border-blue-600 hover:bg-gray-800" : "border-blue-300 hover:bg-blue-50"
          } rounded-lg p-8 mb-8 flex flex-col items-center justify-center cursor-pointer transition-colors`}
          onClick={() => navigate('/curriculum-builder')}
        >
          <div className={`${darkMode ? "bg-blue-900" : "bg-blue-100"} p-4 rounded-full mb-4`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-10 w-10 ${darkMode ? "text-blue-400" : "text-blue-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h2 className={`text-xl font-semibold ${darkMode ? "text-blue-400" : "text-blue-600"}`}>Create New Curriculum</h2>
          <p className={`${darkMode ? "text-gray-400" : "text-gray-500"} mt-2 text-center`}>
            Start building a new curriculum structure from scratch
          </p>
        </div>

        {/* Existing Curriculums */}
        <h2 className="text-2xl font-semibold mb-4">Your Curriculums</h2>
        
        {isLoading ? (
          <div className="text-center py-8">
            <p>Loading your curriculums...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {curriculums.length > 0 ? (
              curriculums.map(curriculum => (
                <div 
                  key={curriculum.id} 
                  className={`border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer ${
                    darkMode ? "border-gray-700 hover:border-gray-600" : "border-gray-200"
                  }`}
                  onClick={() => navigate(`/curriculum-builder/${curriculum.id}`)}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium">{curriculum.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      curriculum.status === 'Published' 
                        ? darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800' 
                        : darkMode ? 'bg-amber-900 text-amber-300' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {curriculum.status}
                    </span>
                  </div>
                  <p className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-sm mt-2`}>
                    Last modified: {curriculum.lastModified}
                  </p>
                  <div className="flex mt-4 space-x-2">
                    <button 
                      className={`px-3 py-1 text-sm rounded ${
                        darkMode ? "bg-blue-900 text-blue-300 hover:bg-blue-800" : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                      }`}
                      onClick={(e) => handleEdit(e, curriculum.id)}
                    >
                      Edit
                    </button>
                    <button 
                      className={`px-3 py-1 text-sm rounded ${
                        darkMode ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}
                      onClick={(e) => handleDuplicate(e, curriculum)}
                    >
                      Duplicate
                    </button>
                    <button 
                      className={`px-3 py-1 text-sm rounded ${
                        darkMode ? "bg-red-900 text-red-300 hover:bg-red-800" : "bg-red-50 text-red-600 hover:bg-red-100"
                      }`}
                      onClick={(e) => handleDelete(e, curriculum.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className={`${darkMode ? "text-gray-400" : "text-gray-500"} col-span-3 text-center py-8`}>
                No curriculums found. Create your first curriculum to get started.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CurriculumDashboard;