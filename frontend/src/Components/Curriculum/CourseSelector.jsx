import React, { useState, useEffect } from 'react';

const CourseSelector = ({ 
  availableCourses, 
  uniqueComponents, 
  onAddCourse,
  editingCourse,
  onUpdateCourse
}) => {
  const [showAddCourseForm, setShowAddCourseForm] = useState(false);
  const [selectedCourseCode, setSelectedCourseCode] = useState('');
  const [newCourse, setNewCourse] = useState({
    code: '',
    title: '',
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 0,
    credits: 0,
    component: '',
    hs: 'H'
  });
  
  // Initialize form with editing course data when it changes
  useEffect(() => {
    if (editingCourse) {
      setNewCourse({
        code: editingCourse.course.code || '',
        title: editingCourse.course.title || '',
        lectureHours: editingCourse.course.lectureHours || 0,
        tutorialHours: editingCourse.course.tutorialHours || 0,
        practicalHours: editingCourse.course.practicalHours || 0,
        credits: editingCourse.course.credits || 0,
        component: editingCourse.course.component || '',
        hs: editingCourse.course.hs || 'H'
      });
      setShowAddCourseForm(true);
    }
  }, [editingCourse]);
  
  // Handle course selection from the dropdown
  const handleCourseSelection = (e) => {
    const selectedCode = e.target.value;
    setSelectedCourseCode(selectedCode);
    
    if (selectedCode) {
      const selectedCourse = availableCourses.find(course => course.courseCode === selectedCode);
      if (selectedCourse) {
        setNewCourse({
          code: selectedCourse.courseCode,
          title: selectedCourse.title,
          lectureHours: selectedCourse.hours.L,
          tutorialHours: selectedCourse.hours.T,
          practicalHours: selectedCourse.hours.P,
          credits: selectedCourse.credits,
          component: selectedCourse.component,
          hs: selectedCourse.hs
        });
      }
    } else {
      // Reset form if no course is selected
      setNewCourse({
        ...newCourse,
        code: '',
        title: '',
        lectureHours: 0,
        tutorialHours: 0,
        practicalHours: 0,
        credits: 0,
        component: '',
        hs: 'H'
      });
    }
  };
  
  // Handle course input change
  const handleCourseChange = (e) => {
    const { name, value } = e.target;
    setNewCourse(prev => ({
      ...prev,
      [name]: name === 'code' || name === 'title' || name === 'component' || name === 'hs'
        ? value 
        : parseInt(value) || 0
    }));
  };
  
  // Auto-calculate credits when L-T-P changes
  useEffect(() => {
    // Only auto-calculate if no course is selected from dropdown
    if (!selectedCourseCode && !editingCourse) {
      const totalHours = newCourse.lectureHours + newCourse.tutorialHours/2 + newCourse.practicalHours/2;
      setNewCourse(prev => ({
        ...prev,
        credits: Math.ceil(totalHours)
      }));
    }
  }, [newCourse.lectureHours, newCourse.tutorialHours, newCourse.practicalHours, selectedCourseCode, editingCourse]);
  
  // Handle adding a new course or updating an existing one
  const handleSubmitCourse = () => {
    // Basic validation
    if (!newCourse.code || !newCourse.title) return;
    
    if (editingCourse) {
      // Update existing course
      onUpdateCourse(editingCourse.courseId, newCourse);
    } else {
      // Add new course
      onAddCourse(newCourse);
    }
    
    // Reset form
    setNewCourse({
      code: '',
      title: '',
      lectureHours: 0,
      tutorialHours: 0,
      practicalHours: 0,
      credits: 0,
      component: '',
      hs: 'H'
    });
    setSelectedCourseCode('');
    setShowAddCourseForm(false);
  };
  
  // Cancel adding/editing a course
  const handleCancelCourseForm = () => {
    setNewCourse({
      code: '',
      title: '',
      lectureHours: 0,
      tutorialHours: 0,
      practicalHours: 0,
      credits: 0,
      component: '',
      hs: 'H'
    });
    setSelectedCourseCode('');
    setShowAddCourseForm(false);
    
    // Also clear any editing state
    if (editingCourse && onUpdateCourse) {
      onUpdateCourse(null, null);
    }
  };
  
  return (
    <div className="mt-4">
      {!showAddCourseForm ? (
        <button
          onClick={() => setShowAddCourseForm(true)}
          className="w-full py-2 px-4 border border-dashed border-gray-400 rounded-lg text-gray-600 hover:bg-gray-100 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New Course
        </button>
      ) : (
        <div className="border p-4 rounded-lg bg-white">
          <h4 className="font-medium text-gray-700 mb-3">
            {editingCourse ? 'Edit Course' : 'Add New Course'}
          </h4>
          
          {/* Course Selection Dropdown - only show when adding a new course */}
          {!editingCourse && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Select Course (Optional)
              </label>
              <select
                value={selectedCourseCode}
                onChange={handleCourseSelection}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Enter course details manually</option>
                {availableCourses.map(course => (
                  <option key={course.courseCode} value={course.courseCode}>
                    {course.courseCode}: {course.title}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Select a course from the list or enter details manually below
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Course Code*</label>
              <input
                type="text"
                name="code"
                value={newCourse.code}
                onChange={handleCourseChange}
                placeholder="CS101"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Course Title*</label>
              <input
                type="text"
                name="title"
                value={newCourse.title}
                onChange={handleCourseChange}
                placeholder="Introduction to Programming"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">Component</label>
            <input
              type="text"
              name="component"
              value={newCourse.component}
              onChange={handleCourseChange}
              placeholder="MJD 1 or FC 1"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter component type (e.g., MJD 1, FC 1, IDC 1, etc.)
            </p>
          </div>
          
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Lecture Hours (L)</label>
              <input
                type="number"
                name="lectureHours"
                min="0"
                value={newCourse.lectureHours}
                onChange={handleCourseChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Tutorial Hours (T)</label>
              <input
                type="number"
                name="tutorialHours"
                min="0"
                value={newCourse.tutorialHours}
                onChange={handleCourseChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Practical Hours (P)</label>
              <input
                type="number"
                name="practicalHours"
                min="0"
                value={newCourse.practicalHours}
                onChange={handleCourseChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Type (H/S)</label>
              <select
                name="hs"
                value={newCourse.hs}
                onChange={handleCourseChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="H">Hard (H)</option>
                <option value="S">Soft (S)</option>
              </select>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">Credits</label>
            <input
              type="number"
              name="credits"
              min="0"
              value={newCourse.credits}
              onChange={handleCourseChange}
              className={`w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${selectedCourseCode ? '' : 'bg-gray-50'}`}
              readOnly={selectedCourseCode ? true : false}
            />
            {!selectedCourseCode && !editingCourse && (
              <p className="text-xs text-gray-500 mt-1">
                Credits are auto-calculated based on L-T-P values
              </p>
            )}
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={handleSubmitCourse}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              disabled={!newCourse.code || !newCourse.title}
            >
              {editingCourse ? 'Update Course' : 'Add Course'}
            </button>
            <button
              onClick={handleCancelCourseForm}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseSelector;