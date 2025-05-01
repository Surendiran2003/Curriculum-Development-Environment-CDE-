import React, { useState, useEffect, useMemo } from 'react';
import { mockCoursesData } from './mockData';
import CurriculumTable from './CurriculumTable';
import TableForm from './TableForm';
import { 
  calculateTotalCredits, 
  calculateTotalLectureHours,
  calculateTotalTutorialHours,
  calculateTotalPracticalHours
} from './curriculumUtils';

const SemesterDetails = ({ semesterData, setSemesterData }) => {
  const [availableCourses, setAvailableCourses] = useState([]);
  const [editingSemesterIndex, setEditingSemesterIndex] = useState(null);
  const [showAddTableForm, setShowAddTableForm] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [editingCourse, setEditingCourse] = useState(null);
  const [editingTableIndex, setEditingTableIndex] = useState(null); // Add this state
  const [newTableData, setNewTableData] = useState({
    name: 'Custom Table',
    isCustom: true,
    showComponent: true,
    showCourseCode: true,
    showTitle: true,
    showHS: true,
    showCredits: true,
    showHours: true,
    showTotals: true,
    componentHeader: 'Component',
    courseCodeHeader: 'Course Code',
    titleHeader: 'Title of the Course',
    hsHeader: 'H/S',
    creditsHeader: 'Credits',
    hoursHeader: 'Hours/Week',
    courses: []
  });
  
  // Load mock course data
  useEffect(() => {
    setAvailableCourses(mockCoursesData);
    console.log("Loaded mock data:", mockCoursesData.length, "courses");
  }, []);

  // Initialize with 4 default semesters if empty
  useEffect(() => {
    if (!semesterData || semesterData.length === 0) {
      // Create 4 default semesters
      const defaultSemesters = [
        { id: Date.now(), name: 'Semester I', courses: [], showTotals: true },
        { id: Date.now() + 1, name: 'Semester II', courses: [], showTotals: true },
        { id: Date.now() + 2, name: 'Semester III', courses: [], showTotals: true },
        { id: Date.now() + 3, name: 'Semester IV', courses: [], showTotals: true }
      ];
      
      setSemesterData(defaultSemesters);
    }
  }, [semesterData, setSemesterData]);
  
  // Filter semesters and custom tables
  const semesters = useMemo(() => {
    return semesterData.filter(table => !table.isCustom);
  }, [semesterData]);
  
  const customTables = useMemo(() => {
    return semesterData.filter(table => table.isCustom);
  }, [semesterData]);
  
  // Get unique components from available courses
  const uniqueComponents = useMemo(() => {
    const components = [...new Set(availableCourses.map(course => course.component))];
    return components.sort((a, b) => a.localeCompare(b));
  }, [availableCourses]);
  
  // Add a new semester
  const handleAddSemester = () => {
    const newSemesterId = Date.now();
    
    // Determine the next semester number
    const semesterNumber = semesters.length + 1;
    const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
    const romanNumeral = romanNumerals[semesterNumber - 1] || semesterNumber;
    
    const newSemester = {
      id: newSemesterId,
      name: `Semester ${romanNumeral}`,
      courses: [],
      showTotals: true
    };
    
    // Find position to insert the new semester (after the last semester)
    let insertIndex = 0;
    if (semesters.length > 0) {
      const lastSemesterIndex = semesterData.findIndex(
        item => item.id === semesters[semesters.length - 1].id
      );
      insertIndex = lastSemesterIndex + 1;
    }
    
    const updatedSemesters = [
      ...semesterData.slice(0, insertIndex),
      newSemester,
      ...semesterData.slice(insertIndex)
    ];
    
    setSemesterData(updatedSemesters);
    
    // Switch to the new semester tab if among the first set of semesters
    if (semesters.length === 0) {
      setActiveTabIndex(0);
    } else {
      setActiveTabIndex(semesters.length);
    }
  };
  
  // Add a new custom table
  const handleAddCustomTable = () => {
    const newTableId = Date.now();
    
    const newCustomTable = {
      id: newTableId,
      name: newTableData.name,
      isCustom: true,
      showComponent: newTableData.showComponent,
      showCourseCode: newTableData.showCourseCode,
      showTitle: newTableData.showTitle,
      showHS: newTableData.showHS,
      showCredits: newTableData.showCredits,
      showHours: newTableData.showHours,
      showTotals: newTableData.showTotals,
      componentHeader: newTableData.componentHeader,
      courseCodeHeader: newTableData.courseCodeHeader,
      titleHeader: newTableData.titleHeader,
      hsHeader: newTableData.hsHeader,
      creditsHeader: newTableData.creditsHeader,
      hoursHeader: newTableData.hoursHeader,
      courses: []
    };
    
    // Add the custom table at the end
    setSemesterData([...semesterData, newCustomTable]);
    
    // Reset form
    setNewTableData({
      name: 'Custom Table',
      isCustom: true,
      showComponent: true,
      showCourseCode: true,
      showTitle: true,
      showHS: true,
      showCredits: true,
      showHours: true,
      showTotals: true,
      componentHeader: 'Component',
      courseCodeHeader: 'Course Code',
      titleHeader: 'Title of the Course',
      hsHeader: 'H/S',
      creditsHeader: 'Credits',
      hoursHeader: 'Hours/Week',
      courses: []
    });
    
    setShowAddTableForm(false);
  };
  
  // Add a handler to start editing a custom table
  const handleEditCustomTable = (index) => {
    if (!semesterData[index] || !semesterData[index].isCustom) return;
    
    const tableToEdit = semesterData[index];
    
    // Copy the table data to the form state
    setNewTableData({
      name: tableToEdit.name,
      isCustom: true,
      showComponent: tableToEdit.showComponent !== false,
      showCourseCode: tableToEdit.showCourseCode !== false,
      showTitle: tableToEdit.showTitle !== false,
      showHS: tableToEdit.showHS !== false,
      showCredits: tableToEdit.showCredits !== false,
      showHours: tableToEdit.showHours !== false,
      showTotals: tableToEdit.showTotals !== false,
      componentHeader: tableToEdit.componentHeader || 'Component',
      courseCodeHeader: tableToEdit.courseCodeHeader || 'Course Code',
      titleHeader: tableToEdit.titleHeader || 'Title of the Course',
      hsHeader: tableToEdit.hsHeader || 'H/S',
      creditsHeader: tableToEdit.creditsHeader || 'Credits',
      hoursHeader: tableToEdit.hoursHeader || 'Hours/Week',
      courses: [] // Don't modify courses here
    });
    
    setEditingTableIndex(index);
    setShowAddTableForm(true);
    
    // Add this console log for debugging
    console.log(`Editing custom table at index: ${index}`, tableToEdit);
  };
  
  // Update an existing custom table
  const handleUpdateCustomTable = (tableIndex, updatedData) => {
    if (!semesterData[tableIndex] || !semesterData[tableIndex].isCustom) return;
    
    const updatedSemesters = [...semesterData];
    const existingTable = updatedSemesters[tableIndex];
    
    // Update only the structure properties, keep the id and courses
    updatedSemesters[tableIndex] = {
      ...existingTable,
      name: updatedData.name,
      showComponent: updatedData.showComponent,
      showCourseCode: updatedData.showCourseCode,
      showTitle: updatedData.showTitle,
      showHS: updatedData.showHS,
      showCredits: updatedData.showCredits,
      showHours: updatedData.showHours,
      showTotals: updatedData.showTotals,
      componentHeader: updatedData.componentHeader,
      courseCodeHeader: updatedData.courseCodeHeader,
      titleHeader: updatedData.titleHeader,
      hsHeader: updatedData.hsHeader,
      creditsHeader: updatedData.creditsHeader,
      hoursHeader: updatedData.hoursHeader
    };
    
    setSemesterData(updatedSemesters);
  };
  
  // Cancel table editing
  const handleCancelTableForm = () => {
    setNewTableData({
      name: 'Custom Table',
      isCustom: true,
      showComponent: true,
      showCourseCode: true,
      showTitle: true,
      showHS: true,
      showCredits: true,
      showHours: true,
      showTotals: true,
      componentHeader: 'Component',
      courseCodeHeader: 'Course Code',
      titleHeader: 'Title of the Course',
      hsHeader: 'H/S',
      creditsHeader: 'Credits',
      hoursHeader: 'Hours/Week',
      courses: []
    });
    
    setEditingTableIndex(null);
    setShowAddTableForm(false);
  };
  
  // Modify the existing handleAddCustomTable to check for editing mode
  const handleAddOrUpdateCustomTable = () => {
    console.log('handleAddOrUpdateCustomTable called, editingTableIndex:', editingTableIndex);
    
    if (editingTableIndex !== null) {
      // Update existing table
      const updatedSemesters = [...semesterData];
      const existingTable = updatedSemesters[editingTableIndex];
      
      // Update only the structure properties, keep the id and courses
      updatedSemesters[editingTableIndex] = {
        ...existingTable,
        name: newTableData.name,
        showComponent: newTableData.showComponent,
        showCourseCode: newTableData.showCourseCode,
        showTitle: newTableData.showTitle,
        showHS: newTableData.showHS,
        showCredits: newTableData.showCredits,
        showHours: newTableData.showHours,
        showTotals: newTableData.showTotals,
        componentHeader: newTableData.componentHeader,
        courseCodeHeader: newTableData.courseCodeHeader,
        titleHeader: newTableData.titleHeader,
        hsHeader: newTableData.hsHeader,
        creditsHeader: newTableData.creditsHeader,
        hoursHeader: newTableData.hoursHeader
      };
      
      console.log('Updating existing table:', updatedSemesters[editingTableIndex]);
      setSemesterData(updatedSemesters);
    } else {
      // Add new table
      const newTableId = Date.now();
      
      const newCustomTable = {
        id: newTableId,
        name: newTableData.name,
        isCustom: true,
        showComponent: newTableData.showComponent,
        showCourseCode: newTableData.showCourseCode,
        showTitle: newTableData.showTitle,
        showHS: newTableData.showHS,
        showCredits: newTableData.showCredits,
        showHours: newTableData.showHours,
        showTotals: newTableData.showTotals,
        componentHeader: newTableData.componentHeader,
        courseCodeHeader: newTableData.courseCodeHeader,
        titleHeader: newTableData.titleHeader,
        hsHeader: newTableData.hsHeader,
        creditsHeader: newTableData.creditsHeader,
        hoursHeader: newTableData.hoursHeader,
        courses: []
      };
      
      console.log('Adding new custom table:', newCustomTable);
      setSemesterData([...semesterData, newCustomTable]);
    }
    
    // Reset form
    setNewTableData({
      name: 'Custom Table',
      isCustom: true,
      showComponent: true,
      showCourseCode: true,
      showTitle: true,
      showHS: true,
      showCredits: true,
      showHours: true,
      showTotals: true,
      componentHeader: 'Component',
      courseCodeHeader: 'Course Code',
      titleHeader: 'Title of the Course',
      hsHeader: 'H/S',
      creditsHeader: 'Credits',
      hoursHeader: 'Hours/Week',
      courses: []
    });
    
    setEditingTableIndex(null);
    setShowAddTableForm(false);
  };
  
  // Delete a semester or table
  const handleDeleteTable = (index) => {
    if (window.confirm('Are you sure you want to delete this table?')) {
      const tableToDelete = semesterData[index];
      const updatedSemesters = semesterData.filter((_, i) => i !== index);
      setSemesterData(updatedSemesters);
      
      // Adjust active tab if needed
      if (!tableToDelete.isCustom) {
        // If deleting a regular semester
        const newSemesters = updatedSemesters.filter(table => !table.isCustom);
        if (activeTabIndex >= newSemesters.length) {
          setActiveTabIndex(Math.max(0, newSemesters.length - 1));
        }
      }
    }
  };
  
  // Toggle showing totals
  const toggleShowTotals = (index) => {
    const updatedSemesters = [...semesterData];
    updatedSemesters[index].showTotals = !updatedSemesters[index].showTotals;
    setSemesterData(updatedSemesters);
  };
  
  // Edit table heading
  const handleEditTableHeading = (index, newHeading) => {
    const updatedSemesters = [...semesterData];
    updatedSemesters[index].name = newHeading;
    setSemesterData(updatedSemesters);
  };
  
  // Move semester left/right
  const handleMoveSemester = (direction, index) => {
    // Find all semester indexes
    const semesterIndexes = semesterData
      .map((table, i) => !table.isCustom ? i : null)
      .filter(i => i !== null);
    
    // Find position of this semester in the semester-only list
    const positionInSemesters = semesterIndexes.indexOf(index);
    
    if (direction === 'left' && positionInSemesters > 0) {
      const targetIndex = semesterIndexes[positionInSemesters - 1];
      const updatedSemesters = [...semesterData];
      
      // Swap the semesters
      [updatedSemesters[index], updatedSemesters[targetIndex]] = 
      [updatedSemesters[targetIndex], updatedSemesters[index]];
      
      setSemesterData(updatedSemesters);
      
      // Update active tab index if needed
      if (activeTabIndex === positionInSemesters) {
        setActiveTabIndex(positionInSemesters - 1);
      } else if (activeTabIndex === positionInSemesters - 1) {
        setActiveTabIndex(positionInSemesters);
      }
    } else if (direction === 'right' && positionInSemesters < semesterIndexes.length - 1) {
      const targetIndex = semesterIndexes[positionInSemesters + 1];
      const updatedSemesters = [...semesterData];
      
      // Swap the semesters
      [updatedSemesters[index], updatedSemesters[targetIndex]] = 
      [updatedSemesters[targetIndex], updatedSemesters[index]];
      
      setSemesterData(updatedSemesters);
      
      // Update active tab index if needed
      if (activeTabIndex === positionInSemesters) {
        setActiveTabIndex(positionInSemesters + 1);
      } else if (activeTabIndex === positionInSemesters + 1) {
        setActiveTabIndex(positionInSemesters);
      }
    }
  };
  
  // Move custom table up/down
  const handleMoveCustomTable = (direction, index) => {
    const tableToMove = semesterData[index];
    
    if (!tableToMove.isCustom) return; // Only move custom tables with this function
    
    if (direction === 'up' && index > 0) {
      const updatedSemesters = [...semesterData];
      [updatedSemesters[index], updatedSemesters[index - 1]] = 
      [updatedSemesters[index - 1], updatedSemesters[index]];
      
      setSemesterData(updatedSemesters);
    } else if (direction === 'down' && index < semesterData.length - 1) {
      const updatedSemesters = [...semesterData];
      [updatedSemesters[index], updatedSemesters[index + 1]] = 
      [updatedSemesters[index + 1], updatedSemesters[index]];
      
      setSemesterData(updatedSemesters);
    }
  };
  
  // Add a course to a semester and create corresponding syllabus entry
  const handleAddCourse = (tableIndex, course) => {
    const updatedSemesters = [...semesterData];
    const newCourseId = Date.now(); // Simple unique ID
    
    const courseWithId = {
      ...course,
      id: newCourseId
    };
    
    updatedSemesters[tableIndex].courses.push(courseWithId);
    setSemesterData(updatedSemesters);
    
    // Create a syllabus entry for this course
    createSyllabusEntryForCourse(courseWithId, tableIndex);
  };

  // Create a syllabus entry for a course
  const createSyllabusEntryForCourse = (course, tableIndex) => {
    try {
      // Get existing syllabuses from localStorage
      const savedSyllabuses = JSON.parse(localStorage.getItem('syllabuses') || '[]');
      
      // Get the semester name for the LTPC value 
      const semester = semesterData[tableIndex];
      const semesterName = !semester.isCustom ? semester.name.replace('Semester ', '') : 'I';
      
      // Format the LTPC value (Lecture-Tutorial-Practical-Credits)
      const ltpc = `${course.lectureHours}-${course.tutorialHours}-${course.practicalHours}-${course.credits}`;
      
      // Check if an entry already exists for this course
      const existingIndex = savedSyllabuses.findIndex(s => 
        s.courseCode === course.code && s.isCourseLink === true && s.courseId === course.id
      );
      
      const syllabusEntry = {
        id: existingIndex !== -1 ? savedSyllabuses[existingIndex].id : Date.now(),
        courseCode: course.code,
        courseTitle: course.title,
        ltpc: ltpc,
        lastModified: new Date().toISOString().split('T')[0],
        status: 'Draft',
        semesterIndex: tableIndex,
        semesterName: semesterName,
        component: course.component,
        credits: course.credits,
        lectureHours: course.lectureHours,
        tutorialHours: course.tutorialHours,
        practicalHours: course.practicalHours,
        hs: course.hs,
        courseId: course.id,
        isCourseLink: true, // Flag to identify this as a course link
        showInDashboard: false, // Hide from main dashboard
        linkedCurriculumId: Number(id) // Store which curriculum this course belongs to
      };
      
      if (existingIndex !== -1) {
        savedSyllabuses[existingIndex] = syllabusEntry;
      } else {
        savedSyllabuses.push(syllabusEntry);
      }
      
      // Save back to localStorage
      localStorage.setItem('syllabuses', JSON.stringify(savedSyllabuses));
    } catch (error) {
      console.error('Error creating syllabus entry:', error);
    }
  };

  // Update an existing course and its syllabus entry
  const handleUpdateCourse = (tableIndex, courseId, updatedCourse) => {
    const updatedSemesters = [...semesterData];
    
    // Find the course index
    const courseIndex = updatedSemesters[tableIndex].courses.findIndex(
      course => course.id === courseId
    );
    
    if (courseIndex !== -1) {
      const courseWithId = {
        ...updatedCourse,
        id: courseId // Keep the original ID
      };
      
      updatedSemesters[tableIndex].courses[courseIndex] = courseWithId;
      setSemesterData(updatedSemesters);
      
      // Update the syllabus entry
      createSyllabusEntryForCourse(courseWithId, tableIndex);
    }
    
    // Clear editing mode
    setEditingCourse(null);
  };

  // Remove a course from a semester and its syllabus entry
  const handleRemoveCourse = (tableIndex, courseId) => {
    const updatedSemesters = [...semesterData];
    
    // Get the course before removing it
    const course = updatedSemesters[tableIndex].courses.find(c => c.id === courseId);
    
    updatedSemesters[tableIndex].courses = updatedSemesters[tableIndex].courses.filter(
      course => course.id !== courseId
    );
    setSemesterData(updatedSemesters);
    
    // Remove the syllabus entry if it exists
    if (course) {
      removeSyllabusEntryForCourse(course.code, courseId);
    }
  };

  // Remove a syllabus entry for a course
  const removeSyllabusEntryForCourse = (courseCode, courseId) => {
    try {
      // Get existing syllabuses from localStorage
      const savedSyllabuses = JSON.parse(localStorage.getItem('syllabuses') || '[]');
      
      // Filter out the entry for this course
      const updatedSyllabuses = savedSyllabuses.filter(s => 
        !(s.courseCode === courseCode && s.isCourseLink === true && s.courseId === courseId)
      );
      
      // Save back to localStorage
      localStorage.setItem('syllabuses', JSON.stringify(updatedSyllabuses));
    } catch (error) {
      console.error('Error removing syllabus entry:', error);
    }
  };

  // Set up course for editing
  const handleEditCourse = (tableIndex, courseId) => {
    const course = semesterData[tableIndex].courses.find(c => c.id === courseId);
    
    if (course) {
      setEditingCourse({
        tableIndex,
        courseId,
        course: { ...course }
      });
    }
  };

  // Get the active semester for tab display
  const activeSemester = semesters.length > 0 && activeTabIndex < semesters.length 
    ? semesters[activeTabIndex] 
    : null;
  
  // Find the actual index of the active semester in the full semesterData array
  const activeSemesterIndex = activeSemester 
    ? semesterData.findIndex(table => table.id === activeSemester.id)
    : -1;

  return (
    <div className="space-y-6">
      {/* Header and buttons */}
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="text-xl font-semibold">Semester Details</h2>
        <div className="space-x-2">
          <button 
            onClick={handleAddSemester}
            className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Semester
          </button>
          
          <button 
            onClick={() => {
              setEditingTableIndex(null);
              setShowAddTableForm(!showAddTableForm);
            }}
            className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            {showAddTableForm ? 'Cancel Custom Table' : 'Create Custom Table'}
          </button>
        </div>
      </div>
      
      {/* Tab Navigation - Only for Semesters */}
      {semesters.length > 0 && (
        <div className="mb-4 border-b border-gray-200">
          <div className="flex overflow-x-auto py-1 scrollbar-hide">
            {semesters.map((semester, index) => (
              <button
                key={semester.id}
                className={`px-4 py-2 border-b-2 text-sm font-medium whitespace-nowrap mr-2 ${
                  activeTabIndex === index
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTabIndex(index)}
              >
                {semester.name}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Custom Table Form - Now handles both creation and editing */}
      {showAddTableForm && (
        <TableForm 
          newTableData={newTableData}
          setNewTableData={setNewTableData}
          handleAddCustomTable={handleAddOrUpdateCustomTable}
          isEditing={editingTableIndex !== null}
          onCancel={handleCancelTableForm}
        />
      )}
      
      {/* Render active semester */}
      {activeSemester && activeSemesterIndex !== -1 && (
        <CurriculumTable
          table={activeSemester}
          tableIndex={activeSemesterIndex}
          availableCourses={availableCourses}
          uniqueComponents={uniqueComponents}
          editingSemesterIndex={editingSemesterIndex}
          setEditingSemesterIndex={setEditingSemesterIndex}
          editingCourse={editingCourse}
          onEditTableHeading={handleEditTableHeading}
          onToggleShowTotals={toggleShowTotals}
          onMoveSemester={handleMoveSemester}
          onMoveCustomTable={handleMoveCustomTable}
          onDeleteTable={handleDeleteTable}
          onAddCourse={handleAddCourse}
          onUpdateCourse={handleUpdateCourse}
          onRemoveCourse={handleRemoveCourse}
          onEditCourse={handleEditCourse}
          onEditCustomTable={handleEditCustomTable}
          onUpdateCustomTable={handleUpdateCustomTable}
          calculationHelpers={{
            calculateTotalCredits,
            calculateTotalLectureHours,
            calculateTotalTutorialHours,
            calculateTotalPracticalHours
          }}
        />
      )}
      
      {/* Render all custom tables below */}
      {customTables.map(table => {
        const tableIndex = semesterData.findIndex(t => t.id === table.id);
        return (
          <CurriculumTable
            key={table.id}
            table={table}
            tableIndex={tableIndex}
            availableCourses={availableCourses}
            uniqueComponents={uniqueComponents}
            editingSemesterIndex={editingSemesterIndex}
            setEditingSemesterIndex={setEditingSemesterIndex}
            editingCourse={editingCourse}
            onEditTableHeading={handleEditTableHeading}
            onToggleShowTotals={toggleShowTotals}
            onMoveSemester={handleMoveSemester}
            onMoveCustomTable={handleMoveCustomTable}
            onDeleteTable={handleDeleteTable}
            onAddCourse={handleAddCourse}
            onUpdateCourse={handleUpdateCourse}
            onRemoveCourse={handleRemoveCourse}
            onEditCourse={handleEditCourse}
            onEditCustomTable={handleEditCustomTable}
            onUpdateCustomTable={handleUpdateCustomTable}
            calculationHelpers={{
              calculateTotalCredits,
              calculateTotalLectureHours,
              calculateTotalTutorialHours,
              calculateTotalPracticalHours
            }}
          />
        );
      })}
    </div>
  );
};

export default SemesterDetails;