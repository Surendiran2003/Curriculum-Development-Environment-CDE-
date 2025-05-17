import React, { useState } from "react";

const ReferenceDetails = ({ formData, setFormData, editingReference, setEditingReference }) => {
  const [newReference, setNewReference] = useState({
    id: null,
    author: "",
    title: "",
    publisher: "",
    year: ""
  });

  const handleAddReference = () => {
    // Create a new reference with a unique ID
    const newReferenceWithId = {
      ...newReference,
      id: editingReference !== null 
        ? editingReference 
        : Math.max(0, ...formData.references.map(ref => ref.id)) + 1
    };

    if (editingReference !== null) {
      // Update existing reference
      setFormData({
        ...formData,
        references: formData.references.map(ref => 
          ref.id === editingReference ? newReferenceWithId : ref
        )
      });
      setEditingReference(null);
    } else {
      // Add new reference
      setFormData({
        ...formData,
        references: [...formData.references, newReferenceWithId]
      });
    }

    // Reset the form
    setNewReference({
      id: null,
      author: "",
      title: "",
      publisher: "",
      year: ""
    });
  };

  const handleEditReference = (refId) => {
    const referenceToEdit = formData.references.find(ref => ref.id === refId);
    if (referenceToEdit) {
      setNewReference(referenceToEdit);
      setEditingReference(refId);
    }
  };

  const handleDeleteReference = (refId) => {
    setFormData({
      ...formData,
      references: formData.references.filter(ref => ref.id !== refId)
    });
  };

  const handleReferenceInputChange = (e) => {
    const { name, value } = e.target;
    setNewReference({
      ...newReference,
      [name]: value
    });
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Reference Materials</h2>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-medium mb-3">
          {editingReference !== null ? "Edit Reference" : "Add New Reference"}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Author(s)
            </label>
            <input
              type="text"
              name="author"
              value={newReference.author}
              onChange={handleReferenceInputChange}
              placeholder="Author names"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={newReference.title}
              onChange={handleReferenceInputChange}
              placeholder="Book or paper title"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Publisher
            </label>
            <input
              type="text"
              name="publisher"
              value={newReference.publisher}
              onChange={handleReferenceInputChange}
              placeholder="Publisher name"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Year/Edition
            </label>
            <input
              type="text"
              name="year"
              value={newReference.year}
              onChange={handleReferenceInputChange}
              placeholder="Publication year or edition"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          {editingReference !== null && (
            <button
              type="button"
              onClick={() => {
                setEditingReference(null);
                setNewReference({
                  id: null,
                  author: "",
                  title: "",
                  publisher: "",
                  year: ""
                });
              }}
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded mr-2 hover:bg-gray-400"
            >
              Cancel
            </button>
          )}
          
          <button
            type="button"
            onClick={handleAddReference}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            disabled={!newReference.author || !newReference.title}
          >
            {editingReference !== null ? "Update Reference" : "Add Reference"}
          </button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-3">Current References</h3>
        
        {formData.references.length === 0 ? (
          <p className="text-gray-500 italic">No references added yet.</p>
        ) : (
          <div className="space-y-4">
            {formData.references.map((ref) => (
              <div key={ref.id} className="border border-gray-200 rounded-lg p-4 bg-white flex justify-between">
                <div>
                  <p className="font-medium">{ref.author}</p>
                  <p className="text-gray-700 italic">{ref.title}</p>
                  <p className="text-gray-600 text-sm">
                    {ref.publisher}
                    {ref.publisher && ref.year ? ", " : ""}
                    {ref.year}
                  </p>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditReference(ref.id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteReference(ref.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferenceDetails;