// ModuleDetails.jsx
import React from 'react';

const ModuleDetails = ({ formData, setFormData, editingModule, setEditingModule }) => {
  const addModule = () => {
    const newModule = {
      id: Date.now(),
      title: `Module-${formData.modules.length + 1}`,
      content: '',
      hours: 9
    };
    setFormData({ ...formData, modules: [...formData.modules, newModule] });
    setEditingModule(newModule);
  };

  const updateModule = (id, field, value) => {
    const updatedModules = formData.modules.map(module =>
      module.id === id ? { ...module, [field]: value } : module
    );
    setFormData({ ...formData, modules: updatedModules });
  };

  const deleteModule = (id) => {
    const updatedModules = formData.modules.filter(module => module.id !== id);
    setFormData({ ...formData, modules: updatedModules });
    if (editingModule && editingModule.id === id) {
      setEditingModule(null);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold border-b border-gray-300 pb-2 mb-4">Module details</h2>
      <div className="space-y-4">
        {formData.modules.map((module) => (
          <div key={module.id} className="border border-gray-200 rounded p-3">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">{module.title}</h3>
              <div className="space-x-2">
                <button
                  onClick={() => setEditingModule(editingModule?.id === module.id ? null : module)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  {editingModule?.id === module.id ? 'Close' : 'Edit'}
                </button>
                <button
                  onClick={() => deleteModule(module.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>

            {editingModule?.id === module.id && (
              <div className="space-y-2 mt-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={module.title}
                    onChange={(e) => updateModule(module.id, 'title', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <textarea
                    value={module.content}
                    onChange={(e) => updateModule(module.id, 'content', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hours</label>
                  <input
                    type="number"
                    value={module.hours}
                    onChange={(e) => updateModule(module.id, 'hours', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={addModule}
        className="mt-3 bg-emerald-200 hover:bg-emerald-300 text-gray-800 py-2 px-4 rounded transition"
      >
        Add Module
      </button>
    </div>
  );
};

export default ModuleDetails;
