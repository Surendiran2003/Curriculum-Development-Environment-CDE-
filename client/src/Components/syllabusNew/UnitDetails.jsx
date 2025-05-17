import React from 'react';

const UnitDetails = ({ formData, setFormData, editingUnit, setEditingUnit }) => {
  const addUnit = () => {
    const newUnit = {
      id: Date.now(),
      number: formData.units.length + 1,
      title: `Unit ${formData.units.length + 1}`,
      content: '',
      hours: 9
    };
    setFormData({ ...formData, units: [...formData.units, newUnit] });
    setEditingUnit(newUnit);
  };

  const updateUnit = (id, field, value) => {
    const updatedUnits = formData.units.map(unit =>
      unit.id === id ? { ...unit, [field]: value } : unit
    );
    setFormData({ ...formData, units: updatedUnits });
  };

  const deleteUnit = (id) => {
    const updatedUnits = formData.units.filter(unit => unit.id !== id);
    setFormData({ ...formData, units: updatedUnits });
    if (editingUnit && editingUnit.id === id) {
      setEditingUnit(null);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold border-b border-gray-300 pb-2 mb-4">Unit Details</h2>
      <div className="space-y-4">
        {formData.units.map((unit) => (
          <div key={unit.id} className="border border-gray-200 rounded p-3">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Unit {unit.number}: {unit.title}</h3>
              <div className="space-x-2">
                <button
                  onClick={() => setEditingUnit(editingUnit?.id === unit.id ? null : unit)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  {editingUnit?.id === unit.id ? 'Close' : 'Edit'}
                </button>
                <button
                  onClick={() => deleteUnit(unit.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>

            {editingUnit?.id === unit.id && (
              <div className="space-y-2 mt-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit Number</label>
                  <input
                    type="text"
                    value={unit.number}
                    onChange={(e) => updateUnit(unit.id, 'number', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={unit.title}
                    onChange={(e) => updateUnit(unit.id, 'title', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <textarea
                    value={unit.content}
                    onChange={(e) => updateUnit(unit.id, 'content', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    rows="4"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hours</label>
                  <input
                    type="number"
                    value={unit.hours}
                    onChange={(e) => updateUnit(unit.id, 'hours', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={addUnit}
        className="mt-3 bg-emerald-200 hover:bg-emerald-300 text-gray-800 py-2 px-4 rounded transition"
      >
        Add Unit
      </button>
    </div>
  );
};

export default UnitDetails;