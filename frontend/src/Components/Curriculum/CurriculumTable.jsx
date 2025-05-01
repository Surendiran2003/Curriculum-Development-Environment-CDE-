import React, { useState } from 'react';
import CourseSelector from './CourseSelector';
import TableForm from './TableForm';
import { getComponentDisplayName } from './curriculumUtils';

const CurriculumTable = ({
  table,
  tableIndex,
  availableCourses,
  uniqueComponents,
  editingSemesterIndex,
  setEditingSemesterIndex,
  editingCourse,
  onEditTableHeading,
  onToggleShowTotals,
  onMoveSemester,
  onMoveCustomTable,
  onDeleteTable,
  onAddCourse,
  onUpdateCourse,
  onRemoveCourse,
  onEditCourse,
  onUpdateCustomTable,
  calculationHelpers
}) => {
  const isCustom = table.isCustom || false;
  const [isEditingStructure, setIsEditingStructure] = useState(false);
  const [tableFormData, setTableFormData] = useState({});
  
  const { 
    calculateTotalCredits, 
    calculateTotalLectureHours, 
    calculateTotalTutorialHours, 
    calculateTotalPracticalHours 
  } = calculationHelpers;

  // Function to handle opening the edit form
  const handleEditStructure = () => {
    // Initialize form with current table data
    setTableFormData({
      name: table.name,
      isCustom: true,
      showComponent: table.showComponent !== false,
      showCourseCode: table.showCourseCode !== false,
      showTitle: table.showTitle !== false,
      showHS: table.showHS !== false,
      showCredits: table.showCredits !== false,
      showHours: table.showHours !== false,
      showTotals: table.showTotals !== false,
      componentHeader: table.componentHeader || 'Component',
      courseCodeHeader: table.courseCodeHeader || 'Course Code',
      titleHeader: table.titleHeader || 'Title of the Course',
      hsHeader: table.hsHeader || 'H/S',
      creditsHeader: table.creditsHeader || 'Credits',
      hoursHeader: table.hoursHeader || 'Hours/Week'
    });
    
    setIsEditingStructure(true);
  };
  
  // Function to handle saving changes
  const handleUpdateTableStructure = () => {
    if (onUpdateCustomTable) {
      onUpdateCustomTable(tableIndex, tableFormData);
    }
    setIsEditingStructure(false);
  };
  
  // Function to cancel editing
  const handleCancelEdit = () => {
    setIsEditingStructure(false);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 mb-6">
      <div className="flex justify-between items-center mb-4">
        {editingSemesterIndex === tableIndex ? (
          <input 
            type="text"
            value={table.name}
            onChange={(e) => onEditTableHeading(tableIndex, e.target.value)}
            className="text-lg font-semibold p-1 border border-gray-300 rounded"
            onBlur={() => setEditingSemesterIndex(null)}
            autoFocus
          />
        ) : (
          <h3 
            className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-blue-600"
            onClick={() => setEditingSemesterIndex(tableIndex)}
            title="Click to edit table heading"
          >
            {table.name}
          </h3>
        )}
        
        <div className="flex items-center space-x-2">
          {/* Only show "Show Totals" toggle for custom tables, not for semester tables */}
          {isCustom && (
            <>
              <button
                onClick={() => onToggleShowTotals(tableIndex)}
                className="text-sm px-2 py-1 rounded border border-gray-300 hover:bg-gray-100"
                title={table.showTotals ? "Hide totals" : "Show totals"}
              >
                {table.showTotals ? "Hide Totals" : "Show Totals"}
              </button>
              
              {/* Add edit button for custom tables */}
              <button
                onClick={handleEditStructure}
                className="text-sm px-2 py-1 rounded border border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-600"
                title="Edit table structure"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Structure
              </button>
            </>
          )}
          
          {!isCustom ? (
            // Semester navigation controls
            <>
              <button
                onClick={() => onMoveSemester('left', tableIndex)}
                className="text-blue-600 hover:text-blue-800 disabled:opacity-50 p-1"
                title="Move Left"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              <button
                onClick={() => onMoveSemester('right', tableIndex)}
                className="text-blue-600 hover:text-blue-800 disabled:opacity-50 p-1"
                title="Move Right"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </>
          ) : (
            // Custom table navigation controls
            <>
              <button
                onClick={() => onMoveCustomTable('up', tableIndex)}
                className="text-blue-600 hover:text-blue-800 disabled:opacity-50 p-1"
                title="Move Up"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              
              <button
                onClick={() => onMoveCustomTable('down', tableIndex)}
                className="text-blue-600 hover:text-blue-800 disabled:opacity-50 p-1"
                title="Move Down"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </>
          )}
          
          <button
            onClick={() => onDeleteTable(tableIndex)}
            className="text-red-600 hover:text-red-800 p-1"
            title="Delete Table"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-3 py-2 text-center font-bold w-12">S.No</th>
              
              {/* Conditionally show component column */}
              {(!isCustom || table.showComponent) && (
                <th className="border border-gray-300 px-3 py-2 text-center font-bold w-32">
                  {isCustom ? table.componentHeader : 'Component'}
                </th>
              )}
              
              {/* Conditionally show course code column */}
              {(!isCustom || table.showCourseCode) && (
                <th className="border border-gray-300 px-3 py-2 text-center font-bold w-24">
                  {isCustom ? table.courseCodeHeader : 'Course Code'}
                </th>
              )}
              
              {/* Conditionally show title column */}
              {(!isCustom || table.showTitle) && (
                <th className="border border-gray-300 px-3 py-2 text-center font-bold">
                  {isCustom ? table.titleHeader : 'Title of the Course'}
                </th>
              )}
              
              {/* Conditionally show H/S column */}
              {(!isCustom || table.showHS) && (
                <th className="border border-gray-300 px-3 py-2 text-center font-bold w-16">
                  {isCustom ? table.hsHeader : 'H/S'}
                </th>
              )}
              
              {/* Conditionally show credits column */}
              {(!isCustom || table.showCredits) && (
                <th className="border border-gray-300 px-3 py-2 text-center font-bold w-16">
                  {isCustom ? table.creditsHeader : 'Credits'}
                </th>
              )}
              
              {/* Conditionally show hours column group */}
              {(!isCustom || table.showHours) && (
                <th className="border border-gray-300 px-3 py-2 text-center font-bold" colSpan="3">
                  {isCustom ? table.hoursHeader : 'Hours/Week'}
                </th>
              )}
              
              <th className="border border-gray-300 px-3 py-2 text-center font-bold w-24">Actions</th>
            </tr>
            
            {(!isCustom || table.showHours) && (
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-3 py-1"></th>
                {(!isCustom || table.showComponent) && <th className="border border-gray-300 px-3 py-1"></th>}
                {(!isCustom || table.showCourseCode) && <th className="border border-gray-300 px-3 py-1"></th>}
                {(!isCustom || table.showTitle) && <th className="border border-gray-300 px-3 py-1"></th>}
                {(!isCustom || table.showHS) && <th className="border border-gray-300 px-3 py-1"></th>}
                {(!isCustom || table.showCredits) && <th className="border border-gray-300 px-3 py-1"></th>}
                <th className="border border-gray-300 px-3 py-1 text-center font-bold w-12">L</th>
                <th className="border border-gray-300 px-3 py-1 text-center font-bold w-12">T</th>
                <th className="border border-gray-300 px-3 py-1 text-center font-bold w-12">P</th>
                <th className="border border-gray-300 px-3 py-1"></th>
              </tr>
            )}
          </thead>
          <tbody>
            {table.courses.length === 0 ? (
              <tr>
                <td colSpan="10" className="border border-gray-300 px-3 py-2 text-center text-gray-500 italic">
                  No courses added yet
                </td>
              </tr>
            ) : (
              table.courses.map((course, idx) => (
                <tr key={course.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border border-gray-300 px-3 py-2 text-center">{idx + 1}</td>
                  
                  {(!isCustom || table.showComponent) && (
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      {getComponentDisplayName(course.component)}
                    </td>
                  )}
                  
                  {(!isCustom || table.showCourseCode) && (
                    <td className="border border-gray-300 px-3 py-2 text-center">{course.code}</td>
                  )}
                  
                  {(!isCustom || table.showTitle) && (
                    <td className="border border-gray-300 px-3 py-2">
                      <div className="break-words">{course.title}</div>
                    </td>
                  )}
                  
                  {(!isCustom || table.showHS) && (
                    <td className="border border-gray-300 px-3 py-2 text-center">{course.hs || 'H'}</td>
                  )}
                  
                  {(!isCustom || table.showCredits) && (
                    <td className="border border-gray-300 px-3 py-2 text-center">{course.credits}</td>
                  )}
                  
                  {(!isCustom || table.showHours) && (
                    <>
                      <td className="border border-gray-300 px-3 py-2 text-center">{course.lectureHours}</td>
                      <td className="border border-gray-300 px-3 py-2 text-center">{course.tutorialHours}</td>
                      <td className="border border-gray-300 px-3 py-2 text-center">{course.practicalHours}</td>
                    </>
                  )}
                  
                  <td className="border border-gray-300 px-3 py-2 text-center">
                    <div className="flex justify-center space-x-2">
                      <button 
                        onClick={() => onEditCourse(tableIndex, course.id)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit Course"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => onRemoveCourse(tableIndex, course.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Remove Course"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
            
            {/* Totals row - Always show for semester tables, conditionally for custom tables */}
            {table.courses.length > 0 && (!isCustom || table.showTotals) && (
              <tr className="bg-gray-200 font-semibold">
                <td className="border border-gray-300 px-3 py-2 text-center" 
                    colSpan={
                      ((!isCustom || table.showComponent) ? 1 : 0) + 
                      ((!isCustom || table.showCourseCode) ? 1 : 0) + 
                      ((!isCustom || table.showTitle) ? 1 : 0) + 
                      ((!isCustom || table.showHS) ? 1 : 0) + 
                      1 // For S.No column
                    }>
                  Total
                </td>
                
                {(!isCustom || table.showCredits) && (
                  <td className="border border-gray-300 px-3 py-2 text-center">
                    {calculateTotalCredits(table.courses)}
                  </td>
                )}
                
                {(!isCustom || table.showHours) && (
                  <>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      {calculateTotalLectureHours(table.courses)}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      {calculateTotalTutorialHours(table.courses)}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      {calculateTotalPracticalHours(table.courses)}
                    </td>
                  </>
                )}
                
                <td className="border border-gray-300 px-3 py-2 text-center"></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Render inline edit form when editing structure */}
      {isCustom && isEditingStructure && (
        <div className="mt-4 border p-4 rounded-lg bg-blue-50 border-blue-200">
          <h4 className="font-medium text-blue-800 mb-3">Edit Table Structure</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Table Name</label>
              <input
                type="text"
                value={tableFormData.name}
                onChange={(e) => setTableFormData({...tableFormData, name: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            
            <div className="flex items-center justify-start">
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  checked={tableFormData.showTotals}
                  onChange={(e) => setTableFormData({...tableFormData, showTotals: e.target.checked})}
                  className="h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Show Totals</span>
              </label>
            </div>
          </div>
          
          <h4 className="font-medium text-gray-700 mb-2">Columns to Display</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={tableFormData.showComponent}
                  onChange={(e) => setTableFormData({...tableFormData, showComponent: e.target.checked})}
                  className="h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Component</span>
              </label>
              {tableFormData.showComponent && (
                <input
                  type="text"
                  value={tableFormData.componentHeader}
                  onChange={(e) => setTableFormData({...tableFormData, componentHeader: e.target.value})}
                  className="w-full mt-1 p-1 border border-gray-300 rounded text-sm"
                  placeholder="Header Text"
                />
              )}
            </div>
            
            <div>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={tableFormData.showCourseCode}
                  onChange={(e) => setTableFormData({...tableFormData, showCourseCode: e.target.checked})}
                  className="h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Course Code</span>
              </label>
              {tableFormData.showCourseCode && (
                <input
                  type="text"
                  value={tableFormData.courseCodeHeader}
                  onChange={(e) => setTableFormData({...tableFormData, courseCodeHeader: e.target.value})}
                  className="w-full mt-1 p-1 border border-gray-300 rounded text-sm"
                  placeholder="Header Text"
                />
              )}
            </div>
            
            <div>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={tableFormData.showTitle}
                  onChange={(e) => setTableFormData({...tableFormData, showTitle: e.target.checked})}
                  className="h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Title</span>
              </label>
              {tableFormData.showTitle && (
                <input
                  type="text"
                  value={tableFormData.titleHeader}
                  onChange={(e) => setTableFormData({...tableFormData, titleHeader: e.target.value})}
                  className="w-full mt-1 p-1 border border-gray-300 rounded text-sm"
                  placeholder="Header Text"
                />
              )}
            </div>
            
            <div>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={tableFormData.showHS}
                  onChange={(e) => setTableFormData({...tableFormData, showHS: e.target.checked})}
                  className="h-4 w-4 text-blue-600"
                />
                <span className="ml-2">H/S</span>
              </label>
              {tableFormData.showHS && (
                <input
                  type="text"
                  value={tableFormData.hsHeader}
                  onChange={(e) => setTableFormData({...tableFormData, hsHeader: e.target.value})}
                  className="w-full mt-1 p-1 border border-gray-300 rounded text-sm"
                  placeholder="Header Text"
                />
              )}
            </div>
            
            <div>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={tableFormData.showCredits}
                  onChange={(e) => setTableFormData({...tableFormData, showCredits: e.target.checked})}
                  className="h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Credits</span>
              </label>
              {tableFormData.showCredits && (
                <input
                  type="text"
                  value={tableFormData.creditsHeader}
                  onChange={(e) => setTableFormData({...tableFormData, creditsHeader: e.target.value})}
                  className="w-full mt-1 p-1 border border-gray-300 rounded text-sm"
                  placeholder="Header Text"
                />
              )}
            </div>
            
            <div>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={tableFormData.showHours}
                  onChange={(e) => setTableFormData({...tableFormData, showHours: e.target.checked})}
                  className="h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Hours/Week</span>
              </label>
              {tableFormData.showHours && (
                <input
                  type="text"
                  value={tableFormData.hoursHeader}
                  onChange={(e) => setTableFormData({...tableFormData, hoursHeader: e.target.value})}
                  className="w-full mt-1 p-1 border border-gray-300 rounded text-sm"
                  placeholder="Header Text"
                />
              )}
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={handleUpdateTableStructure}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Update Table
            </button>
            
            <button
              onClick={handleCancelEdit}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
      {/* Course Selector for this table */}
      {!isEditingStructure && (
        <CourseSelector 
          availableCourses={availableCourses} 
          uniqueComponents={uniqueComponents}
          onAddCourse={(course) => onAddCourse(tableIndex, course)}
          editingCourse={editingCourse && editingCourse.tableIndex === tableIndex ? editingCourse : null}
          onUpdateCourse={(courseId, course) => onUpdateCourse(tableIndex, courseId, course)}
        />
      )}
    </div>
  );
};

export default CurriculumTable;