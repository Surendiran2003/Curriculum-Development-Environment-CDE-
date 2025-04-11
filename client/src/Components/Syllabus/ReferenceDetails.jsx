import React from 'react';

const ReferenceDetails = ({ formData, setFormData, editingReference, setEditingReference }) => {
  const addReference = () => {
    const newRef = {
      id: Date.now(),
      author: '',
      title: '',
      publisher: '',
      year: ''
    };
    setFormData({ ...formData, references: [...formData.references, newRef] });
    setEditingReference(newRef); // Open edit mode for the new reference
  };

  const updateReference = (id, field, value) => {
    const updatedRefs = formData.references.map((ref) =>
      ref.id === id ? { ...ref, [field]: value } : ref
    );
    setFormData({ ...formData, references: updatedRefs });

    // Ensure the editing reference stays in sync
    if (editingReference?.id === id) {
      setEditingReference({ ...editingReference, [field]: value });
    }
  };

  const deleteReference = (id) => {
    const updatedRefs = formData.references.filter((ref) => ref.id !== id);
    setFormData({ ...formData, references: updatedRefs });

    // Reset editingReference if the deleted reference was being edited
    if (editingReference?.id === id) {
      setEditingReference(null);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold border-b border-gray-300 pb-2 mb-4">Reference Details</h2>
      <div className="space-y-4">
        {formData.references.map((ref) => (
          <div key={ref.id} className="border border-gray-200 rounded p-3">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium truncate">{ref.title || 'New Reference'}</h3>
              <div className="space-x-2">
                <button
                  onClick={() =>
                    setEditingReference(editingReference?.id === ref.id ? null : { ...ref })
                  }
                  className="text-blue-500 hover:text-blue-700"
                >
                  {editingReference?.id === ref.id ? 'Close' : 'Edit'}
                </button>
                <button
                  onClick={() => deleteReference(ref.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>

            {editingReference?.id === ref.id && (
              <div className="space-y-2 mt-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Author(s)</label>
                  <input
                    type="text"
                    value={editingReference.author}
                    onChange={(e) => updateReference(ref.id, 'author', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={editingReference.title}
                    onChange={(e) => updateReference(ref.id, 'title', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Publisher</label>
                  <input
                    type="text"
                    value={editingReference.publisher}
                    onChange={(e) => updateReference(ref.id, 'publisher', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <input
                    type="text"
                    value={editingReference.year}
                    onChange={(e) => updateReference(ref.id, 'year', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={addReference}
        className="mt-3 bg-emerald-200 hover:bg-emerald-300 text-gray-800 py-2 px-4 rounded transition"
      >
        Add Reference
      </button>
    </div>
  );
};

export default ReferenceDetails;
