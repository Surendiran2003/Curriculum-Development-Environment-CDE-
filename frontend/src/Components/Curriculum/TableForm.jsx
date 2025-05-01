import React from 'react';

const TableForm = ({ newTableData, setNewTableData, handleAddCustomTable, isEditing, onCancel }) => {
  // Log props for debugging
  console.log("TableForm props:", { isEditing, newTableData });
  
  return (
    <div className="bg-white p-5 rounded-lg border border-gray-200 mb-6">
      <h3 className="font-medium text-lg mb-4">
        {isEditing ? 'Edit Custom Table' : 'Create Custom Table'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Table Name</label>
          <input
            type="text"
            value={newTableData.name}
            onChange={(e) => setNewTableData({...newTableData, name: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        
        <div className="flex items-center justify-start">
          <label className="inline-flex items-center mr-4">
            <input
              type="checkbox"
              checked={newTableData.showTotals}
              onChange={(e) => setNewTableData({...newTableData, showTotals: e.target.checked})}
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
              checked={newTableData.showComponent}
              onChange={(e) => setNewTableData({...newTableData, showComponent: e.target.checked})}
              className="h-4 w-4 text-blue-600"
            />
            <span className="ml-2">Component</span>
          </label>
          {newTableData.showComponent && (
            <input
              type="text"
              value={newTableData.componentHeader}
              onChange={(e) => setNewTableData({...newTableData, componentHeader: e.target.value})}
              className="w-full mt-1 p-1 border border-gray-300 rounded text-sm"
              placeholder="Header Text"
            />
          )}
        </div>
        
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={newTableData.showCourseCode}
              onChange={(e) => setNewTableData({...newTableData, showCourseCode: e.target.checked})}
              className="h-4 w-4 text-blue-600"
            />
            <span className="ml-2">Course Code</span>
          </label>
          {newTableData.showCourseCode && (
            <input
              type="text"
              value={newTableData.courseCodeHeader}
              onChange={(e) => setNewTableData({...newTableData, courseCodeHeader: e.target.value})}
              className="w-full mt-1 p-1 border border-gray-300 rounded text-sm"
              placeholder="Header Text"
            />
          )}
        </div>
        
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={newTableData.showTitle}
              onChange={(e) => setNewTableData({...newTableData, showTitle: e.target.checked})}
              className="h-4 w-4 text-blue-600"
            />
            <span className="ml-2">Title</span>
          </label>
          {newTableData.showTitle && (
            <input
              type="text"
              value={newTableData.titleHeader}
              onChange={(e) => setNewTableData({...newTableData, titleHeader: e.target.value})}
              className="w-full mt-1 p-1 border border-gray-300 rounded text-sm"
              placeholder="Header Text"
            />
          )}
        </div>
        
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={newTableData.showHS}
              onChange={(e) => setNewTableData({...newTableData, showHS: e.target.checked})}
              className="h-4 w-4 text-blue-600"
            />
            <span className="ml-2">H/S</span>
          </label>
          {newTableData.showHS && (
            <input
              type="text"
              value={newTableData.hsHeader}
              onChange={(e) => setNewTableData({...newTableData, hsHeader: e.target.value})}
              className="w-full mt-1 p-1 border border-gray-300 rounded text-sm"
              placeholder="Header Text"
            />
          )}
        </div>
        
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={newTableData.showCredits}
              onChange={(e) => setNewTableData({...newTableData, showCredits: e.target.checked})}
              className="h-4 w-4 text-blue-600"
            />
            <span className="ml-2">Credits</span>
          </label>
          {newTableData.showCredits && (
            <input
              type="text"
              value={newTableData.creditsHeader}
              onChange={(e) => setNewTableData({...newTableData, creditsHeader: e.target.value})}
              className="w-full mt-1 p-1 border border-gray-300 rounded text-sm"
              placeholder="Header Text"
            />
          )}
        </div>
        
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={newTableData.showHours}
              onChange={(e) => setNewTableData({...newTableData, showHours: e.target.checked})}
              className="h-4 w-4 text-blue-600"
            />
            <span className="ml-2">Hours/Week</span>
          </label>
          {newTableData.showHours && (
            <input
              type="text"
              value={newTableData.hoursHeader}
              onChange={(e) => setNewTableData({...newTableData, hoursHeader: e.target.value})}
              className="w-full mt-1 p-1 border border-gray-300 rounded text-sm"
              placeholder="Header Text"
            />
          )}
        </div>
      </div>
      
      <div className="flex space-x-2">
        <button
          onClick={handleAddCustomTable}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          {isEditing ? 'Update Table' : 'Create Table'}
        </button>
        
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TableForm;