import React from 'react';

const FormInputs = ({
  formData,
  handleInputChange,
  addModule,
  updateModule,
  deleteModule,
  editingModule,
  setEditingModule,
  addReference,
  updateReference,
  deleteReference,
  editingReference,
  setEditingReference,
  addWebResource,
  updateWebResource,
  deleteWebResource,
  editingResource,
  setEditingResource,
  setShowPrintPreview
}) => {
  return (
    <div className="md:w-1/2 space-y-6">
      {/* All the form input sections */}
      <div>
        <h2 className="text-xl font-bold border-b border-gray-300 pb-2 mb-4">Syllabus Details</h2>
        {/* ... rest of the form inputs ... */}
      </div>

      {/* Module Section */}
      <div>
        <h2 className="text-xl font-bold border-b border-gray-300 pb-2 mb-4">Module details</h2>
        {/* ... module inputs ... */}
      </div>

      {/* References Section */}
      <div>
        <h2 className="text-xl font-bold border-b border-gray-300 pb-2 mb-4">Reference details</h2>
        {/* ... reference inputs ... */}
      </div>

      {/* Web Resources Section */}
      <div>
        <h2 className="text-xl font-bold border-b border-gray-300 pb-2 mb-4">Web Resource Details</h2>
        {/* ... web resource inputs ... */}
      </div>

      {/* Print Button */}
      <div className="flex justify-center mt-8">
        <button 
          onClick={() => setShowPrintPreview(true)}
          className="bg-emerald-200 hover:bg-emerald-300 text-gray-800 py-2 px-12 rounded transition"
        >
          Print
        </button>
      </div>
    </div>
  );
};

export default FormInputs;