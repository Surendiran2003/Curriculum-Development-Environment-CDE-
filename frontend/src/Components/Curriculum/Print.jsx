import React, { useState } from 'react';
import { mockCoursesData, componentNameMap } from './mockData';
import PrintSyllabusNEP from './PrintSyllabusNEP';

const Print = ({ frontPageData, semesterData, logoImage, regulationsPdfUrl }) => {
  // Add this function to get detailed course data
  const getDetailedCourseData = (course) => {
    // Find the full course details from mockCoursesData
    const detailedCourse = mockCoursesData.find(
      mockCourse => mockCourse.courseCode === course.code || mockCourse.courseCode === course.courseCode
    );
    
    if (detailedCourse) {
      // Merge the data, prioritizing course data but adding syllabus from mockData
      return {
        ...course,
        syllabus: detailedCourse.syllabus || course.syllabus || {}
      };
    }
    
    return course;
  };

  // Print function that opens content in a new window
  const handlePrint = () => {
    console.log("Print button clicked");
    
    // Get the printable content
    const printContent = document.querySelector('.print-container').innerHTML;
    
    // Open a new window with just the printable content
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    printWindow.document.write(`
      <html>
        <head>
          <title>${frontPageData?.programName || 'Curriculum'} - Print</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: white;
            }
            
            /* Main container */
            .print-container {
              background-color: white;
            }
            
            /* Page styles */
            .page {
              page-break-after: always;
              margin-bottom: 30px;
              padding: 15mm;
            }
            
            .page:last-child {
              page-break-after: avoid;
            }
            
            /* Front page specially centered */
            .front-page {
              height: 100vh;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              text-align: center;
              position: relative;
              padding: 30px 15mm;
            }
            
            .front-page-content {
              display: flex;
              flex-direction: column;
              align-items: center;
              width: 100%;
              max-width: 500px;
            }
            
            .front-page-logo {
              width: 120px;
              height: 120px;
              object-fit: contain;
              margin-top: 30px;
            }
            
            /* Table styles */
            table {
              width: 100%;
              border-collapse: collapse;
              page-break-inside: avoid;
              margin-bottom: 30px;
            }
            
            th, td {
              border: 1px solid #ccc;
              padding: 8px;
              text-align: center;
            }
            
            th {
              background-color: #f2f2f2;
              font-weight: bold;
            }
            
            tr:nth-child(even) {
              background-color: #f9f9f9;
            }
            
            /* Table heading as part of table */
            .table-heading {
              background-color: #e6e6e6;
              font-weight: bold;
              text-align: left;
              font-size: 1.1em;
              padding: 10px;
            }
            
            /* Syllabus cover page */
            .syllabus-cover {
              height: 90vh; /* Reduce height to avoid empty space */
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              text-align: center;
              position: relative;
            }
            
            /* Reference table styles */
            .reference-table {
              margin-top: 20px;
              margin-bottom: 40px;
            }
            
            /* Text styles */
            .text-center { text-align: center; }
            .mb-2 { margin-bottom: 0.5rem; }
            .mb-3 { margin-bottom: 0.75rem; }
            .mb-4 { margin-bottom: 1rem; }
            .mb-6 { margin-bottom: 1.5rem; }
            .mt-2 { margin-top: 0.5rem; }
            .mt-4 { margin-top: 1rem; }
            .mt-6 { margin-top: 1.5rem; }
            .mt-8 { margin-top: 2rem; }
            .font-bold { font-weight: bold; }
            .text-3xl { font-size: 1.875rem; }
            .text-2xl { font-size: 1.5rem; }
            .text-xl { font-size: 1.25rem; }
            .text-lg { font-size: 1.125rem; }
            .break-words { word-wrap: break-word; }
            
            /* Print media styles */
            @media print {
              @page {
                size: A4 portrait;
                margin: 15mm;
              }
              
              body { 
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
                background: white;
              }
              
              .page {
                height: auto;
                min-height: 0;
              }
              
              .front-page {
                height: auto;
                min-height: calc(100vh - 30mm);
              }
              
              .syllabus-cover {
                min-height: 80vh;
              }
            }
            
            .page-break {
              page-break-before: always;
            }
            
            .syllabus-table {
              border-collapse: collapse;
              width: 100%;
              border: 2px solid black;
              margin-top: 20px;
              margin-bottom: 40px;
            }
            
            .syllabus-table tr {
              page-break-inside: avoid;
              border: 1px solid black;
            }
            
            .syllabus-table td,
            .syllabus-table th {
              border: 1px solid black;
              padding: 8px;
              vertical-align: top;
              box-shadow: inset 0px 0px 0px 1px black;
              outline: 1px solid black;
            }
            
            .gray-bg {
              background-color: #e0e0e0;
            }
            
            @media print {
              .page-break {
                page-break-before: always;
              }
              
              .gray-bg {
                background-color: #e0e0e0 !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                color-adjust: exact !important;
              }
            }
            
            /* Add these styles to your CSS */
            .page-break-before {
              page-break-before: always;
            }

            .page-break-after {
              page-break-after: always;
            }

            .syllabus-cover {
              height: 100vh;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              text-align: center;
              position: relative;
            }

            @media print {
              .page-break-before {
                page-break-before: always;
              }
              
              .page-break-after {
                page-break-after: always;
              }
              
              .syllabus-cover {
                min-height: 90vh;
              }
            }
          </style>
        </head>
        <body>
          <div class="print-container">
            ${printContent}
          </div>
          <script>
            // Auto-print when loaded
            window.onload = function() {
              window.print();
              // Optional: close the window after printing
              // window.setTimeout(function() { window.close(); }, 500);
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Get component display name helper function
  const getComponentDisplayName = (componentCode) => {
    if (!componentCode) return '';
    const [prefix, number] = componentCode.split(' ');
    return `${componentNameMap[prefix] || prefix} ${number || ''}`;
  };
  
  // Calculate totals helpers
  const calculateTotalCredits = (semesterIndex) => {
    if (!semesterData?.[semesterIndex]?.courses) return 0;
    return semesterData[semesterIndex].courses.reduce((total, course) => 
      total + (parseInt(course.credits) || 0), 0);
  };
  
  const calculateTotalLectureHours = (semesterIndex) => {
    if (!semesterData?.[semesterIndex]?.courses) return 0;
    return semesterData[semesterIndex].courses.reduce((total, course) => 
      total + (parseInt(course.lectureHours) || 0), 0);
  };
  
  const calculateTotalTutorialHours = (semesterIndex) => {
    if (!semesterData?.[semesterIndex]?.courses) return 0;
    return semesterData[semesterIndex].courses.reduce((total, course) => 
      total + (parseInt(course.tutorialHours) || 0), 0);
  };
  
  const calculateTotalPracticalHours = (semesterIndex) => {
    if (!semesterData?.[semesterIndex]?.courses) return 0;
    return semesterData[semesterIndex].courses.reduce((total, course) => 
      total + (parseInt(course.practicalHours) || 0), 0);
  };
  
  // Render semester reference table
  const renderReferenceTable = (semester, semIndex) => {
    if (!semester.courses || semester.courses.length === 0) {
      return null;
    }
    
    return (
      <table className="w-full border-collapse border border-gray-300 reference-table">
        <thead>
          <tr>
            <th colSpan="6" className="table-heading text-left px-4 py-3">
              {semester.name} - Reference Books
            </th>
          </tr>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-3 py-2 text-center font-bold">S.No</th>
            <th className="border border-gray-300 px-3 py-2 text-center font-bold">Course Code</th>
            <th className="border border-gray-300 px-3 py-2 text-center font-bold">Course Title</th>
            <th className="border border-gray-300 px-3 py-2 text-center font-bold">Author</th>
            <th className="border border-gray-300 px-3 py-2 text-center font-bold">Title</th>
            <th className="border border-gray-300 px-3 py-2 text-center font-bold">Publisher</th>
          </tr>
        </thead>
        <tbody>
          {semester.courses.map((course, idx) => {
            const references = course.syllabus?.references || [];
            
            if (references.length === 0) {
              return (
                <tr key={`ref-${course.id}`}>
                  <td className="border border-gray-300 px-3 py-2 text-center">{idx + 1}</td>
                  <td className="border border-gray-300 px-3 py-2 text-center">{course.code}</td>
                  <td className="border border-gray-300 px-3 py-2">{course.title}</td>
                  <td className="border border-gray-300 px-3 py-2 text-center" colSpan="3">
                    No reference books specified
                  </td>
                </tr>
              );
            }
            
            return references.map((ref, refIdx) => (
              <tr key={`ref-${course.id}-${refIdx}`} className={(idx + refIdx) % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border border-gray-300 px-3 py-2 text-center">{refIdx === 0 ? idx + 1 : ''}</td>
                <td className="border border-gray-300 px-3 py-2 text-center">{refIdx === 0 ? course.code : ''}</td>
                <td className="border border-gray-300 px-3 py-2">{refIdx === 0 ? course.title : ''}</td>
                <td className="border border-gray-300 px-3 py-2">{ref.author || ''}</td>
                <td className="border border-gray-300 px-3 py-2">{ref.title || ''}</td>
                <td className="border border-gray-300 px-3 py-2">{ref.publisher || ''} {ref.year ? `(${ref.year})` : ''}</td>
              </tr>
            ));
          })}
        </tbody>
      </table>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="mb-6 flex justify-between items-center border-b pb-4">
        <h2 className="text-xl font-semibold">Print Curriculum</h2>
        
        <button 
          onClick={handlePrint}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none"
        >
          Print Document
        </button>
      </div>
      
      <div className="bg-gray-100 p-6 rounded-lg mb-4">
        <h3 className="text-lg font-medium mb-2">Printing Instructions:</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Click the "Print Document" button above</li>
          <li>A new window will open with your document</li>
          <li>The print dialog will appear automatically</li>
          <li>Select "Save as PDF" if you want a PDF file</li>
          <li>Make sure paper size is set to A4</li>
        </ol>
      </div>
      
      {/* Updated CSS to fix alignment in preview */}
      <style>
        {`
          .print-preview {
            background-color: #f8f9fa;
            border-radius: 0.5rem;
            padding: 1rem;
          }
          
          .print-container {
            background-color: white;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            max-width: 210mm;
            margin: 0 auto;
          }
          
          .page {
            padding: 15mm;
            margin-bottom: 30px;
            border-bottom: 1px dashed #ddd;
          }
          
          .front-page {
            height: 297mm;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            position: relative;
          }
          
          .front-page-content {
            width: 80%;
            max-width: 500px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          
          .front-page-logo {
            width: 120px;
            height: 120px;
            object-fit: contain;
            margin-top: 20px;
          }
          
          .table-heading {
            background-color: #e6e6e6;
            font-weight: bold;
            text-align: left;
            font-size: 1.1em;
            padding: 10px;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
          }
          
          th, td {
            border: 1px solid #ccc;
            padding: 8px;
            text-align: center;
          }
          
          .page-break {
            page-break-before: always;
          }
          
          .syllabus-table {
            border-collapse: collapse;
            width: 100%;
            border: 2px solid black;
            margin-top: 20px;
            margin-bottom: 40px;
          }
          
          .syllabus-table tr {
            page-break-inside: avoid;
            border: 1px solid black;
          }
          
          .syllabus-table td,
          .syllabus-table th {
            border: 1px solid black;
            padding: 8px;
            vertical-align: top;
            box-shadow: inset 0px 0px 0px 1px black;
            outline: 1px solid black;
          }
          
          .gray-bg {
            background-color: #e0e0e0;
          }
          
          .syllabus-cover {
            height: 90vh; /* Reduce height to avoid empty space */
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            position: relative;
          }
          
          @media print {
            .page-break {
              page-break-before: always;
            }
            
            .gray-bg {
              background-color: #e0e0e0 !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
            
            .syllabus-cover {
              min-height: 80vh;
            }
          }
          
          .reference-table {
            margin-top: 20px;
            margin-bottom: 40px;
          }

          /* Add these styles to your CSS */
          .page-break-before {
            page-break-before: always;
          }

          .page-break-after {
            page-break-after: always;
          }

          .syllabus-cover {
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            position: relative;
          }

          @media print {
            .page-break-before {
              page-break-before: always;
            }
            
            .page-break-after {
              page-break-after: always;
            }
            
            .syllabus-cover {
              min-height: 90vh;
            }
          }
        `}
      </style>
      
      <div className="print-preview">
        <h3 className="text-lg font-medium mb-4">Print Preview:</h3>
        
        <div className="print-container">
          {/* Front Page - With appropriate sized logo at the bottom */}
          <section className="page front-page">
            <div className="front-page-content">
              <h1 className="text-3xl font-bold mb-3">{frontPageData?.universityName || "University Name"}</h1>
              <p className="text-xl mb-2">{frontPageData?.universityType || "University Type"}</p>
              <p className="text-xl mt-4 mb-2">{frontPageData?.schoolName || "School Name"}</p>
              <p className="text-xl mb-6">{frontPageData?.departmentName || "Department Name"}</p>
              <h2 className="text-2xl font-bold mt-6 mb-3">{frontPageData?.documentType || "Curriculum"}</h2>
              <h3 className="text-xl font-semibold mb-2">{frontPageData?.programName || "Programme Name"}</h3>
              <p className="text-lg mb-6">{frontPageData?.cbcsText || "CBCS"}</p>
              <p className="text-xl mt-6 mb-8">{frontPageData?.academicYear || "2025-26"}</p>
              
              {/* Appropriately sized logo at the bottom */}
              {logoImage && (
                <img 
                  src={typeof logoImage === 'string' ? logoImage : URL.createObjectURL(logoImage)} 
                  alt="University Logo" 
                  className="front-page-logo"
                />
              )}
            </div>
          </section>
          
          {/* Regulations Page */}
          {regulationsPdfUrl && (
            <section className="page">
              <h2 className="text-2xl font-bold mb-6 text-center">Regulations</h2>
              
              <div className="text-center mb-4">
                <p>Regulations document is available at:</p>
                <p className="text-blue-600 font-medium">
                  {regulationsPdfUrl.split('/').pop() || "Regulations Document"}
                </p>
              </div>
              
              <div className="border p-4 text-center mb-8">
                <p className="text-lg">Please refer to the regulations document for detailed information about the curriculum and academic policies.</p>
              </div>
            </section>
          )}
          
          {/* Curriculum Section */}
          <section className="page">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold">{frontPageData?.programName || "Programme Name"}</h1>
              <h2 className="text-xl font-medium mt-2">Curriculum</h2>
            </div>
            
            <div className="space-y-8">
              {semesterData && semesterData.map((semester, semIndex) => (
                <React.Fragment key={`semester-table-${semester.id}`}>
                  <table className="min-w-full border-collapse border border-gray-300 mb-4">
                    <thead>
                      <tr>
                        <th colSpan="9" className="table-heading text-left px-4 py-3">
                          {semester.name}
                        </th>
                      </tr>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-3 py-2 text-center font-bold">S.No</th>
                        <th className="border border-gray-300 px-3 py-2 text-center font-bold">Component</th>
                        <th className="border border-gray-300 px-3 py-2 text-center font-bold">Course Code</th>
                        <th className="border border-gray-300 px-3 py-2 text-center font-bold">Title of the Course</th>
                        <th className="border border-gray-300 px-3 py-2 text-center font-bold">H/S</th>
                        <th className="border border-gray-300 px-3 py-2 text-center font-bold">Credits</th>
                        <th className="border border-gray-300 px-3 py-2 text-center font-bold" colSpan="3">Hours/Week</th>
                      </tr>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-3 py-1"></th>
                        <th className="border border-gray-300 px-3 py-1"></th>
                        <th className="border border-gray-300 px-3 py-1"></th>
                        <th className="border border-gray-300 px-3 py-1"></th>
                        <th className="border border-gray-300 px-3 py-1"></th>
                        <th className="border border-gray-300 px-3 py-1"></th>
                        <th className="border border-gray-300 px-3 py-1 text-center font-bold">L</th>
                        <th className="border border-gray-300 px-3 py-1 text-center font-bold">T</th>
                        <th className="border border-gray-300 px-3 py-1 text-center font-bold">P</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(!semester.courses || semester.courses.length === 0) ? (
                        <tr>
                          <td colSpan="9" className="border border-gray-300 px-3 py-2 text-center text-gray-500 italic">
                            No courses added
                          </td>
                        </tr>
                      ) : (
                        semester.courses.map((course, idx) => (
                          <tr key={course.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <td className="border border-gray-300 px-3 py-2 text-center">{idx + 1}</td>
                            <td className="border border-gray-300 px-3 py-2 text-center">
                              {getComponentDisplayName(course.component)}
                            </td>
                            <td className="border border-gray-300 px-3 py-2 text-center">{course.code}</td>
                            <td className="border border-gray-300 px-3 py-2">
                              <div className="break-words">{course.title}</div>
                            </td>
                            <td className="border border-gray-300 px-3 py-2 text-center">{course.hs || 'H'}</td>
                            <td className="border border-gray-300 px-3 py-2 text-center">{course.credits}</td>
                            <td className="border border-gray-300 px-3 py-2 text-center">{course.lectureHours}</td>
                            <td className="border border-gray-300 px-3 py-2 text-center">{course.tutorialHours}</td>
                            <td className="border border-gray-300 px-3 py-2 text-center">{course.practicalHours}</td>
                          </tr>
                        ))
                      )}
                      <tr className="bg-gray-200 font-semibold">
                        <td className="border border-gray-300 px-3 py-2 text-center" colSpan="5">Total</td>
                        <td className="border border-gray-300 px-3 py-2 text-center">{calculateTotalCredits(semIndex)}</td>
                        <td className="border border-gray-300 px-3 py-2 text-center">{calculateTotalLectureHours(semIndex)}</td>
                        <td className="border border-gray-300 px-3 py-2 text-center">{calculateTotalTutorialHours(semIndex)}</td>
                        <td className="border border-gray-300 px-3 py-2 text-center">{calculateTotalPracticalHours(semIndex)}</td>
                      </tr>
                    </tbody>
                  </table>
                  
                  {/* Reference table for each semester */}
                  {renderReferenceTable(semester, semIndex)}
                </React.Fragment>
              ))}
            </div>
          </section>
          
          {/* Course Categories Section - With integrated headings */}
          <section className="page">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold">{frontPageData?.programName || "Programme Name"}</h1>
              <h2 className="text-xl font-medium mt-2">Course Categories</h2>
            </div>
            
            <div className="space-y-8">
              {Object.entries(componentNameMap).map(([prefix, fullName]) => {
                // Get all courses for this component type
                const componentCourses = mockCoursesData.filter(course => 
                  course.component && course.component.startsWith(prefix)
                );
                
                // Skip if no courses found for this component
                if (!componentCourses.length) return null;
                
                return (
                  <table key={prefix} className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr>
                        <th colSpan="5" className="table-heading text-left px-4 py-3">
                          List of {fullName} Courses
                        </th>
                      </tr>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-3 py-2 text-center font-bold">S.No</th>
                        <th className="border border-gray-300 px-3 py-2 text-center font-bold">Component</th>
                        <th className="border border-gray-300 px-3 py-2 text-center font-bold">Course Code</th>
                        <th className="border border-gray-300 px-3 py-2 text-center font-bold">Title of the Course</th>
                        <th className="border border-gray-300 px-3 py-2 text-center font-bold">H/S</th>
                      </tr>
                    </thead>
                    <tbody>
                      {componentCourses.map((course, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="border border-gray-300 px-3 py-2 text-center">{idx + 1}</td>
                          <td className="border border-gray-300 px-3 py-2 text-center">
                            {getComponentDisplayName(course.component)}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center">{course.courseCode}</td>
                          <td className="border border-gray-300 px-3 py-2">
                            <div className="break-words">{course.title}</div>
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-center">{course.hs}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                );
              })}
            </div>
          </section>

          {/* Syllabi sections with semester-by-semester organization */}
          {semesterData && semesterData.map((semester, semIndex) => {
            if (!semester.courses || semester.courses.length === 0) {
              return null;
            }
            
            // First semester doesn't need a page break before
            const isFirstSemester = semIndex === 0;
            
            return (
              <React.Fragment key={`syllabus-section-${semester.id}`}>
                {/* Syllabus cover page with page break before but NOT after */}
                <section className={`page syllabus-cover ${!isFirstSemester ? "page-break-before" : ""}`}>
                  <h1 className="text-3xl font-bold mb-6">{frontPageData?.programName || "B.Sc. Computer Science"}</h1>
                  <h2 className="text-2xl font-bold mb-16">SYLLABUS</h2>
                  <h3 className="text-xl font-bold mt-32">{semester.name.toUpperCase()}</h3>
                </section>
                
                {/* All syllabi for this semester - no page break for first course */}
                {semester.courses.map((course, courseIdx) => (
                  <div key={`syllabus-${course.id}`} className={courseIdx > 0 ? "page-break-before" : ""}>
                    <PrintSyllabusNEP 
                      course={getDetailedCourseData(course)}
                      semesterNumber={semIndex + 1}
                      academicYear={frontPageData?.academicYear}
                    />
                  </div>
                ))}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Print;