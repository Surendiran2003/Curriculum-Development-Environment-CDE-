// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios'; // Import axios
// import CourseDetails from "./CourseDetails";
// import CourseOutcomes from "./CourseOutcomes";
// import UnitDetails from "./UnitDetails";
// import PracticalComponent from "./PracticalComponent";
// import ReferenceDetails from "./ReferenceDetails";
// import PrintSyllabusNEP from "./PrintSyllabusNEP";
// import Navbar from "../Navbar";

// // API configuration
// const API_BASE_URL = 'http://localhost:8000'; // Change this to your actual API base URL
// const SYLLABUS_ENDPOINT = `${API_BASE_URL}/syllabuses/`;

// const SyllabusFormNEP = () => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [showPrintPreview, setShowPrintPreview] = useState(false);
//   const [editingUnit, setEditingUnit] = useState(null);
//   const [editingReference, setEditingReference] = useState(null);
//   const [loading, setLoading] = useState(false); // Loading state for API operations
//   const [error, setError] = useState(null); // Error state for API operations

//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [formData, setFormData] = useState({
//     courseCode: "CSCS101",
//     courseTitle: "Digital Logic Fundamentals",
//     credits: "",
//     semester: "",
//     totalHours: "",
//     category: "",
//     prerequisites: "NIL",
//     year: "I",
//     internalMarks: "40",
//     endSemesterMarks: "60",
//     durationTheory: "03 hrs.",
//     durationPractical: "03 hrs.",
//     outcomes: [
//       "Understand the principles of digital systems and binary number operations",
//       "Apply Karnaugh mapping to simplify Boolean expressions and optimize digital circuits",
//       "Analyze and design basic combinational circuits",
//       "Synthesize and evaluate synchronous sequential circuits using storage elements and HDL",
//       "Design and implement various types of registers and counters using HDL"
//     ],
//     units: [
//       {
//         id: 1,
//         number: "I",
//         title: "Introduction",
//         content: "Digital Systems – Binary Numbers – Conversions – Types – Codes – Storage and Registers – Binary Logic – Boolean Algebra – Theorems and Properties – Functions – Canonical and Standard Forms – Other Logic Operations – Digital Logic Gates – Integrated Circuits",
//         hours: 9
//       },
//       {
//         id: 2,
//         number: "II",
//         title: "Gate‐Level Minimization",
//         content: "Map Method – Four‐Variable KMap – Product‐of‐Sums Simplification – Don't‐Care Conditions – NAND and NOR Implementation – Other Two‐Level Implementations – Exclusive‐OR Function – Hardware Description Language",
//         hours: 9
//       },
//       {
//         id: 3,
//         number: "III",
//         title: "Combinational Logic",
//         content: "Analysis Procedure – Design Procedure – Binary Adder– Subtractor – Decimal Adder – Binary Multiplier – Magnitude Comparator – Decoders – Encoders – Multiplexers – HDL Models of Combinational Circuits",
//         hours: 9
//       },
//       {
//         id: 4,
//         number: "IV",
//         title: "Synchronous Sequential Logic",
//         content: "Storage Elements – Latches – Flip‐Flops – Analysis of Clocked Sequential Circuits – Synthesizable HDL Models of Sequential Circuits – State Reduction and Assignment – Design Procedure",
//         hours: 9
//       },
//       {
//         id: 5,
//         number: "V",
//         title: "Registers and Counters",
//         content: "Registers – Shift Registers – Ripple Counters – Synchronous Counters – Other Counters – HDL for Registers and Counters",
//         hours: 9
//       }
//     ],
//     practicalHours: 30,
//     practicalExercises: [
//       "Binary to Decimal and viceversa",
//       "Decimal to Hexadecimal and ViceVersa",
//       "Digital Logic Gates",
//       "Simplification of Boolean Functions",
//       "Combinational Logic Circuits: i. Code Converters ii. Arithmetic (Adders, Subtractors, Multipliers, Comparators) iii. Data Handling (Multiplexers, Demultiplexers, Encoders & Decoders)",
//       "Combinational Logic Circuit Design",
//       "Binary AdderSubtractor Simulation",
//       "Decimal Adder Simulation",
//       "Binary Multiplier Simulation",
//       "Sequential Circuit Storage Elements: FlipFlop Simulation"
//     ],
//     references: [
//       {
//         id: 1,
//         author: "M. Morris Mano, Michael D. Ciletti",
//         title: "Digital design With an Introduction to the Verilog HDL",
//         publisher: "Pearson",
//         year: "Sixth Edition, 2018"
//       },
//       {
//         id: 2,
//         author: "M. Rafiquzzaman",
//         title: "Fundamentals of Digital Logic and Microcomputer Design",
//         publisher: "John Wiley & Sons, Inc.",
//         year: "Fifth Edition, 2009"
//       }
//     ],
//     designedBy: "Dr. ,  Professor, PUDoCS",
//     syllabusType: 'nep'
//   });

