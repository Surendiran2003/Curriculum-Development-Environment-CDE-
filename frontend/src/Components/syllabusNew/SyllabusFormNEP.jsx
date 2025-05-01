import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import CourseDetails from "./CourseDetails";
import CourseOutcomes from "./CourseOutcomes";
import UnitDetails from "./UnitDetails";
import PracticalComponent from "./PracticalComponent";
import ReferenceDetails from "./ReferenceDetails";
import PrintSyllabusNEP from "./PrintSyllabusNEP";
import Navbar from "../Navbar";

// API configuration - Updated to use the correct URL
const API_BASE_URL = 'http://127.0.0.1:8000'; // Changed from localhost to 127.0.0.1
const SYLLABUS_ENDPOINT = `${API_BASE_URL}/syllabus/`; // Changed from syllabuses to syllabus

const SyllabusFormNEP = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [editingUnit, setEditingUnit] = useState(null);
  const [editingReference, setEditingReference] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    courseCode: "CSCS101",
    courseTitle: "Digital Logic Fundamentals",
    credits: "",
    semester: "",
    totalHours: "",
    category: "",
    prerequisites: "NIL",
    year: "I",
    internalMarks: "40",
    endSemesterMarks: "60",
    durationTheory: "03 hrs.",
    durationPractical: "03 hrs.",
    outcomes: [
      "Understand the principles of digital systems and binary number operations",
      "Apply Karnaugh mapping to simplify Boolean expressions and optimize digital circuits",
      "Analyze and design basic combinational circuits",
      "Synthesize and evaluate synchronous sequential circuits using storage elements and HDL",
      "Design and implement various types of registers and counters using HDL"
    ],
    units: [
      {
        id: 1,
        number: "I",
        title: "Introduction",
        content: "Digital Systems – Binary Numbers – Conversions – Types – Codes – Storage and Registers – Binary Logic – Boolean Algebra – Theorems and Properties – Functions – Canonical and Standard Forms – Other Logic Operations – Digital Logic Gates – Integrated Circuits",
        hours: 9
      },
      {
        id: 2,
        number: "II",
        title: "Gate‐Level Minimization",
        content: "Map Method – Four‐Variable KMap – Product‐of‐Sums Simplification – Don't‐Care Conditions – NAND and NOR Implementation – Other Two‐Level Implementations – Exclusive‐OR Function – Hardware Description Language",
        hours: 9
      },
      {
        id: 3,
        number: "III",
        title: "Combinational Logic",
        content: "Analysis Procedure – Design Procedure – Binary Adder– Subtractor – Decimal Adder – Binary Multiplier – Magnitude Comparator – Decoders – Encoders – Multiplexers – HDL Models of Combinational Circuits",
        hours: 9
      },
      {
        id: 4,
        number: "IV",
        title: "Synchronous Sequential Logic",
        content: "Storage Elements – Latches – Flip‐Flops – Analysis of Clocked Sequential Circuits – Synthesizable HDL Models of Sequential Circuits – State Reduction and Assignment – Design Procedure",
        hours: 9
      },
      {
        id: 5,
        number: "V",
        title: "Registers and Counters",
        content: "Registers – Shift Registers – Ripple Counters – Synchronous Counters – Other Counters – HDL for Registers and Counters",
        hours: 9
      }
    ],
    practicalHours: 30,
    practicalExercises: [
      "Binary to Decimal and viceversa",
      "Decimal to Hexadecimal and ViceVersa",
      "Digital Logic Gates",
      "Simplification of Boolean Functions",
      "Combinational Logic Circuits: i. Code Converters ii. Arithmetic (Adders, Subtractors, Multipliers, Comparators) iii. Data Handling (Multiplexers, Demultiplexers, Encoders & Decoders)",
      "Combinational Logic Circuit Design",
      "Binary AdderSubtractor Simulation",
      "Decimal Adder Simulation",
      "Binary Multiplier Simulation",
      "Sequential Circuit Storage Elements: FlipFlop Simulation"
    ],
    references: [
      {
        id: 1,
        author: "M. Morris Mano, Michael D. Ciletti",
        title: "Digital design With an Introduction to the Verilog HDL",
        publisher: "Pearson",
        year: "Sixth Edition, 2018"
      },
      {
        id: 2,
        author: "M. Rafiquzzaman",
        title: "Fundamentals of Digital Logic and Microcomputer Design",
        publisher: "John Wiley & Sons, Inc.",
        year: "Fifth Edition, 2009"
      }
    ],
    designedBy: "Dr. ,  Professor, PUDoCS",
    syllabusType: 'nep'
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const courseCode = queryParams.get('courseCode');
    const courseId = queryParams.get('courseId');
    
    // Check if we're editing an existing syllabus by ID
    if (id) {
      loadExistingSyllabus(id);
    }
    // Or if we're creating a syllabus from a course
    else if (courseCode && courseId) {
      checkForExistingSyllabus(courseCode, parseInt(courseId));
    }
  }, [location, id]);
  const deleteSyllabusFromAPI = async (syllabusId) => {
    try {
      setLoading(true);
      setError(null);
      await axios.delete(`${SYLLABUS_ENDPOINT}${syllabusId}/`);
      alert('Syllabus deleted successfully!');
      navigate('/syllabusdashboard'); // Redirect after delete
    } catch (error) {
      console.error('Error deleting syllabus:', error);
      alert('Failed to delete syllabus.');
    } finally {
      setLoading(false);
    }
  };
  const updateSyllabusToAPI = async (syllabusData) => {
    try {
      setLoading(true);
      setError(null);
  
      const formattedData = {
        id: syllabusData.id,
        courseCode: syllabusData.courseCode,
        courseTitle: syllabusData.courseTitle,
        credits: syllabusData.credits || "",
        semester: syllabusData.semester || "",
        totalHours: syllabusData.totalHours || "",
        category: syllabusData.category || "",
        prerequisites: syllabusData.prerequisites || "",
        year: syllabusData.year || "",
        internalMarks: syllabusData.internalMarks || "",
        endSemesterMarks: syllabusData.endSemesterMarks || "",
        durationTheory: syllabusData.durationTheory || "",
        durationPractical: syllabusData.durationPractical || "",
        outcomes: syllabusData.outcomes || [],
        units: syllabusData.units || [],
        practicalHours: parseInt(syllabusData.practicalHours) || 0,
        practicalExercises: syllabusData.practicalExercises || [],
        references: syllabusData.references || [],
        designedBy: syllabusData.designedBy || "",
        syllabusType: syllabusData.syllabusType || "nep",
        courseId: syllabusData.courseId || 0,
        isCourseLink: syllabusData.isCourseLink || false,
        linkedCurriculumId: syllabusData.linkedCurriculumId || null,
        lastModified: new Date().toISOString(),
        status: syllabusData.status || "Draft",
        showInDashboard: syllabusData.showInDashboard || true
      };
  
      // Use PUT to update existing syllabus by ID
      const response = await axios.put(
        `${SYLLABUS_ENDPOINT}${syllabusData.id}/`,
        formattedData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
  
      console.log('Syllabus updated in API:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating syllabus to API:', error);
      setError('Failed to update syllabus to server.');
      throw new Error('API update failed.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleUpdate = async () => {
    try {
      if (!formData.id) {
        alert("No existing syllabus to update.");
        return;
      }
      await updateSyllabusToAPI(formData);
      alert("Syllabus updated successfully!");
    } catch (error) {
      alert(`Error updating syllabus: ${error.message}`);
    }
    navigate('/syllabusdashboard');
  };
  
  
  // Function to fetch syllabus from API
  const fetchSyllabusFromAPI = async (syllabusId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${SYLLABUS_ENDPOINT}${syllabusId}/`);
      if (response.data) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching syllabus from API:', error);
      setError('Failed to fetch syllabus from server. Falling back to local storage.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Function to check if syllabus exists in API
  const checkSyllabusExistsInAPI = async (courseCode, courseId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${SYLLABUS_ENDPOINT}?courseCode=${courseCode}&courseId=${courseId}`);
      if (response.data && response.data.length > 0) {
        return response.data[0]; // Return the first matching syllabus
      }
      return null;
    } catch (error) {
      console.error('Error checking syllabus in API:', error);
      setError('Failed to check syllabus on server. Falling back to local storage.');
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  const checkForExistingSyllabus = async (courseCode, courseId) => {
    try {
      // Try to fetch from API first
      const apiSyllabus = await checkSyllabusExistsInAPI(courseCode, courseId);
      if (apiSyllabus) {
        navigate(`/syllabus-new/${apiSyllabus.id}`);
        return;
      }
      
      // If not in API, check localStorage as fallback
      const savedNepSyllabuses = JSON.parse(localStorage.getItem('nepSyllabuses') || '[]');
      let existingSyllabus = savedNepSyllabuses.find(s => 
        s.courseCode === courseCode && s.courseId === courseId
      );
      
      if (!existingSyllabus) {
        const savedSyllabuses = JSON.parse(localStorage.getItem('syllabuses') || '[]');
        existingSyllabus = savedSyllabuses.find(s => 
          s.courseCode === courseCode && s.courseId === courseId
        );
      }
      
      if (existingSyllabus) {
        navigate(`/syllabus-new/${existingSyllabus.id}`);
        return;
      }
      
      // If no existing syllabus found, load course data
      loadCourseData(courseCode, courseId);
    } catch (error) {
      console.error('Error checking for existing syllabus:', error);
      loadCourseData(courseCode, courseId);
    }
  };
  
  const loadExistingSyllabus = async (syllabusId) => {
    try {
      // Try to fetch from API first
      const apiSyllabus = await fetchSyllabusFromAPI(syllabusId);
      if (apiSyllabus) {
        console.log('Found existing syllabus in API:', apiSyllabus);
        setFormData(apiSyllabus);
        return;
      }
      
      // If not in API, check localStorage as fallback
      const savedNepSyllabuses = JSON.parse(localStorage.getItem('nepSyllabuses') || '[]');
      const existingSyllabus = savedNepSyllabuses.find(s => s.id === Number(syllabusId));
      
      if (existingSyllabus) {
        console.log('Found existing NEP syllabus in localStorage:', existingSyllabus);
        setFormData(existingSyllabus);
        return;
      }
      
      const savedSyllabuses = JSON.parse(localStorage.getItem('syllabuses') || '[]');
      const regularSyllabus = savedSyllabuses.find(s => s.id === Number(syllabusId));
      
      if (regularSyllabus) {
        console.log('Found existing regular syllabus in localStorage:', regularSyllabus);
        setFormData({...regularSyllabus, syllabusType: 'nep'});
      } else {
        console.error('Syllabus not found with ID:', syllabusId);
        alert('The requested syllabus could not be found.');
        navigate('/syllabusdashboard');
      }
    } catch (error) {
      console.error('Error loading existing syllabus:', error);
      setError('Error loading syllabus. Please try again.');
    }
  };

  const loadCourseData = (courseCode, courseId) => {
    try {
      // Try to find curriculum course data
      const savedCurriculums = JSON.parse(localStorage.getItem('curriculums') || '[]');
      let foundCourse = null;
      
      // Search through all curricula to find the course
      for (const curriculum of savedCurriculums) {
        for (const semester of curriculum.semesterData || []) {
          const course = semester.courses?.find(c => 
            c.code === courseCode && c.id === parseInt(courseId)
          );
          
          if (course) {
            foundCourse = course;
            // Also store semester information
            foundCourse.semesterName = semester.name;
            foundCourse.linkedCurriculumId = curriculum.id;
            break;
          }
        }
        if (foundCourse) break;
      }
      
      if (foundCourse) {
        const totalHours = (
          parseInt(foundCourse.lectureHours || 0) + 
          parseInt(foundCourse.tutorialHours || 0) + 
          parseInt(foundCourse.practicalHours || 0)
        ).toString();
        
        setFormData(prevData => ({
          ...prevData,
          courseCode: foundCourse.code,
          courseTitle: foundCourse.title,
          credits: foundCourse.credits?.toString() || "",
          semester: foundCourse.semesterName || "I",
          totalHours: totalHours,
          courseId: parseInt(courseId),
          isCourseLink: true,
          linkedCurriculumId: foundCourse.linkedCurriculumId,
          syllabusType: 'nep'
        }));
      }
    } catch (error) {
      console.error('Error loading course data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const renderComponent = () => {
    switch (currentStep) {
      case 0:
        return <CourseDetails formData={formData} handleInputChange={handleInputChange} />;
      case 1:
        return <CourseOutcomes formData={formData} setFormData={setFormData} />;
      case 2:
        return <UnitDetails 
          formData={formData} 
          setFormData={setFormData} 
          editingUnit={editingUnit}
          setEditingUnit={setEditingUnit}
        />;
      case 3:
        return <PracticalComponent formData={formData} setFormData={setFormData} />;
      case 4:
        return <ReferenceDetails 
          formData={formData} 
          setFormData={setFormData} 
          editingReference={editingReference}
          setEditingReference={setEditingReference}
        />;
      default:
        return null;
    }
  };

  const handlePrintPreview = () => {
    setShowPrintPreview(true);
  };

  const handleBackToEdit = () => {
    setShowPrintPreview(false);
  };

  const handleSave = async () => {
    try {
      await saveHandler();
      alert("Syllabus saved successfully!");
    } catch (error) {
      alert(`Error saving syllabus: ${error.message}`);
    }
  };
  
  const saveSyllabusToAPI = async (syllabusData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Format the data according to the Django model
      const formattedData = {
        id: syllabusData.id,
        courseCode: syllabusData.courseCode,
        courseTitle: syllabusData.courseTitle,
        credits: syllabusData.credits || "",
        semester: syllabusData.semester || "",
        totalHours: syllabusData.totalHours || "",
        category: syllabusData.category || "",
        prerequisites: syllabusData.prerequisites || "",
        year: syllabusData.year || "",
        internalMarks: syllabusData.internalMarks || "",
        endSemesterMarks: syllabusData.endSemesterMarks || "",
        durationTheory: syllabusData.durationTheory || "",
        durationPractical: syllabusData.durationPractical || "",
        outcomes: syllabusData.outcomes || [],
        units: syllabusData.units || [],
        practicalHours: parseInt(syllabusData.practicalHours) || 0,
        practicalExercises: syllabusData.practicalExercises || [],
        references: syllabusData.references || [],
        designedBy: syllabusData.designedBy || "",
        syllabusType: syllabusData.syllabusType || "nep",
        courseId: syllabusData.courseId || 0, // Default to 0 when null
        isCourseLink: syllabusData.isCourseLink || false,
        linkedCurriculumId: syllabusData.linkedCurriculumId || null,
        lastModified: new Date().toISOString(), // Proper DateTime format
        status: syllabusData.status || "Draft",
        showInDashboard: syllabusData.showInDashboard || true
      };
      
      // Determine if we're creating or updating
      // Create new syllabus with POST
    const response = await axios.post(
      SYLLABUS_ENDPOINT,
      formattedData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Syllabus created in API:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error saving syllabus to API:', error);
    setError('Failed to save syllabus to server.');
    throw new Error('API save failed.');
  } finally {
    setLoading(false);
  }
};

  
  const saveHandler = async () => {
    const savedNepSyllabuses = JSON.parse(localStorage.getItem('nepSyllabuses') || '[]');
    const savedSyllabuses = JSON.parse(localStorage.getItem('syllabuses') || '[]');
    
    // Check if we're editing an existing syllabus or creating a new one
    let syllabusId;
    
    // If ID is provided in URL params, use that
    if (id) {
      syllabusId = Number(id);
    } else {
      // Check if there's already a syllabus for this course
      const courseId = formData.courseId;
      const courseCode = formData.courseCode;
      
      if (courseId && courseCode) {
        // First check in NEP syllabuses
        const existingNepSyllabus = savedNepSyllabuses.find(s => 
          s.courseId === courseId && s.courseCode === courseCode
        );
        
        // Then check in regular syllabuses
        const existingRegularSyllabus = savedSyllabuses.find(s => 
          s.courseId === courseId && s.courseCode === courseCode
        );
        
        if (existingNepSyllabus) {
          syllabusId = existingNepSyllabus.id;
        } else if (existingRegularSyllabus) {
          syllabusId = existingRegularSyllabus.id;
          
          // Remove the existing regular syllabus as we're converting it to NEP
          const regularIndex = savedSyllabuses.findIndex(s => s.id === syllabusId);
          if (regularIndex >= 0) {
            savedSyllabuses.splice(regularIndex, 1);
            localStorage.setItem('syllabuses', JSON.stringify(savedSyllabuses));
          }
        } else {
          // Generate new ID for new syllabus
          syllabusId = Date.now();
        }
      } else {
        // Generate new ID for new syllabus without course link
        syllabusId = Date.now();
      }
    }
  
    let linkedCurriculumId = formData.linkedCurriculumId || null;
    
    // If this is a course from a curriculum and linkedCurriculumId isn't set
    if (!linkedCurriculumId && formData.courseId) {
      // Try to find the correct curriculum ID
      const savedCurriculums = JSON.parse(localStorage.getItem('curriculums') || '[]');
      for (const curriculum of savedCurriculums) {
        for (const semester of curriculum.semesterData || []) {
          const course = semester.courses?.find(c => 
            c.code === formData.courseCode && c.id === formData.courseId
          );
          if (course) {
            linkedCurriculumId = curriculum.id;
            break;
          }
        }
        if (linkedCurriculumId) break;
      }
    }
  
    const syllabus = {
      id: syllabusId,
      ...formData,
      lastModified: new Date().toISOString(), // Use full ISO string for proper datetime format
      status: formData.status || 'Draft',
      linkedCurriculumId,
      isCourseLink: Boolean(formData.courseId),
      showInDashboard: true,
      courseId: formData.courseId || 0, // Default to 0 when null
      courseCode: formData.courseCode,
      syllabusType: 'nep'
    };
    
    try {
      // Try to save to API first
      const apiResponse = await saveSyllabusToAPI(syllabus);
      
      if (apiResponse && apiResponse.id) {
        // API save was successful, update the syllabus ID from API response
        syllabus.id = apiResponse.id;
      }
    } catch (error) {
      console.error('API save failed, falling back to localStorage only:', error);
      // Continue with localStorage save as fallback
    }
    
    // Always save to localStorage as well (as backup and for offline functionality)
    const existingIndex = savedNepSyllabuses.findIndex(s => s.id === syllabusId);
    
    if (existingIndex >= 0) {
      savedNepSyllabuses[existingIndex] = syllabus;
    } else {
      savedNepSyllabuses.push(syllabus);
    }
  
    localStorage.setItem('nepSyllabuses', JSON.stringify(savedNepSyllabuses));
    
    // Navigate back to the syllabus dashboard
    navigate('/syllabusdashboard');
  };

  if (showPrintPreview) {
    return (
      <div>
        <PrintSyllabusNEP formData={formData} />
        <div className="mt-4 flex justify-between">
          <button 
            onClick={handleBackToEdit}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-green-600 mx-0.5"
          >
            Back to Edit
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
    <Navbar/>
    <div className="container mx-auto px-4 py-8">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg">Saving syllabus data...</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}
      
      <div className="bg-gradient-to-b from-emerald-50 to-teal-50 shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">NEP Syllabus Builder</h1>
        
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {[
              "Course Details",
              "Course Outcomes",
              "Unit Details",
              "Practical Component",
              "References"
            ].map((step, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`px-4 py-2 rounded ${
                  currentStep === index
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {step}
              </button>
            ))}
          </div>
        </div>

        {renderComponent()}

        <div className="flex justify-between mt-8">
          {currentStep > 0 && (
            <button
              onClick={prevStep}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              disabled={loading}
            >
              Previous
            </button>
            
          )}
          {currentStep < 4 ? (
            <button
              onClick={nextStep}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ml-auto"
              disabled={loading}
            >
              Next
            </button>
          ) : (
            <div className="flex ml-auto">
              {/* <button
                onClick={handleSave}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mr-2"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button> */}
              <button onClick={() => {
  if (window.confirm('Are you sure you want to delete this syllabus?')) {
    deleteSyllabusFromAPI(formData.id);
  }
}} className="bg-red-400 text-white py-2 px-4 rounded hover:bg-red-600 mr-2" disabled={!formData.id}>
  Delete Syllabus
</button>
{formData.id ? (
  <button onClick={handleUpdate} disabled={loading}  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mr-2">
    Update
  </button>
) : (
  <button onClick={handleSave} disabled={loading}  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mr-2">
    Save
  </button>
)}
              <button
                onClick={handlePrintPreview}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                disabled={loading}
              >
                Preview
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default SyllabusFormNEP;