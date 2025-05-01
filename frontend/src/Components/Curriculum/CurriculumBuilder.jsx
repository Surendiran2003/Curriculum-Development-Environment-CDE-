import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FrontPage from './FrontPage';
import Regulations from './Regulations';
import SemesterDetails from './SemesterDetails';
import Print from './Print';
import Navbar from '../Navbar';
import home from '../../assets/home.png'; // Adjust the path as needed

// API configuration
const API_BASE_URL = 'http://127.0.0.1:8000';
const SYLLABUS_ENDPOINT = `${API_BASE_URL}/syllabus/`;

const CurriculumBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('frontpage');
  const [isSaving, setIsSaving] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
  
  // API status
  const [apiStatus, setApiStatus] = useState({
    isConnected: true,
    message: '',
    hasError: false
  });
  
  // Regulations state
  const [regulationsPdfFile, setRegulationsPdfFile] = useState(null);
  const [regulationsPdfUrl, setRegulationsPdfUrl] = useState(null);
  
  // Front page state
  const [frontPageData, setFrontPageData] = useState({
    universityName: 'PONDICHERRY UNIVERSITY',
    universityType: '(A CENTRAL UNIVERSITY)',
    schoolName: '',
    departmentName: '',
    documentType: 'REGULATIONS, CURRICULUM & SYLLABUS',
    programName: '',
    cbcsText: '(For CBCS System in Pondicherry University Department)',
    academicYear: '',
    additionalSections: []
  });
  const [logoImage, setLogoImage] = useState(null);
  
  // Semester details state
  const [semesterData, setSemesterData] = useState([]);
  
  // Check API connectivity
  const checkApiConnection = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/health-check/`);
      setApiStatus({
        isConnected: true,
        message: 'Connected to API',
        hasError: false
      });
      return true;
    } catch (error) {
      console.error('API connection check failed:', error);
      setApiStatus({
        isConnected: false,
        message: `API connection failed: ${error.message}`,
        hasError: true
      });
      return false;
    }
  };
  
  useEffect(() => {
    // Check API connection when component mounts
    checkApiConnection();
  }, []);
  
  // Load data if editing an existing curriculum
  useEffect(() => {
    if (id) {
      loadCurriculumData(id);
    }
  }, [id]);

  // Show toast message
  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ visible: false, message: '', type: 'success' }), 3000);
  };

  // Load curriculum data from localStorage
  const loadCurriculumData = (curriculumId) => {
    try {
      const savedCurriculums = JSON.parse(localStorage.getItem('curriculums') || '[]');
      const curriculum = savedCurriculums.find(c => c.id === Number(curriculumId));
      
      if (curriculum) {
        setFrontPageData(curriculum.frontPageData || frontPageData);
        setSemesterData(curriculum.semesterData || []);
        // Handle other data as needed
        if (curriculum.regulationsPdfUrl) {
          setRegulationsPdfUrl(curriculum.regulationsPdfUrl);
        }
      }
    } catch (error) {
      console.error('Error loading curriculum data:', error);
      showToast('Error loading curriculum data', 'error');
    }
  };
  
  // Send syllabus data to API
  const sendSyllabusToAPI = async (syllabusEntry, curriculumData) => {
    if (!apiStatus.isConnected) {
      console.log('API is offline, skipping API sync');
      return null;
    }
    
    try {
      // Prepare the syllabus data for API
      const apiSyllabusData = {
        // Basic syllabus fields
        id: syllabusEntry.id,
        course_code: syllabusEntry.courseCode,
        course_title: syllabusEntry.courseTitle,
        ltpc: syllabusEntry.ltpc,
        status: syllabusEntry.status,
        
        // Add curriculum-specific fields
        is_curriculum_link: true,
        linked_curriculum_id: curriculumData.id,
        show_in_dashboard: true,
        
        // Additional helpful metadata from the curriculum
        school: curriculumData.frontPageData.schoolName,
        department: curriculumData.frontPageData.departmentName,
        program: curriculumData.frontPageData.programName,
        academic_year: curriculumData.frontPageData.academicYear,
        
        // Include semester data to potentially use for course creation
        curriculum_data: {
          semester_count: semesterData.length,
          courses: semesterData.flatMap(semester => 
            semester.courses.map(course => ({
              course_code: course.courseCode,
              course_title: course.courseTitle,
              credits: course.credits,
              category: course.category
            }))
          )
        }
      };
      
      console.log('Sending syllabus data to API:', apiSyllabusData);
      
      // If updating existing syllabus
      if (syllabusEntry.id && typeof syllabusEntry.id === 'number') {
        const response = await axios.put(
          `${SYLLABUS_ENDPOINT}${syllabusEntry.id}/`, 
          apiSyllabusData
        );
        console.log('API Update Response:', response.data);
        
        // Update API status to confirm connection is working
        setApiStatus({
          isConnected: true,
          message: 'Syllabus updated in API successfully',
          hasError: false
        });
        
        return response.data;
      } 
      // If creating new syllabus
      else {
        const response = await axios.post(SYLLABUS_ENDPOINT, apiSyllabusData);
        console.log('API Create Response:', response.data);
        
        // Update API status to confirm connection is working
        setApiStatus({
          isConnected: true,
          message: 'Syllabus created in API successfully',
          hasError: false
        });
        
        return response.data;
      }
    } catch (error) {
      console.error('API Error:', error);
      console.error('Error sending syllabus to API:', error.response?.data || error.message);
      
      // Update API status to show the error
      setApiStatus({
        isConnected: false,
        message: `API error: ${error.response?.data?.detail || error.message}`,
        hasError: true
      });
      
      showToast(`API Error: ${error.response?.status || ''} ${error.message}`, 'error');
      
      // We're not throwing the error here to prevent blocking the overall save process
      // Instead we log it and continue - the data is still saved in localStorage
      return null;
    }
  };
  
  // Add a helper function to create the syllabus dashboard entry
  const createSyllabusDashboardEntry = (curriculumData) => {
    try {
      // Get existing syllabuses from localStorage
      const savedSyllabuses = JSON.parse(localStorage.getItem('syllabuses') || '[]');
      
      // Create a formatted name from the front page data
      const { schoolName, departmentName, programName, academicYear } = curriculumData.frontPageData;
      const syllabusName = [
        schoolName || 'School of Engineering Tech',
        departmentName || 'Department of Computer Science',
        programName || 'Untitled Program',
        academicYear || new Date().getFullYear()
      ].filter(Boolean).join(' - ');
      
      // Check if an entry already exists for this curriculum
      const existingIndex = savedSyllabuses.findIndex(s => s.linkedCurriculumId === curriculumData.id);
      
      const syllabusEntry = {
        id: existingIndex !== -1 ? savedSyllabuses[existingIndex].id : Date.now(),
        courseCode: "CURR", // Identifier to show this is a curriculum
        courseTitle: syllabusName,
        ltpc: "N/A", // Not applicable for curriculum entries
        lastModified: curriculumData.lastModified,
        status: curriculumData.status,
        linkedCurriculumId: curriculumData.id, // Important: link to curriculum ID
        isCurriculumLink: true, // Flag to identify this as a curriculum link
        showInDashboard: true  // Explicitly make curriculum links visible
      };
      
      if (existingIndex !== -1) {
        savedSyllabuses[existingIndex] = syllabusEntry;
      } else {
        savedSyllabuses.push(syllabusEntry);
      }
      
      // Save back to localStorage
      localStorage.setItem('syllabuses', JSON.stringify(savedSyllabuses));
      
      // Also try to sync with the API if it's available
      if (apiStatus.isConnected) {
        sendSyllabusToAPI(syllabusEntry, curriculumData)
          .then(apiData => {
            if (apiData) {
              console.log('Syllabus synced with API:', apiData);
            }
          })
          .catch(error => {
            console.error('Error syncing with API:', error);
          });
      }
      
      return syllabusEntry;
    } catch (error) {
      console.error('Error creating syllabus dashboard entry:', error);
      showToast('Failed to create syllabus dashboard entry', 'error');
      return null;
    }
  };
  
  // Save curriculum data to localStorage
  const saveCurriculum = async () => {
    setIsSaving(true);
    
    try {
      // Get existing curriculums from localStorage
      const savedCurriculums = JSON.parse(localStorage.getItem('curriculums') || '[]');
      
      // Create new curriculum object
      const curriculumData = {
        id: id ? Number(id) : Date.now(),
        name: frontPageData.programName || 'Untitled Curriculum',
        frontPageData,
        semesterData,
        regulationsPdfUrl,
        lastModified: new Date().toISOString().split('T')[0],
        status: 'Draft'
      };
      
      // If editing existing, update it; otherwise add new
      if (id) {
        const index = savedCurriculums.findIndex(c => c.id === Number(id));
        if (index !== -1) {
          savedCurriculums[index] = curriculumData;
        } else {
          savedCurriculums.push(curriculumData);
        }
      } else {
        savedCurriculums.push(curriculumData);
      }
      
      // Save back to localStorage
      localStorage.setItem('curriculums', JSON.stringify(savedCurriculums));
      
      // Create corresponding entry in syllabuses localStorage
      const syllabusEntry = createSyllabusDashboardEntry(curriculumData);
      
      // Show success message
      showToast('Curriculum saved successfully!', 'success');
      
      // Add a small delay before navigating back
      setTimeout(() => {
        // Navigate back to dashboard
        navigate('/curriculum-dashboard');
      }, 1500);
    } catch (error) {
      console.error('Error saving curriculum:', error);
      showToast('Failed to save curriculum. Please try again.', 'error');
    } finally {
      setIsSaving(false);
    }
  };
  
  const tabs = [
    { id: 'frontpage', label: 'Front Page' },
    { id: 'regulations', label: 'Regulations' },
    { id: 'semesters', label: 'Semester Details & Syllabus' },
    { id: 'print', label: 'Print' }
  ];

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} home={home} />
        
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-3xl font-bold">
              {id ? `Edit Curriculum` : `New Curriculum`}
            </h1>
            <div className="flex space-x-4">
              <button 
                onClick={saveCurriculum}
                disabled={isSaving}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save Curriculum'}
              </button>
              <button 
                onClick={() => navigate('/curriculum-dashboard')}
                className="px-4 py-2 text-blue-600 hover:text-blue-800"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
          
          {/* API Status Indicator */}
          {apiStatus.hasError && (
            <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded border border-yellow-200">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>
                  API Connection Issue: {apiStatus.message} - Data will be saved locally only
                </span>
              </div>
            </div>
          )}
          
          {/* Toast Notification */}
          {toast.visible && (
            <div className={`fixed top-4 right-4 p-4 rounded shadow-lg z-50 ${
              toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }`}>
              {toast.message}
            </div>
          )}
          
          <div className="flex flex-wrap gap-1 mb-6 border-b dark:border-gray-700">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`px-4 py-2 rounded-t-lg ${
                  activeTab === tab.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            {activeTab === 'frontpage' && 
              <FrontPage 
                frontPageData={frontPageData}
                setFrontPageData={setFrontPageData}
                logoImage={logoImage}
                setLogoImage={setLogoImage}
              />
            }
            {activeTab === 'regulations' && 
              <Regulations 
                pdfFile={regulationsPdfFile}
                setPdfFile={setRegulationsPdfFile}
                pdfUrl={regulationsPdfUrl}
                setPdfUrl={setRegulationsPdfUrl}
              />
            }
            {activeTab === 'semesters' && 
              <SemesterDetails 
                semesterData={semesterData}
                setSemesterData={setSemesterData}
              />
            }
            {activeTab === 'print' && <Print 
              frontPageData={frontPageData}
              semesterData={semesterData}
              logoImage={logoImage}
              regulationsPdfUrl={regulationsPdfUrl}
            />}
          </div>
        </div>
        
        <footer className={`py-6 mt-12 border-t ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="container mx-auto px-4">
            <p className="text-center text-sm text-gray-500">
              Curriculum Development Environment © {new Date().getFullYear()} | Build Version 1.0.2
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CurriculumBuilder;