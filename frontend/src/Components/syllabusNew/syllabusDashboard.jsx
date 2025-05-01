import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar';

// API configuration
const API_BASE_URL = 'http://127.0.0.1:8000';
const SYLLABUS_ENDPOINT = `${API_BASE_URL}/syllabus/`;

const SyllabusDashboard = () => {
  const navigate = useNavigate();
  const [syllabuses, setSyllabuses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSyllabuses, setFilteredSyllabuses] = useState([]);
  const [sortOrder, setSortOrder] = useState('newest');
  const [filterType, setFilterType] = useState('all');
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
  const [apiError, setApiError] = useState(null);

  // Load syllabuses on component mount
  useEffect(() => {
    loadSyllabuses();
  }, []);

  // Filter syllabuses based on search query and filter type
  useEffect(() => {
    let filtered = [...syllabuses];
    
    // Apply type filter
    if (filterType === 'standalone') {
      filtered = filtered.filter(syllabus => !syllabus.isCurriculumLink && !syllabus.isCourseLink);
    } else if (filterType === 'curriculum') {
      filtered = filtered.filter(syllabus => syllabus.isCurriculumLink);
    } else if (filterType === 'course') {
      filtered = filtered.filter(syllabus => syllabus.isCourseLink);
    }
    
    // Apply search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(syllabus => 
        syllabus.courseCode?.toLowerCase().includes(query) || 
        syllabus.courseTitle?.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    if (sortOrder === 'newest') {
      filtered.sort((a, b) => {
        const dateA = a.lastModified ? new Date(a.lastModified) : new Date(0);
        const dateB = b.lastModified ? new Date(b.lastModified) : new Date(0);
        return dateB - dateA;
      });
    } else if (sortOrder === 'oldest') {
      filtered.sort((a, b) => {
        const dateA = a.lastModified ? new Date(a.lastModified) : new Date(0);
        const dateB = b.lastModified ? new Date(b.lastModified) : new Date(0);
        return dateA - dateB;
      });
    } else if (sortOrder === 'title') {
      filtered.sort((a, b) => {
        return (a.courseTitle || '').localeCompare(b.courseTitle || '');
      });
    } else if (sortOrder === 'code') {
      filtered.sort((a, b) => {
        return (a.courseCode || '').localeCompare(b.courseCode || '');
      });
    }
    
    setFilteredSyllabuses(filtered);
  }, [searchQuery, syllabuses, sortOrder, filterType]);

  // Fetch syllabuses from API
  const fetchSyllabusesFromAPI = async () => {
    try {
      setApiError(null);
      const response = await axios.get(SYLLABUS_ENDPOINT);
      console.log('API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching syllabuses from API:', error);
      setApiError(`Failed to fetch syllabuses from server: ${error.message}`);
      return [];
    }
  };

  // Load syllabuses from API and localStorage
  const loadSyllabuses = async () => {
    setIsLoading(true);
    try {
      // Fetch API syllabuses
      const apiSyllabuses = await fetchSyllabusesFromAPI();
      
      // Load localStorage syllabuses
      const regularSyllabuses = JSON.parse(localStorage.getItem('syllabuses') || '[]');
      const nepSyllabuses = JSON.parse(localStorage.getItem('nepSyllabuses') || '[]');
      
      // Mark the source of each syllabus for UI differentiation
      const markedApiSyllabuses = apiSyllabuses.map(s => ({
        ...s,
        source: 'api',
        syllabusType: s.syllabusType || 'regular'
      }));
      
      const markedRegularSyllabuses = regularSyllabuses.map(s => ({
        ...s,
        source: 'localStorage',
        syllabusType: 'regular'
      }));
      
      const markedNepSyllabuses = nepSyllabuses.map(s => ({
        ...s,
        source: 'localStorage',
        syllabusType: 'nep'
      }));
      
      // Combine and filter syllabuses
      let allSyllabuses = [...markedApiSyllabuses, ...markedRegularSyllabuses, ...markedNepSyllabuses];
      
      // Remove duplicates with preference for API versions
      const uniqueSyllabuses = [];
      const seenIds = new Set();
      
      for (const syllabus of allSyllabuses) {
        // If we haven't seen this ID or it's API version and we've only seen localStorage version
        if (!seenIds.has(syllabus.id) || 
            (syllabus.source === 'api' && 
             !uniqueSyllabuses.find(s => s.id === syllabus.id && s.source === 'api'))) {
          uniqueSyllabuses.push(syllabus);
          seenIds.add(syllabus.id);
        }
      }
      
      // Filter out course-linked syllabuses that shouldn't appear on dashboard
      const filteredSyllabuses = uniqueSyllabuses.filter(syllabus => 
        !syllabus.isCourseLink || syllabus.showInDashboard === true
      );
      
      setSyllabuses(filteredSyllabuses);
      setFilteredSyllabuses(filteredSyllabuses);
    } catch (error) {
      console.error('Error loading syllabuses:', error);
      showToast('Failed to load syllabuses', 'error');
      setSyllabuses([]);
      setFilteredSyllabuses([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (e, id, type, source) => {
    e.stopPropagation(); // Prevent navigation to the syllabus editor
    
    const confirmMessage = type === 'curriculum' 
      ? 'Are you sure you want to remove this curriculum link?' 
      : 'Are you sure you want to delete this syllabus?';
    
    if (window.confirm(confirmMessage)) {
      try {
        setIsLoading(true); // Show loading state
        
        // Find the target syllabus to determine storage key
        const targetSyllabus = syllabuses.find(s => s.id === id);
        if (!targetSyllabus) return;
        
        // If syllabus is from API, delete from API
        if (targetSyllabus.source === 'api') {
          await axios.delete(`${SYLLABUS_ENDPOINT}${id}/`);
        }
        
        // If stored in localStorage, remove from there too
        if (targetSyllabus.syllabusType === 'nep') {
          const nepSyllabuses = JSON.parse(localStorage.getItem('nepSyllabuses') || '[]');
          const updatedNepSyllabuses = nepSyllabuses.filter(s => s.id !== id);
          localStorage.setItem('nepSyllabuses', JSON.stringify(updatedNepSyllabuses));
        } else {
          const regularSyllabuses = JSON.parse(localStorage.getItem('syllabuses') || '[]');
          const updatedRegularSyllabuses = regularSyllabuses.filter(s => s.id !== id);
          localStorage.setItem('syllabuses', JSON.stringify(updatedRegularSyllabuses));
        }
        
        // Update state directly for immediate UI feedback
        setSyllabuses(prevSyllabuses => prevSyllabuses.filter(s => s.id !== id));
        
        const message = type === 'curriculum' 
          ? 'Curriculum link removed successfully!' 
          : 'Syllabus deleted successfully!';
        
        showToast(message);
      } catch (error) {
        console.error('Error deleting syllabus:', error);
        showToast(`Failed to delete syllabus: ${error.message}`, 'error');
      } finally {
        setIsLoading(false); // Hide loading state
      }
    }
  };

  // Handle clicking the Edit button
  const handleEdit = (e, id, type) => {
    e.stopPropagation(); // Prevent the parent div click from triggering
    
    // Find the syllabus to check its type
    const syllabus = syllabuses.find(s => s.id === id);
    
    if (!syllabus) return;
    
    if (syllabus.isCurriculumLink && syllabus.linkedCurriculumId) {
      // Navigate to curriculum courses view with the linked curriculum ID
      navigate(`/curriculum-courses/${syllabus.linkedCurriculumId}`);
    } else if (syllabus.isCourseLink) {
      // Navigate to syllabus form for a course
      navigate(`/syllabus-new?courseCode=${syllabus.courseCode}&courseId=${syllabus.courseId}`);
    } else if (syllabus.syllabusType === 'nep') {
      // Navigate to NEP syllabus editor
      navigate(`/syllabus-new/${id}`);
    } else {
      // Regular syllabus navigation
      navigate(`/syllabus-new/${id}`);
    }
  };

  const handleSyllabusClick = (syllabus) => {
    if (syllabus.isCurriculumLink && syllabus.linkedCurriculumId) {
      navigate(`/curriculum-courses/${syllabus.linkedCurriculumId}`);
    } else if (syllabus.isCourseLink) {
      navigate(`/syllabus-new?courseCode=${syllabus.courseCode}&courseId=${syllabus.courseId}`);
    } else if (syllabus.syllabusType === 'nep') {
      navigate(`/syllabus-new/${syllabus.id}`);
    } else {
      navigate(`/syllabus-new/${syllabus.id}`);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ visible: false, message: '', type: 'success' }), 3000);
  };

  const getSyllabusTypeLabel = (syllabus) => {
    if (syllabus.isCurriculumLink) return 'Curriculum Link';
    if (syllabus.isCourseLink) return 'Course Link';
    return syllabus.syllabusType === 'nep' ? 'NEP Syllabus' : 'Syllabus';
  };

  const getSourceLabel = (source) => {
    return source === 'api' ? '(API)' : '';
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Date unknown';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (error) {
      return dateString; // Return the original string if parsing fails
    }
  };

  const renderLoadingState = () => (
    <div className="flex justify-center items-center py-16">
      <div className={`animate-pulse flex flex-col items-center ${darkMode ? "text-gray-400" : ""}`}>
        <div className={`h-12 w-12 ${darkMode ? "bg-green-800" : "bg-green-200"} rounded-full mb-4`}></div>
        <div className={`h-4 w-40 ${darkMode ? "bg-gray-700" : "bg-gray-200"} rounded mb-2`}></div>
        <div className={`h-3 w-32 ${darkMode ? "bg-gray-800" : "bg-gray-100"} rounded`}></div>
      </div>
    </div>
  );

  const renderEmptyState = () => (
    <div className={`text-center py-12 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"} rounded-xl shadow-sm border p-8`}>
      <div className={`mb-4 ${darkMode ? "bg-gray-700" : "bg-gray-50"} inline-block p-4 rounded-full`}>
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-12 w-12 ${darkMode ? "text-gray-400" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 className={`text-xl font-medium ${darkMode ? "text-gray-200" : "text-gray-700"} mb-2`}>No syllabuses found</h3>
      <p className={`${darkMode ? "text-gray-400" : "text-gray-500"} mb-6`}>Create your first syllabus to get started</p>
    </div>
  );

  const renderNoSearchResults = () => (
    <div className={`text-center py-12 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"} rounded-xl shadow-sm border p-8`}>
      <div className={`mb-4 ${darkMode ? "bg-gray-700" : "bg-gray-50"} inline-block p-4 rounded-full`}>
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-12 w-12 ${darkMode ? "text-gray-400" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h3 className={`text-xl font-medium ${darkMode ? "text-gray-200" : "text-gray-700"} mb-2`}>No match found</h3>
      <p className={`${darkMode ? "text-gray-400" : "text-gray-500"} mb-6`}>No syllabuses match your search for "{searchQuery}"</p>
      <button 
        onClick={clearSearch}
        className={`px-5 py-2.5 ${darkMode ? "bg-green-700 hover:bg-green-800" : "bg-green-600 hover:bg-green-700"} text-white rounded-lg font-medium transition-colors shadow-sm`}
      >
        Clear Search
      </button>
    </div>
  );

  const renderApiError = () => (
    <div className={`mb-4 rounded-lg p-4 ${
      darkMode ? "bg-red-900 border border-red-700 text-red-100" : "bg-red-100 border border-red-400 text-red-700"
    }`}>
      <div className="flex">
        <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <div>
          <p className="font-medium">API Connection Error</p>
          <p className="text-sm">{apiError}</p>
          <p className="text-sm mt-1">Showing syllabuses from local storage only.</p>
        </div>
      </div>
    </div>
  );

  const renderSyllabusCards = () => {
    if (isLoading) {
      return renderLoadingState();
    }

    if (syllabuses.length === 0) {
      return renderEmptyState();
    }

    if (filteredSyllabuses.length === 0) {
      return renderNoSearchResults();
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSyllabuses.map(syllabus => (
          <div 
            key={syllabus.id} 
            className={`${
              darkMode
                ? syllabus.isCurriculumLink
                  ? "bg-gray-800 border-blue-700 hover:border-blue-600"
                  : syllabus.isCourseLink
                    ? "bg-gray-800 border-green-700 hover:border-green-600"
                    : syllabus.syllabusType === 'nep'
                      ? "bg-gray-800 border-indigo-700 hover:border-indigo-600"
                      : "bg-gray-800 border-gray-700 hover:border-gray-600"
                : syllabus.isCurriculumLink
                  ? "bg-white border-blue-200 hover:border-blue-300"
                  : syllabus.isCourseLink
                    ? "bg-white border-green-200 hover:border-green-300"
                    : syllabus.syllabusType === 'nep'
                      ? "bg-white border-indigo-200 hover:border-indigo-300"
                      : "bg-white border-gray-200 hover:border-gray-300"
            } border rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 transform hover:-translate-y-1`}
            onClick={() => handleSyllabusClick(syllabus)}
          >
            <div className={`border-b ${
              darkMode
                ? syllabus.isCurriculumLink
                  ? "border-blue-700 bg-blue-900/20"
                  : syllabus.isCourseLink
                    ? "border-green-700 bg-green-900/20"
                    : syllabus.syllabusType === 'nep'
                      ? "border-indigo-700 bg-indigo-900/20"
                      : "border-gray-700 bg-gray-700/30"
                : syllabus.isCurriculumLink
                  ? "border-blue-100 bg-blue-50"
                  : syllabus.isCourseLink
                    ? "border-green-100 bg-green-50"
                    : syllabus.syllabusType === 'nep'
                      ? "border-indigo-100 bg-indigo-50"
                      : "border-gray-100 bg-gray-50"
            } px-6 py-4 flex justify-between items-start`}>
              <div>
                <h3 className={`text-lg font-medium ${darkMode ? "text-gray-100" : "text-gray-800"} truncate`}>
                  {syllabus.courseCode && (
                    <span className={`${
                      darkMode
                        ? syllabus.isCurriculumLink
                          ? "text-blue-400"
                          : syllabus.isCourseLink
                            ? "text-green-400"
                            : syllabus.syllabusType === 'nep'
                              ? "text-indigo-400"
                              : "text-gray-300"
                        : syllabus.isCurriculumLink
                          ? "text-blue-600"
                          : syllabus.isCourseLink
                            ? "text-green-600"
                            : syllabus.syllabusType === 'nep'
                              ? "text-indigo-600"
                              : "text-gray-700"
                    } font-semibold`}>
                      {syllabus.courseCode}
                    </span>
                  )}
                  {syllabus.courseCode && syllabus.courseTitle ? ': ' : ''}
                  {syllabus.courseTitle || 'Untitled Syllabus'}
                </h3>
                <div className={`text-xs mt-1 ${
                  darkMode
                    ? syllabus.isCurriculumLink
                      ? "text-blue-400"
                      : syllabus.isCourseLink
                        ? "text-green-400"
                        : syllabus.syllabusType === 'nep'
                          ? "text-indigo-400"
                          : "text-gray-400"
                    : syllabus.isCurriculumLink
                      ? "text-blue-600"
                      : syllabus.isCourseLink
                        ? "text-green-600"
                        : syllabus.syllabusType === 'nep'
                          ? "text-indigo-600"
                          : "text-gray-600"
                }`}>
                  {getSyllabusTypeLabel(syllabus)}
                </div>
              </div>
              <span className={`px-2.5 py-1 text-xs rounded-full ${
                darkMode
                  ? syllabus.status === 'Published'
                    ? 'bg-green-900 text-green-300 border border-green-700'
                    : 'bg-amber-900 text-amber-300 border border-amber-700'
                  : syllabus.status === 'Published'
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : 'bg-amber-100 text-amber-700 border border-amber-200'
              }`}>
                {syllabus.status || 'Draft'}
              </span>
            </div>
            
            <div className={`px-6 py-4 ${darkMode ? "text-gray-300" : ""}`}>
              <div className={`flex items-center ${darkMode ? "text-gray-400" : "text-gray-500"} text-sm mb-2`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1.5 ${darkMode ? "text-gray-500" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {syllabus.credits 
                  ? `Credits: ${syllabus.credits}` 
                  : syllabus.ltpc 
                    ? `L-T-P-C: ${syllabus.ltpc}` 
                    : 'Credits: Not specified'}
              </div>
              
              <div className={`flex items-center ${darkMode ? "text-gray-400" : "text-gray-500"} text-sm`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1.5 ${darkMode ? "text-gray-500" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {syllabus.lastModified ? `Modified: ${syllabus.lastModified}` : 'Date unknown'}
              </div>
            </div>
            
            <div className={`${darkMode ? "bg-gray-900" : "bg-gray-50"} px-6 py-3 flex space-x-2 border-t ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
              <button 
                className={`px-3 py-1 text-sm ${
                  darkMode
                    ? syllabus.isCurriculumLink
                      ? "bg-blue-900 text-blue-300 border-blue-700 hover:bg-blue-800"
                      : syllabus.isCourseLink
                        ? "bg-green-900 text-green-300 border-green-700 hover:bg-green-800"
                        : syllabus.syllabusType === 'nep'
                          ? "bg-indigo-900 text-indigo-300 border-indigo-700 hover:bg-indigo-800"
                          : "bg-green-900 text-green-300 border-green-700 hover:bg-green-800"
                    : syllabus.isCurriculumLink
                      ? "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
                      : syllabus.isCourseLink
                        ? "bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                        : syllabus.syllabusType === 'nep'
                          ? "bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-100"
                          : "bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                } rounded-md border transition-colors font-medium flex items-center`}
                onClick={(e) => handleEdit(e, syllabus.id, getSyllabusTypeLabel(syllabus).toLowerCase())}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                {syllabus.isCurriculumLink 
                  ? "Open" 
                  : syllabus.isCourseLink 
                    ? "Create" 
                    : "Edit"}
              </button>
              
              {/* Only show copy option for regular syllabuses, not for NEP syllabuses */}
              {!syllabus.isCurriculumLink && !syllabus.syllabusType === 'nep' && (
                <button 
                  className={`px-3 py-1 text-sm rounded-md border transition-colors font-medium flex items-center ${
                    darkMode
                      ? "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700"
                      : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </button>
              )}
              
              <button 
                className={`px-3 py-1 text-sm rounded-md border transition-colors font-medium flex items-center ml-auto ${
                  darkMode
                    ? "bg-red-900 text-red-300 border-red-700 hover:bg-red-800"
                    : "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                }`}
                onClick={(e) => handleDelete(e, syllabus.id, syllabus.isCurriculumLink ? 'curriculum' : 'syllabus')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                {syllabus.isCurriculumLink ? "Remove" : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };
  return (
    <div className={`min-h-screen ${darkMode ? "bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100" : "bg-gradient-to-b from-green-50 to-gray-50 text-gray-900"}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
  
      {/* Toast notification */}
      {toast.visible && (
        <div className={`fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg flex items-center z-50 ${
          toast.type === 'success'
            ? darkMode ? 'bg-green-900 text-green-100 border-l-4 border-green-500' : 'bg-green-100 text-green-800 border-l-4 border-green-500'
            : darkMode ? 'bg-red-900 text-red-100 border-l-4 border-red-500' : 'bg-red-100 text-red-800 border-l-4 border-red-500'
        }`}>
          <div className={`mr-3 ${
            toast.type === 'success'
              ? darkMode ? 'text-green-300' : 'text-green-500'
              : darkMode ? 'text-red-300' : 'text-red-500'
          }`}>
            {toast.type === 'success' ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>
          <span>{toast.message}</span>
        </div>
      )}
  
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-wrap justify-between items-center mb-6">
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>NEP Syllabus Dashboard</h1>
            <button
              onClick={() => navigate('/')}
              className={`px-4 py-2 ${darkMode ? 'text-green-300 hover:text-green-100' : 'text-green-600 hover:text-green-800'} flex items-center`}
            >
              <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </button>
          </div>
  
          <div className={`text-sm mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Manage your NEP syllabuses, create new ones, or modify existing documents
          </div>
        </div>
  
        {/* Create New Syllabus Card */}
        <div
          className={`rounded-xl p-8 mb-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 shadow-sm border-2 border-dashed ${
            darkMode
              ? 'bg-gray-800 border-green-600 hover:bg-gray-700'
              : 'bg-white border-green-300 hover:bg-green-50 hover:border-green-400'
          }`}
          onClick={() => navigate('/syllabusnew')}
        >
          <div className={`p-4 rounded-full mb-4 shadow-inner ${darkMode ? 'bg-green-900' : 'bg-green-100'}`}>
            <svg className={`h-10 w-10 ${darkMode ? 'text-green-300' : 'text-green-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h2 className={`text-xl font-semibold mb-1 ${darkMode ? 'text-green-200' : 'text-green-600'}`}>Create New NEP Syllabus</h2>
          <p className={`text-center max-w-md ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Build a detailed NEP course syllabus from scratch with our guided template
          </p>
        </div>
  
        {/* Search and Filter */}
        <div className={`rounded-xl p-4 shadow-sm border mb-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
          <div className="flex flex-wrap justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Your NEP Syllabuses</h2>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {filteredSyllabuses.length} {filteredSyllabuses.length === 1 ? 'syllabus' : 'syllabuses'} available
              </p>
            </div>
  
            <div className="flex flex-wrap items-center gap-4">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className={`appearance-none py-2 pl-3 pr-8 rounded-lg text-sm border focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    darkMode
                      ? 'bg-gray-900 text-gray-100 border-gray-600'
                      : 'bg-gray-50 text-gray-700 border-gray-200'
                  }`}
                >
                  <option value="title">By Title</option>
                  <option value="code">By Course Code</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
  
              {/* Search Input */}
              <div className="relative w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className={`h-4 w-4 ${darkMode ? 'text-green-300' : 'text-green-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search syllabuses..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className={`w-full py-2 pl-10 pr-10 text-sm rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    darkMode
                      ? 'bg-gray-900 text-white border border-gray-700'
                      : 'bg-gray-50 text-gray-900 border border-gray-200'
                  }`}
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
  
        {/* Active Search Results Count */}
        {searchQuery && filteredSyllabuses.length > 0 && (
          <div className={`mb-4 text-sm pl-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Showing {filteredSyllabuses.length} result{filteredSyllabuses.length !== 1 ? 's' : ''} for "{searchQuery}"
          </div>
        )}
  
        {/* Syllabus Cards Grid */}
        {renderSyllabusCards()}
      </div>
    </div>
  );
  
};

export default SyllabusDashboard;