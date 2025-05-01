import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Navbar from '../Navbar';

const SyllabusDashboard = () => {
  const navigate = useNavigate();
  const [nepSyllabuses, setNepSyllabuses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSyllabuses, setFilteredSyllabuses] = useState([]);
  const [sortOrder, setSortOrder] = useState('newest');

  useEffect(() => {
    loadNepSyllabuses();
  }, []);

  useEffect(() => {
    // Filter syllabuses based on search query
    if (searchQuery.trim() === '') {
      setFilteredSyllabuses(nepSyllabuses);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = nepSyllabuses.filter(syllabus => 
        syllabus.courseCode?.toLowerCase().includes(query) || 
        syllabus.courseTitle?.toLowerCase().includes(query)
      );
      setFilteredSyllabuses(filtered);
    }
  }, [searchQuery, nepSyllabuses]);

  useEffect(() => {
    // Sort syllabuses based on sort order
    const sortedSyllabuses = [...filteredSyllabuses];
    
    if (sortOrder === 'newest') {
      sortedSyllabuses.sort((a, b) => {
        const dateA = a.lastModified ? new Date(a.lastModified) : new Date(0);
        const dateB = b.lastModified ? new Date(b.lastModified) : new Date(0);
        return dateB - dateA;
      });
    } else if (sortOrder === 'oldest') {
      sortedSyllabuses.sort((a, b) => {
        const dateA = a.lastModified ? new Date(a.lastModified) : new Date(0);
        const dateB = b.lastModified ? new Date(b.lastModified) : new Date(0);
        return dateA - dateB;
      });
    } else if (sortOrder === 'title') {
      sortedSyllabuses.sort((a, b) => {
        return (a.courseTitle || '').localeCompare(b.courseTitle || '');
      });
    } else if (sortOrder === 'code') {
      sortedSyllabuses.sort((a, b) => {
        return (a.courseCode || '').localeCompare(b.courseCode || '');
      });
    }
    
    setFilteredSyllabuses(sortedSyllabuses);
  }, [sortOrder]);

  const loadNepSyllabuses = () => {
    setIsLoading(true);
    try {
      const savedNepSyllabuses = JSON.parse(localStorage.getItem('nepSyllabuses') || '[]');
      setNepSyllabuses(savedNepSyllabuses);
      setFilteredSyllabuses(savedNepSyllabuses);
    } catch (error) {
      console.error('Error loading NEP syllabuses:', error);
      setNepSyllabuses([]);
      setFilteredSyllabuses([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this syllabus?')) {
      try {
        const savedNepSyllabuses = JSON.parse(localStorage.getItem('nepSyllabuses') || '[]');
        const updatedNepSyllabuses = savedNepSyllabuses.filter(s => s.id !== id);
        localStorage.setItem('nepSyllabuses', JSON.stringify(updatedNepSyllabuses));
        setNepSyllabuses(updatedNepSyllabuses);
        // Show toast notification instead of alert
        showToast('Syllabus deleted successfully!');
      } catch (error) {
        console.error('Error deleting syllabus:', error);
        showToast('Failed to delete syllabus', 'error');
      }
    }
  };

  const handleDuplicate = (e, syllabus) => {
    e.stopPropagation();
    try {
      const savedNepSyllabuses = JSON.parse(localStorage.getItem('nepSyllabuses') || '[]');
      const duplicatedSyllabus = {
        ...syllabus,
        id: uuidv4(),  // ✅ unique UUID
        courseTitle: `${syllabus.courseTitle} (Copy)`,
        lastModified: new Date().toISOString().split('T')[0],
      };
      savedNepSyllabuses.push(duplicatedSyllabus);
      localStorage.setItem('nepSyllabuses', JSON.stringify(savedNepSyllabuses));
      setNepSyllabuses(savedNepSyllabuses);
      showToast('Syllabus duplicated successfully!');
    } catch (error) {
      console.error('Error duplicating syllabus:', error);
      showToast('Failed to duplicate syllabus', 'error');
    }
  };

  const handleEdit = (e, id) => {
    e.stopPropagation();
    navigate(`/syllabusnew/${id}`);
  };

  const handleSyllabusClick = (id) => {
    navigate(`/syllabusnew/${id}`);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  // Mock toast notification - in real app, use a toast library
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ visible: false, message: '', type: 'success' }), 3000);
  };

  const renderSyllabusCards = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-16">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 bg-green-200 rounded-full mb-4"></div>
            <div className="h-4 w-40 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 w-32 bg-gray-100 rounded"></div>
          </div>
        </div>
      );
    }

    if (nepSyllabuses.length === 0) {
      return (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="mb-4 bg-gray-50 inline-block p-4 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">No NEP syllabuses found</h3>
          <p className="text-gray-500 mb-6">Create your first syllabus to get started</p>
          <button 
            onClick={() => navigate('/syllabusnew')}
            className="px-5 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors shadow-sm"
          >
            Create New Syllabus
          </button>
        </div>
      );
    }

    if (filteredSyllabuses.length === 0) {
      return (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="mb-4 bg-gray-50 inline-block p-4 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">No match found</h3>
          <p className="text-gray-500 mb-6">No syllabuses match your search for "{searchQuery}"</p>
          <button 
            onClick={clearSearch}
            className="px-5 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors shadow-sm"
          >
            Clear Search
          </button>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSyllabuses.map(syllabus => (
          <div 
            key={syllabus.id} 
            className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            onClick={() => handleSyllabusClick(syllabus.id)}
          >
            <div className="border-b border-gray-100 bg-gradient-to-r from-green-50 to-gray-50 px-6 py-4 flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-800 truncate">
                {syllabus.courseCode ? <span className="text-green-600 font-semibold">{syllabus.courseCode}</span> : ''}
                {syllabus.courseCode && syllabus.courseTitle ? ': ' : ''}
                {syllabus.courseTitle || 'Untitled Syllabus'}
              </h3>
              <span className={`px-2.5 py-1 text-xs rounded-full ${
                syllabus.status === 'Published' 
                  ? 'bg-green-100 text-green-700 border border-green-200' 
                  : 'bg-amber-100 text-amber-700 border border-amber-200'
              }`}>
                {syllabus.status || 'Draft'}
              </span>
            </div>
            
            <div className="px-6 py-4">
              <div className="flex items-center text-gray-500 text-sm mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Credits: {syllabus.credits || 'Not specified'}
              </div>
              
              <div className="flex items-center text-gray-500 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {syllabus.lastModified ? `Modified: ${syllabus.lastModified}` : 'Date unknown'}
              </div>
            </div>
            
            <div className="bg-gray-50 px-6 py-3 flex space-x-2 border-t border-gray-100">
              <button 
                className="px-3 py-1 text-sm bg-green-50 text-green-600 rounded-md hover:bg-green-100 border border-green-200 transition-colors font-medium flex items-center"
                onClick={(e) => handleEdit(e, syllabus.id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
              <button 
                className="px-3 py-1 text-sm bg-gray-50 text-gray-600 rounded-md hover:bg-gray-100 border border-gray-200 transition-colors font-medium flex items-center"
                onClick={(e) => handleDuplicate(e, syllabus)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </button>
              <button 
                className="px-3 py-1 text-sm bg-red-50 text-red-600 rounded-md hover:bg-red-100 border border-red-200 transition-colors font-medium flex items-center ml-auto"
                onClick={(e) => handleDelete(e, syllabus.id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-gray-50">
      <Navbar />
      
      {/* Toast notification */}
      {toast.visible && (
        <div className={`fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg flex items-center z-50 ${
          toast.type === 'success' ? 'bg-green-100 text-green-800 border-l-4 border-green-500' : 
                                    'bg-red-100 text-red-800 border-l-4 border-red-500'
        }`}>
          <div className={`mr-3 ${toast.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
            {toast.type === 'success' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            <h1 className="text-3xl font-bold text-gray-800">NEP Syllabus Dashboard</h1>
            <button 
              onClick={() => navigate('/')}
              className="px-4 py-2 text-green-600 hover:text-green-800 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </button>
          </div>
          
          <div className="text-gray-600 text-sm mb-6">
            Manage your NEP syllabuses, create new ones, or modify existing documents
          </div>
        </div>

        {/* Create New Syllabus Card with enhanced design */}
        <div 
          className="bg-white border-2 border-dashed border-green-300 rounded-xl p-8 mb-8 
                    flex flex-col items-center justify-center cursor-pointer
                    hover:bg-green-50 hover:border-green-400 transition-all duration-300 shadow-sm"
          onClick={() => navigate('/syllabusnew')}
        >
          <div className="bg-green-100 p-4 rounded-full mb-4 shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-green-600 mb-1">Create New NEP Syllabus</h2>
          <p className="text-gray-500 text-center max-w-md">
            Build a detailed NEP course syllabus from scratch with our guided template
          </p>
        </div>

        {/* Enhanced Search and Filter Controls */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-wrap justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-lg font-semibold text-gray-800 mb-1">Your NEP Syllabuses</h2>
              <p className="text-sm text-gray-500">
                {filteredSyllabuses.length} {filteredSyllabuses.length === 1 ? 'syllabus' : 'syllabuses'} available
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              {/* Sort Dropdown */}
              <div className="relative">
                <select 
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2 pl-3 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
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
              
              {/* Enhanced Search Bar */}
              <div className="relative w-64 group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search syllabuses..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full py-2 pl-10 pr-10 text-sm bg-gray-50 border border-gray-200 rounded-lg 
                           shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent 
                           transition-all duration-200"
                />
                {searchQuery && (
                  <button 
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Search Results Count - only shown when actively searching */}
        {searchQuery && filteredSyllabuses.length > 0 && (
          <div className="mb-4 text-sm text-gray-600 pl-1">
            Showing {filteredSyllabuses.length} result{filteredSyllabuses.length !== 1 ? 's' : ''} for "{searchQuery}"
          </div>
        )}

        {/* Syllabus Cards Grid with enhanced UI */}
        {renderSyllabusCards()}
      </div>
    </div>
  );
};

export default SyllabusDashboard;