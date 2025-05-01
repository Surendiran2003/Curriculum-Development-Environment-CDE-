import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FrontPage from './FrontPage';
import Regulations from './Regulations';
import SemesterDetails from './SemesterDetails';
import Print from './Print';
import Navbar from '../Navbar';
import home from '../../assets/home.png'; // Adjust the path as needed

// API configuration - Updated to use the correct URL
const API_BASE_URL = 'http://127.0.0.1:8000'; // Changed from localhost to 127.0.0.1
const SYLLABUS_ENDPOINT = `${API_BASE_URL}/syllabus/`; // Changed from syllabuses to syllabus

const CurriculumBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('frontpage');
  const [isSaving, setIsSaving] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
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
  
  // Load data if editing an existing curriculum
  useEffect(() => {
    if (id) {
      loadCurriculumData(id);
    }
  }, [id]);

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
    }
  };
  
  // Save curriculum data to localStorage
  const saveCurriculum = () => {
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
      createSyllabusDashboardEntry(curriculumData);
      
      // Success message (in real app, you'd use a toast notification)
      alert('Curriculum saved successfully!');
      
      // Navigate back to dashboard
      navigate('/curriculum-dashboard');
    } catch (error) {
      console.error('Error saving curriculum:', error);
      alert('Failed to save curriculum. Please try again.');
    } finally {
      setIsSaving(false);
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
    } catch (error) {
      console.error('Error creating syllabus dashboard entry:', error);
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