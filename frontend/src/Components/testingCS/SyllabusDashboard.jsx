import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
// import home from '../assets/image.png';

const SyllabusDashboard = () => {
  const navigate = useNavigate();
  const [syllabuses, setSyllabuses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  
  // Load saved syllabuses from localStorage on component mount
  useEffect(() => {
    loadSyllabuses();
  }, []);
  
  const loadSyllabuses = () => {
    setIsLoading(true);
    try {
      const savedSyllabuses = JSON.parse(localStorage.getItem('syllabuses') || '[]');
      
      // Filter out course-linked syllabuses to only show curriculum links and standalone syllabuses
      const filteredSyllabuses = savedSyllabuses.filter(syllabus => 
        !syllabus.isCourseLink || syllabus.showInDashboard === true
      );
      
      // Sort by last modified date, most recent first
      const sortedSyllabuses = filteredSyllabuses.sort((a, b) => {
        const dateA = a.lastModified ? new Date(a.lastModified) : new Date(0);
        const dateB = b.lastModified ? new Date(b.lastModified) : new Date(0);
        return dateB - dateA;
      });
      
      setSyllabuses(sortedSyllabuses);
    } catch (error) {
      console.error('Error loading syllabuses:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Delete a syllabus
  const handleDelete = (e, id) => {
    e.stopPropagation(); // Prevent navigation to the syllabus editor
    
    if (window.confirm('Are you sure you want to delete this syllabus?')) {
      try {
        // Get syllabuses from localStorage
        const savedSyllabuses = JSON.parse(localStorage.getItem('syllabuses') || '[]');
        
        // Remove the syllabus with the given id
        const updatedSyllabuses = savedSyllabuses.filter(s => s.id !== id);
        
        // Save back to localStorage
        localStorage.setItem('syllabuses', JSON.stringify(updatedSyllabuses));
        
        // Update state to reflect changes
        setSyllabuses(updatedSyllabuses);
        
        alert('Syllabus deleted successfully!');
      } catch (error) {
        console.error('Error deleting syllabus:', error);
        alert('Failed to delete syllabus. Please try again.');
      }
    }
  };
  
  // Duplicate a syllabus
  const handleDuplicate = (e, syllabus) => {
    e.stopPropagation(); // Prevent navigation to the syllabus editor
    
    try {
      // Get syllabuses from localStorage
      const savedSyllabuses = JSON.parse(localStorage.getItem('syllabuses') || '[]');
      
      // Create a new syllabus object with a new ID and updated name
      const duplicatedSyllabus = {
        ...syllabus,
        id: Date.now(),
        courseTitle: `${syllabus.courseTitle} (Copy)`,
        lastModified: new Date().toISOString().split('T')[0],
      };
      
      // Add the duplicated syllabus to the array
      savedSyllabuses.push(duplicatedSyllabus);
      
      // Save back to localStorage
      localStorage.setItem('syllabuses', JSON.stringify(savedSyllabuses));
      
      // Update state to reflect changes
      setSyllabuses(savedSyllabuses);
      
      alert('Syllabus duplicated successfully!');
    } catch (error) {
      console.error('Error duplicating syllabus:', error);
      alert('Failed to duplicate syllabus. Please try again.');
    }
  };
  
  // Handle clicking the Edit button
  const handleEdit = (e, id) => {
    e.stopPropagation(); // Prevent the parent div click from triggering
    
    // Find the syllabus to check if it's a curriculum link or course link
    const syllabus = syllabuses.find(s => s.id === id);
    
    if (syllabus && syllabus.isCurriculumLink && syllabus.linkedCurriculumId) {
      // Navigate to curriculum courses view with the linked curriculum ID
      navigate(`/curriculum-courses/${syllabus.linkedCurriculumId}`);
    } else if (syllabus && syllabus.isCourseLink) {
      // Navigate to syllabus form for a course
      navigate(`/syllabus-new?courseCode=${syllabus.courseCode}&courseId=${syllabus.courseId}`);
    } else {
      // Regular syllabus navigation
      navigate(`/syllabus-builder/${id}`);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      {/* Navbar */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} home={home} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Syllabus Dashboard</h1>
          <button 
            onClick={() => navigate('/')}
            className={`px-4 py-2 ${darkMode ? "text-green-400 hover:text-green-300" : "text-green-600 hover:text-green-800"}`}
          >
            Back to Home
          </button>
        </div>

        {/* Create New Syllabus Card */}
        <div 
          className={`border-2 border-dashed ${
            darkMode ? "border-green-600 hover:bg-gray-800" : "border-green-300 hover:bg-green-50"
          } rounded-lg p-8 mb-8 flex flex-col items-center justify-center cursor-pointer transition-colors`}
          onClick={() => navigate('/syllabus-builder')}
        >
          <div className={`${darkMode ? "bg-green-900" : "bg-green-100"} p-4 rounded-full mb-4`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-10 w-10 ${darkMode ? "text-green-400" : "text-green-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h2 className={`text-xl font-semibold ${darkMode ? "text-green-400" : "text-green-600"}`}>Create New Syllabus</h2>
          <p className={`${darkMode ? "text-gray-400" : "text-gray-500"} mt-2 text-center`}>
            Build a detailed course syllabus from scratch
          </p>
        </div>

        {/* Existing Syllabuses */}
        <h2 className="text-2xl font-semibold mb-4">Your Syllabuses</h2>
        
        {isLoading ? (
          <div className="text-center py-8">
            <p>Loading your syllabuses...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {syllabuses.length > 0 ? (
              syllabuses.map(syllabus => (
                <div 
                  key={syllabus.id} 
                  className={`border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer ${
                    syllabus.isCurriculumLink 
                      ? (darkMode ? "border-blue-700 bg-blue-900/20" : "border-blue-200 bg-blue-50") 
                      : syllabus.isCourseLink
                        ? (darkMode ? "border-green-700 bg-green-900/20" : "border-green-200 bg-green-50")
                        : (darkMode ? "border-gray-700" : "border-gray-200")
                  }`}
                  onClick={() => {
                    if (syllabus.isCurriculumLink && syllabus.linkedCurriculumId) {
                      navigate(`/curriculum-courses/${syllabus.linkedCurriculumId}`);
                    } else if (syllabus.isCourseLink) {
                      navigate(`/syllabus-new?courseCode=${syllabus.courseCode}&courseId=${syllabus.courseId}`);
                    } else {
                      navigate(`/syllabus-builder/${syllabus.id}`);
                    }
                  }}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium">
                      {syllabus.isCurriculumLink ? (
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {syllabus.courseTitle}
                        </span>
                      ) : syllabus.isCourseLink ? (
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {syllabus.courseCode}: {syllabus.courseTitle}
                        </span>
                      ) : (
                        `${syllabus.courseCode}: ${syllabus.courseTitle}`
                      )}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      syllabus.status === 'Published' 
                        ? darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800' 
                        : darkMode ? 'bg-amber-900 text-amber-300' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {syllabus.status || 'Draft'}
                    </span>
                  </div>
                  <p className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-sm mt-2`}>
                    {syllabus.isCurriculumLink ? (
                      <span>Curriculum Link</span>
                    ) : (
                      `L-T-P-C: ${syllabus.ltpc}`
                    )}
                  </p>
                  <p className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-sm`}>
                    Last modified: {syllabus.lastModified || 'Unknown'}
                  </p>
                  <div className="flex mt-4 space-x-2">
                    <button 
                      className={`px-3 py-1 text-sm rounded ${
                        darkMode 
                          ? (syllabus.isCurriculumLink ? "bg-blue-900 text-blue-300" : syllabus.isCourseLink ? "bg-green-900 text-green-300" : "bg-green-900 text-green-300") 
                          : (syllabus.isCurriculumLink ? "bg-blue-50 text-blue-600" : syllabus.isCourseLink ? "bg-green-50 text-green-600" : "bg-green-50 text-green-600")
                      } hover:${darkMode ? "bg-opacity-80" : "bg-opacity-90"}`}
                      onClick={(e) => handleEdit(e, syllabus.id)}
                    >
                      {syllabus.isCurriculumLink 
                        ? "Open Curriculum" 
                        : syllabus.isCourseLink 
                          ? "Create Syllabus" 
                          : "Edit"}
                    </button>
                    
                    {/* Only show duplicate option for regular syllabuses */}
                    {!syllabus.isCurriculumLink && (
                      <button 
                        className={`px-3 py-1 text-sm rounded ${
                          darkMode ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                        }`}
                        onClick={(e) => handleDuplicate(e, syllabus)}
                      >
                        Duplicate
                      </button>
                    )}
                    
                    <button 
                      className={`px-3 py-1 text-sm rounded ${
                        darkMode ? "bg-red-900 text-red-300 hover:bg-red-800" : "bg-red-50 text-red-600 hover:bg-red-100"
                      }`}
                      onClick={(e) => handleDelete(e, syllabus.id)}
                    >
                      {syllabus.isCurriculumLink ? "Remove Link" : "Delete"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className={`${darkMode ? "text-gray-400" : "text-gray-500"} col-span-3 text-center py-8`}>
                No syllabuses found. Create your first syllabus to get started.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SyllabusDashboard;