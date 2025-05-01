import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './../Navbar';
import { getComponentDisplayName } from './curriculumUtils';
import home from '../../assets/image.png';

const CurriculumCoursesView = () => {
  const { curriculumId } = useParams();
  const navigate = useNavigate();
  const [curriculum, setCurriculum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [courseEntries, setCourseEntries] = useState([]);

  useEffect(() => {
    loadCurriculum();
    loadCourseEntries();
  }, [curriculumId]);

  const loadCurriculum = () => {
    try {
      const savedCurriculums = JSON.parse(localStorage.getItem('curriculums') || '[]');
      const foundCurriculum = savedCurriculums.find(c => c.id === Number(curriculumId));
      setCurriculum(foundCurriculum || null);
    } catch (error) {
      console.error('Error loading curriculum:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCourseEntries = () => {
    try {
      // Load both regular syllabuses and NEP syllabuses
      const savedSyllabuses = JSON.parse(localStorage.getItem('syllabuses') || '[]');
      const savedNepSyllabuses = JSON.parse(localStorage.getItem('nepSyllabuses') || '[]');
      
      // Combine both types of syllabuses
      const allSyllabuses = [...savedSyllabuses, ...savedNepSyllabuses];
      
      // Find all course entries that are linked to courses in this specific curriculum
      const entries = allSyllabuses.filter(s => 
        s.isCourseLink === true && s.linkedCurriculumId === Number(curriculumId)
      );
      
      setCourseEntries(entries);
    } catch (error) {
      console.error('Error loading course entries:', error);
    }
  };

  const handleSyllabusAction = (courseCode, courseId) => {
    // First, check if a syllabus already exists for this course
    const existingSyllabus = courseEntries.find(
      entry => entry.courseId === courseId && entry.courseCode === courseCode
    );

    if (existingSyllabus) {
      // If syllabus exists, navigate to edit page with the syllabus ID
      navigate(`/syllabus-new/${existingSyllabus.id}`);
    } else {
      // If no syllabus exists, navigate to create page
      navigate(`/syllabus-new?courseCode=${courseCode}&courseId=${courseId}`);
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} home={home} />
        <div className="container mx-auto px-4 py-8 text-center">
          <p>Loading curriculum data...</p>
        </div>
      </div>
    );
  }

  if (!curriculum) {
    return (
      <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} home={home} />
        <div className="container mx-auto px-4 py-8 text-center">
          <p>Curriculum not found.</p>
          <button 
            onClick={() => navigate('/syllabusdashboard')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Syllabus Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} home={home} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">{curriculum.frontPageData.programName}</h1>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} mt-1`}>
              {curriculum.frontPageData.schoolName} - {curriculum.frontPageData.departmentName}
            </p>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Academic Year: {curriculum.frontPageData.academicYear}
            </p>
          </div>
          
          <div className="space-x-2">
            <button 
              onClick={() => navigate('/syllabusdashboard')}
              className="px-4 py-2 text-blue-600 hover:text-blue-800"
            >
              Back to Dashboard
            </button>
            <button 
              onClick={() => navigate(`/curriculum-builder/${curriculumId}`)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Edit Curriculum
            </button>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Available Courses</h2>
          <p className="mb-4">Click "Create Syllabus" to develop a detailed syllabus for any course in this curriculum.</p>
          
          {curriculum.semesterData.map((semester, semIndex) => {
            if (!semester.isCustom && semester.courses.length > 0) {
              return (
                <div key={semester.id} className="mb-10">
                  <h3 className="text-xl font-semibold mb-3 pb-2 border-b border-gray-300">
                    {semester.name}
                  </h3>
                  
                  {/* Horizontal scrollable grid of course cards */}
                  <div className="relative">
                    {/* Left scroll shadow/button for visual indication of more content */}
                    <div className="absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center z-10">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center 
                        ${darkMode ? "bg-gray-800" : "bg-white"} shadow-md cursor-pointer 
                        ${semester.courses.length > 3 ? "" : "opacity-0 pointer-events-none"}`}
                        onClick={(e) => {
                          const container = e.target.closest('.relative').querySelector('.flex.overflow-x-auto');
                          container.scrollBy({ left: -300, behavior: 'smooth' });
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>

                    {/* Horizontal scrollable container */}
                    <div className="flex overflow-x-auto py-2 hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
                      {/* Add some padding at the beginning */}
                      <div className="pl-4"></div>
                      
                      {semester.courses.map((course, idx) => {
                        // Find if there's an existing syllabus for this course
                        const courseEntry = courseEntries.find(entry => 
                          entry.courseId === course.id && entry.courseCode === course.code
                        );
                        
                        return (
                          <div 
                            key={course.id} 
                            className={`flex-shrink-0 w-72 mr-4 rounded-lg shadow-md overflow-hidden border 
                              ${darkMode 
                                ? "bg-gray-800 border-gray-700" 
                                : courseEntry 
                                  ? "bg-green-50 border-green-200" 
                                  : "bg-white border-gray-200"
                              }`}
                          >
                            <div className="px-4 py-3 border-b border-gray-200">
                              <div className="flex justify-between items-start">
                                <h4 className="font-bold text-lg truncate" title={course.title}>
                                  {course.title}
                                </h4>
                                <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                                  courseEntry 
                                    ? darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700'
                                    : darkMode ? 'bg-amber-900 text-amber-300' : 'bg-amber-100 text-amber-700'
                                }`}>
                                  {courseEntry ? 'Syllabus Ready' : 'Needed'}
                                </span>
                              </div>
                              <p className="text-sm text-gray-500 mt-1">{course.code}</p>
                            </div>
                            
                            <div className="px-4 py-2">
                              <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs mb-3">
                                <div>
                                  <span className={darkMode ? "text-gray-400" : "text-gray-500"}>Component:</span>
                                  <p className="font-medium">{getComponentDisplayName(course.component)}</p>
                                </div>
                                <div>
                                  <span className={darkMode ? "text-gray-400" : "text-gray-500"}>Credits:</span>
                                  <p className="font-medium">{course.credits}</p>
                                </div>
                                <div>
                                  <span className={darkMode ? "text-gray-400" : "text-gray-500"}>H/S:</span>
                                  <p className="font-medium">{course.hs || 'N/A'}</p>
                                </div>
                                <div>
                                  <span className={darkMode ? "text-gray-400" : "text-gray-500"}>Hours:</span>
                                  <p className="font-medium">{course.lectureHours}-{course.tutorialHours}-{course.practicalHours}</p>
                                </div>
                              </div>
                              
                              <button
                                onClick={() => handleSyllabusAction(course.code, course.id)}
                                className={`w-full py-2 rounded-md text-sm font-medium
                                  ${darkMode
                                    ? courseEntry 
                                      ? "bg-blue-900 text-blue-300 hover:bg-blue-800" 
                                      : "bg-green-900 text-green-300 hover:bg-green-800"
                                    : courseEntry 
                                      ? "bg-blue-100 text-blue-700 hover:bg-blue-200" 
                                      : "bg-green-100 text-green-700 hover:bg-green-200"
                                  }`}
                              >
                                {courseEntry ? 'View/Edit Syllabus' : 'Create Syllabus'}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                      
                      {/* Add some padding at the end */}
                      <div className="pr-4"></div>
                    </div>
                    
                    {/* Right scroll shadow/button for visual indication of more content */}
                    <div className="absolute right-0 top-0 bottom-0 w-8 flex items-center justify-center z-10">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center 
                        ${darkMode ? "bg-gray-800" : "bg-white"} shadow-md cursor-pointer
                        ${semester.courses.length > 3 ? "" : "opacity-0 pointer-events-none"}`}
                        onClick={(e) => {
                          const container = e.target.closest('.relative').querySelector('.flex.overflow-x-auto');
                          container.scrollBy({ left: 300, behavior: 'smooth' });
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default CurriculumCoursesView;