//   useEffect(() => {
//     const queryParams = new URLSearchParams(location.search);
//     const courseCode = queryParams.get('courseCode');
//     const courseId = queryParams.get('courseId');
    
//     // Check if we're editing an existing syllabus by ID
//     if (id) {
//       loadExistingSyllabus(id);
//     }
//     // Or if we're creating a syllabus from a course
//     else if (courseCode && courseId) {
//       checkForExistingSyllabus(courseCode, parseInt(courseId));
//     }
//   }, [location, id]);
  
//   // Function to fetch syllabus from API
//   const fetchSyllabusFromAPI = async (syllabusId) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await axios.get(`${SYLLABUS_ENDPOINT}${syllabusId}/`);
//       if (response.data) {
//         return response.data;
//       }
//       return null;
//     } catch (error) {
//       console.error('Error fetching syllabus from API:', error);
//       setError('Failed to fetch syllabus from server. Falling back to local storage.');
//       return null;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to check if syllabus exists in API
//   const checkSyllabusExistsInAPI = async (courseCode, courseId) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await axios.get(`${SYLLABUS_ENDPOINT}?courseCode=${courseCode}&courseId=${courseId}`);
//       if (response.data && response.data.length > 0) {
//         return response.data[0]; // Return the first matching syllabus
//       }
//       return null;
//     } catch (error) {
//       console.error('Error checking syllabus in API:', error);
//       setError('Failed to check syllabus on server. Falling back to local storage.');
//       return null;
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   const checkForExistingSyllabus = async (courseCode, courseId) => {
//     try {
//       // Try to fetch from API first
//       const apiSyllabus = await checkSyllabusExistsInAPI(courseCode, courseId);
//       if (apiSyllabus) {
//         navigate(`/syllabus-new/${apiSyllabus.id}`);
//         return;
//       }
      
//       // If not in API, check localStorage as fallback
//       const savedNepSyllabuses = JSON.parse(localStorage.getItem('nepSyllabuses') || '[]');
//       let existingSyllabus = savedNepSyllabuses.find(s => 
//         s.courseCode === courseCode && s.courseId === courseId
//       );
      
//       if (!existingSyllabus) {
//         const savedSyllabuses = JSON.parse(localStorage.getItem('syllabuses') || '[]');
//         existingSyllabus = savedSyllabuses.find(s => 
//           s.courseCode === courseCode && s.courseId === courseId
//         );
//       }
      
//       if (existingSyllabus) {
//         navigate(`/syllabus-new/${existingSyllabus.id}`);
//         return;
//       }
      
//       // If no existing syllabus found, load course data
//       loadCourseData(courseCode, courseId);
//     } catch (error) {
//       console.error('Error checking for existing syllabus:', error);
//       loadCourseData(courseCode, courseId);
//     }
//   };
  
//   const loadExistingSyllabus = async (syllabusId) => {
//     try {
//       // Try to fetch from API first
//       const apiSyllabus = await fetchSyllabusFromAPI(syllabusId);
//       if (apiSyllabus) {
//         console.log('Found existing syllabus in API:', apiSyllabus);
//         setFormData(apiSyllabus);
//         return;
//       }
      
//       // If not in API, check localStorage as fallback
//       const savedNepSyllabuses = JSON.parse(localStorage.getItem('nepSyllabuses') || '[]');
//       const existingSyllabus = savedNepSyllabuses.find(s => s.id === Number(syllabusId));
      
//       if (existingSyllabus) {
//         console.log('Found existing NEP syllabus in localStorage:', existingSyllabus);
//         setFormData(existingSyllabus);
//         return;
//       }
      
//       const savedSyllabuses = JSON.parse(localStorage.getItem('syllabuses') || '[]');
//       const regularSyllabus = savedSyllabuses.find(s => s.id === Number(syllabusId));
      
//       if (regularSyllabus) {
//         console.log('Found existing regular syllabus in localStorage:', regularSyllabus);
//         setFormData({...regularSyllabus, syllabusType: 'nep'});
//       } else {
//         console.error('Syllabus not found with ID:', syllabusId);
//         alert('The requested syllabus could not be found.');
//         navigate('/syllabusdashboard');
//       }
//     } catch (error) {
//       console.error('Error loading existing syllabus:', error);
//       setError('Error loading syllabus. Please try again.');
//     }
//   };

//   const loadCourseData = (courseCode, courseId) => {
//     try {
//       // Try to find curriculum course data
//       const savedCurriculums = JSON.parse(localStorage.getItem('curriculums') || '[]');
//       let foundCourse = null;
      
//       // Search through all curricula to find the course
//       for (const curriculum of savedCurriculums) {
//         for (const semester of curriculum.semesterData || []) {
//           const course = semester.courses?.find(c => 
//             c.code === courseCode && c.id === parseInt(courseId)
//           );
          
//           if (course) {
//             foundCourse = course;
//             // Also store semester information
//             foundCourse.semesterName = semester.name;
//             foundCourse.linkedCurriculumId = curriculum.id;
//             break;
//           }
//         }
//         if (foundCourse) break;
//       }
      
//       if (foundCourse) {
//         const totalHours = (
//           parseInt(foundCourse.lectureHours || 0) + 
//           parseInt(foundCourse.tutorialHours || 0) + 
//           parseInt(foundCourse.practicalHours || 0)
//         ).toString();
        
//         setFormData(prevData => ({
//           ...prevData,
//           courseCode: foundCourse.code,
//           courseTitle: foundCourse.title,
//           credits: foundCourse.credits?.toString() || "",
//           semester: foundCourse.semesterName || "I",
//           totalHours: totalHours,
//           courseId: parseInt(courseId),
//           isCourseLink: true,
//           linkedCurriculumId: foundCourse.linkedCurriculumId,
//           syllabusType: 'nep'
//         }));
//       }
//     } catch (error) {
//       console.error('Error loading course data:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const nextStep = () => setCurrentStep(currentStep + 1);
//   const prevStep = () => setCurrentStep(currentStep - 1);

//   const renderComponent = () => {
//     switch (currentStep) {
//       case 0:
//         return <CourseDetails formData={formData} handleInputChange={handleInputChange} />;
//       case 1:
//         return <CourseOutcomes formData={formData} setFormData={setFormData} />;
//       case 2:
//         return <UnitDetails 
//           formData={formData} 
//           setFormData={setFormData} 
//           editingUnit={editingUnit}
//           setEditingUnit={setEditingUnit}
//         />;
//       case 3:
//         return <PracticalComponent formData={formData} setFormData={setFormData} />;
//       case 4:
//         return <ReferenceDetails 
//           formData={formData} 
//           setFormData={setFormData} 
//           editingReference={editingReference}
//           setEditingReference={setEditingReference}
//         />;
//       default:
//         return null;
//     }
//   };

//   const handlePrintPreview = () => {
//     setShowPrintPreview(true);
//   };

//   const handleBackToEdit = () => {
//     setShowPrintPreview(false);
//   };

//   const handleSave = async () => {
//     try {
//       await saveHandler();
//       alert("Syllabus saved successfully!");
//     } catch (error) {
//       alert(`Error saving syllabus: ${error.message}`);
//     }
//   };
  
//   // Function to save syllabus to API
//   const saveSyllabusToAPI = async (syllabusData) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       // Determine if we're creating or updating
//       if (syllabusData.id && !isNaN(syllabusData.id)) {
//         // Update existing syllabus
//         const response = await axios.post(
//           `${SYLLABUS_ENDPOINT}`, 
//           syllabusData
//         );
//         console.log('Syllabus updated in API:', response.data);
//         return response.data;
//       } else {
//         // Create new syllabus
//         const response = await axios.post(SYLLABUS_ENDPOINT, syllabusData);
//         console.log('Syllabus created in API:', response.data);
//         return response.data;
//       }
//     } catch (error) {
//       console.error('Error saving syllabus to API:', error);
//       setError('Failed to save syllabus to server. Saved to local storage as fallback.');
//       throw new Error('API save failed. Saved to localStorage as fallback.');
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   const saveHandler = async () => {
//     const savedNepSyllabuses = JSON.parse(localStorage.getItem('nepSyllabuses') || '[]');
//     const savedSyllabuses = JSON.parse(localStorage.getItem('syllabuses') || '[]');
    
//     // Check if we're editing an existing syllabus or creating a new one
//     let syllabusId;
    
//     // If ID is provided in URL params, use that
//     if (id) {
//       syllabusId = Number(id);
//     } else {
//       // Check if there's already a syllabus for this course
//       const courseId = formData.courseId;
//       const courseCode = formData.courseCode;
      
//       if (courseId && courseCode) {
//         // First check in NEP syllabuses
//         const existingNepSyllabus = savedNepSyllabuses.find(s => 
//           s.courseId === courseId && s.courseCode === courseCode
//         );
        
//         // Then check in regular syllabuses
//         const existingRegularSyllabus = savedSyllabuses.find(s => 
//           s.courseId === courseId && s.courseCode === courseCode
//         );
        
//         if (existingNepSyllabus) {
//           syllabusId = existingNepSyllabus.id;
//         } else if (existingRegularSyllabus) {
//           syllabusId = existingRegularSyllabus.id;
          
//           // Remove the existing regular syllabus as we're converting it to NEP
//           const regularIndex = savedSyllabuses.findIndex(s => s.id === syllabusId);
//           if (regularIndex >= 0) {
//             savedSyllabuses.splice(regularIndex, 1);
//             localStorage.setItem('syllabuses', JSON.stringify(savedSyllabuses));
//           }
//         } else {
//           // Generate new ID for new syllabus
//           syllabusId = Date.now();
//         }
//       } else {
//         // Generate new ID for new syllabus without course link
//         syllabusId = Date.now();
//       }
//     }
  
//     let linkedCurriculumId = formData.linkedCurriculumId || null;
    
//     // If this is a course from a curriculum and linkedCurriculumId isn't set
//     if (!linkedCurriculumId && formData.courseId) {
//       // Try to find the correct curriculum ID
//       const savedCurriculums = JSON.parse(localStorage.getItem('curriculums') || '[]');
//       for (const curriculum of savedCurriculums) {
//         for (const semester of curriculum.semesterData || []) {
//           const course = semester.courses?.find(c => 
//             c.code === formData.courseCode && c.id === formData.courseId
//           );
//           if (course) {
//             linkedCurriculumId = curriculum.id;
//             break;
//           }
//         }
//         if (linkedCurriculumId) break;
//       }
//     }
  
//     const syllabus = {
//       id: syllabusId,
//       ...formData,
//       lastModified: new Date().toISOString().split('T')[0],
//       status: formData.status || 'Draft',
//       linkedCurriculumId,
//       isCourseLink: Boolean(formData.courseId),
//       showInDashboard: true,
//       courseId: formData.courseId || null,
//       courseCode: formData.courseCode,
//       syllabusType: 'nep'
//     };
    
//     try {
//       // Try to save to API first
//       const apiResponse = await saveSyllabusToAPI(syllabus);
      
//       if (apiResponse && apiResponse.id) {
//         // API save was successful, update the syllabus ID from API response
//         syllabus.id = apiResponse.id;
//       }
//     } catch (error) {
//       console.error('API save failed, falling back to localStorage only:', error);
//       // Continue with localStorage save as fallback
//     }
    
//     // Always save to localStorage as well (as backup and for offline functionality)
//     const existingIndex = savedNepSyllabuses.findIndex(s => s.id === syllabusId);
    
//     if (existingIndex >= 0) {
//       savedNepSyllabuses[existingIndex] = syllabus;
//     } else {
//       savedNepSyllabuses.push(syllabus);
//     }
  
//     localStorage.setItem('nepSyllabuses', JSON.stringify(savedNepSyllabuses));
    
//     // Navigate back to the syllabus dashboard
//     navigate('/syllabusdashboard');
//   };

//   if (showPrintPreview) {
//     return (
//       <div>
//         <PrintSyllabusNEP formData={formData} />
//         <div className="mt-4 flex justify-between">
//           <button 
//             onClick={handleBackToEdit}
//             className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-green-600 mx-0.5"
//           >
//             Back to Edit
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//     <Navbar/>
//     <div className="container mx-auto px-4 py-8">
//       {loading && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <p className="text-lg">Saving syllabus data...</p>
//           </div>
//         </div>
//       )}
      
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           <p>{error}</p>
//         </div>
//       )}
      
//       <div className="bg-gradient-to-b from-emerald-50 to-teal-50 shadow-md rounded-lg p-6">
//         <h1 className="text-2xl font-bold mb-6 text-center">NEP Syllabus Builder</h1>
        
//         <div className="mb-8">
//           <div className="flex justify-between mb-4">
//             {[
//               "Course Details",
//               "Course Outcomes",
//               "Unit Details",
//               "Practical Component",
//               "References"
//             ].map((step, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentStep(index)}
//                 className={`px-4 py-2 rounded ${
//                   currentStep === index
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-200 text-gray-700"
//                 }`}
//               >
//                 {step}
//               </button>
//             ))}
//           </div>
//         </div>

//         {renderComponent()}

//         <div className="flex justify-between mt-8">
//           {currentStep > 0 && (
//             <button
//               onClick={prevStep}
//               className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
//               disabled={loading}
//             >
//               Previous
//             </button>
//           )}
//           {currentStep < 4 ? (
//             <button
//               onClick={nextStep}
//               className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ml-auto"
//               disabled={loading}
//             >
//               Next
//             </button>
//           ) : (
//             <div className="flex ml-auto">
//               <button
//                 onClick={handleSave}
//                 className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mr-2"
//                 disabled={loading}
//               >
//                 {loading ? "Saving..." : "Save"}
//               </button>
//               <button
//                 onClick={handlePrintPreview}
//                 className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//                 disabled={loading}
//               >
//                 Preview
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default SyllabusFormNEP;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import CourseDetails from "./CourseDetails";
import CourseOutcomes from "./CourseOutcomes";
import UnitDetails from "./UnitDetails";
import PracticalComponent from "./PracticalComponent";
import ReferenceDetails from "./ReferenceDetails";
import PrintSyllabusNEP from "./PrintSyllabusNEP";
import Navbar from "../Navbar";

const SyllabusFormNEP = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [editingUnit, setEditingUnit] = useState(null);
  const [editingReference, setEditingReference] = useState(null);

  const { id } = useParams(); // Use id parameter directly
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
    syllabusType: 'nep' // Add this to ensure proper identification
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
  
  const checkForExistingSyllabus = (courseCode, courseId) => {
    try {
      // First check in nepSyllabuses
      const savedNepSyllabuses = JSON.parse(localStorage.getItem('nepSyllabuses') || '[]');
      let existingSyllabus = savedNepSyllabuses.find(s => 
        s.courseCode === courseCode && s.courseId === courseId
      );
      
      // If not found in NEP syllabuses, check in regular syllabuses
      if (!existingSyllabus) {
        const savedSyllabuses = JSON.parse(localStorage.getItem('syllabuses') || '[]');
        existingSyllabus = savedSyllabuses.find(s => 
          s.courseCode === courseCode && s.courseId === courseId
        );
      }
      
      if (existingSyllabus) {
        // If found, redirect to edit page
        navigate(`/syllabus-new/${existingSyllabus.id}`);
        return;
      }
      
      // If no existing syllabus found, load course data
      loadCourseData(courseCode, courseId);
    } catch (error) {
      console.error('Error checking for existing syllabus:', error);
      // Continue with loading course data as fallback
      loadCourseData(courseCode, courseId);
    }
  };
  
  const loadExistingSyllabus = (syllabusId) => {
    try {
      // First check in nepSyllabuses
      const savedNepSyllabuses = JSON.parse(localStorage.getItem('nepSyllabuses') || '[]');
      const existingSyllabus = savedNepSyllabuses.find(s => s.id === Number(syllabusId));
      
      if (existingSyllabus) {
        console.log('Found existing NEP syllabus:', existingSyllabus);
        setFormData(existingSyllabus);
        return;
      }
      
      // If not found in nepSyllabuses, check in regular syllabuses
      const savedSyllabuses = JSON.parse(localStorage.getItem('syllabuses') || '[]');
      const regularSyllabus = savedSyllabuses.find(s => s.id === Number(syllabusId));
      
      if (regularSyllabus) {
        console.log('Found existing regular syllabus:', regularSyllabus);
        setFormData({...regularSyllabus, syllabusType: 'nep'});
      } else {
        console.error('Syllabus not found with ID:', syllabusId);
        alert('The requested syllabus could not be found.');
        navigate('/syllabusdashboard');
      }
    } catch (error) {
      console.error('Error loading existing syllabus:', error);
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

  const handleSave = () => {
    saveHandler();
    alert("Syllabus saved successfully!");
  };
  
  const saveHandler = () => {
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
      lastModified: new Date().toISOString().split('T')[0],
      status: formData.status || 'Draft',
      linkedCurriculumId,
      isCourseLink: Boolean(formData.courseId),
      showInDashboard: true,
      courseId: formData.courseId || null,
      courseCode: formData.courseCode,
      syllabusType: 'nep'
    };
    
    // Check if we're updating an existing syllabus
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
            >
              Previous
            </button>
          )}
          {currentStep < 4 ? (
            <button
              onClick={nextStep}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ml-auto"
            >
              Next
            </button>
          ) : (
            <div className="flex ml-auto">
              <button
                onClick={handleSave}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mr-2"
              >
                Save
              </button>
              <button
                onClick={handlePrintPreview}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
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


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

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

  // Load saved syllabuses from localStorage on component mount
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

  const loadSyllabuses = () => {
    setIsLoading(true);
    try {
      // Load both types of syllabuses
      const regularSyllabuses = JSON.parse(localStorage.getItem('syllabuses') || '[]');
      const nepSyllabuses = JSON.parse(localStorage.getItem('nepSyllabuses') || '[]');
      
      // Add a type indicator for UI differentiation
      const markedRegularSyllabuses = regularSyllabuses.map(s => ({
        ...s,
        syllabusType: 'regular'
      }));
      
      const markedNepSyllabuses = nepSyllabuses.map(s => ({
        ...s,
        syllabusType: 'nep'
      }));
      
      // Combine and filter syllabuses
      const allSyllabuses = [...markedRegularSyllabuses, ...markedNepSyllabuses];
      
      // Filter out course-linked syllabuses that shouldn't appear on dashboard
      const filteredSyllabuses = allSyllabuses.filter(syllabus => 
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

  // Delete a syllabus
  const handleDelete = (e, id, type) => {
    e.stopPropagation(); // Prevent navigation to the syllabus editor
    
    const confirmMessage = type === 'curriculum' 
      ? 'Are you sure you want to remove this curriculum link?' 
      : 'Are you sure you want to delete this syllabus?';
    
    if (window.confirm(confirmMessage)) {
      try {
        const storageKey = syllabus => {
          if (syllabus.syllabusType === 'nep') return 'nepSyllabuses';
          return 'syllabuses';
        };
        
        // Find which storage the syllabus belongs to
        const targetSyllabus = syllabuses.find(s => s.id === id);
        const key = storageKey(targetSyllabus);
        
        // Get syllabuses from localStorage
        const savedSyllabuses = JSON.parse(localStorage.getItem(key) || '[]');
        
        // Remove the syllabus with the given id
        const updatedSyllabuses = savedSyllabuses.filter(s => s.id !== id);
        
        // Save back to localStorage
        localStorage.setItem(key, JSON.stringify(updatedSyllabuses));
        
        // Update state to reflect changes
        loadSyllabuses(); // Reload all syllabuses
        
        const message = type === 'curriculum' 
          ? 'Curriculum link removed successfully!' 
          : 'Syllabus deleted successfully!';
        
        showToast(message);
      } catch (error) {
        console.error('Error deleting syllabus:', error);
        showToast('Failed to delete syllabus', 'error');
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
      <div className="flex flex-wrap justify-center gap-4">

      </div>
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