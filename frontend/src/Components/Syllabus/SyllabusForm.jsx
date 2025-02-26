import React, { useState, useEffect } from 'react';
import FormInputs from './FormInputs';
import SyllabusPreview from './SyllabusPreview';
// import PrintSyllabus from './PrintSyllabus';

const SyllabusForm = () => {
  // ... All the existing state and effect hooks ...
  // ... All the handler functions (handleInputChange, addModule, updateModule, etc.) ...

  return (
    <div className="bg-white min-h-screen">
      {showPrintPreview ? (
        <div className="fixed inset-0 bg-white z-50 overflow-auto">
          <div className="p-4 flex justify-between items-center bg-gray-100 sticky top-0">
            <h2 className="text-xl font-bold">Print Preview</h2>
            <div className="space-x-2">
              <button 
                onClick={() => window.print()} 
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition"
              >
                Print
              </button>
              <button 
                onClick={() => setShowPrintPreview(false)} 
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded transition"
              >
                Close
              </button>
            </div>
          </div>
          <div className="p-8">
            <PrintSyllabus formData={formData} ltpcValues={ltpcValues} />
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <FormInputs
              formData={formData}
              handleInputChange={handleInputChange}
              addModule={addModule}
              updateModule={updateModule}
              deleteModule={deleteModule}
              editingModule={editingModule}
              setEditingModule={setEditingModule}
              addReference={addReference}
              updateReference={updateReference}
              deleteReference={deleteReference}
              editingReference={editingReference}
              setEditingReference={setEditingReference}
              addWebResource={addWebResource}
              updateWebResource={updateWebResource}
              deleteWebResource={deleteWebResource}
              editingResource={editingResource}
              setEditingResource={setEditingResource}
              setShowPrintPreview={setShowPrintPreview}
            />
            
            <SyllabusPreview
              formData={formData}
              ltpcValues={ltpcValues}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SyllabusForm;