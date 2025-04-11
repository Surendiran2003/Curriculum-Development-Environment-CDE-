import React from 'react';

const PracticalComponent = ({ formData, setFormData }) => {
  const addExercise = () => {
    const newExercises = [...formData.practicalExercises, ""];
    setFormData({ ...formData, practicalExercises: newExercises });
  };

  const updateExercise = (index, value) => {
    const updatedExercises = [...formData.practicalExercises];
    updatedExercises[index] = value;
    setFormData({ ...formData, practicalExercises: updatedExercises });
  };

  const deleteExercise = (index) => {
    const updatedExercises = formData.practicalExercises.filter((_, i) => i !== index);
    setFormData({ ...formData, practicalExercises: updatedExercises });
  };

  return (
    <div>
      <h2 className="text-xl font-bold border-b border-gray-300 pb-2 mb-4">Practical Component</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Practical Hours
        </label>
        <input
          type="number"
          name="practicalHours"
          value={formData.practicalHours}
          onChange={(e) => setFormData({...formData, practicalHours: e.target.value})}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Exercises</h3>
        {formData.practicalExercises.map((exercise, index) => (
          <div key={index} className="flex items-start space-x-2">
            <div className="flex-grow">
              <div className="flex items-center">
                <span className="mr-2">{index + 1}.</span>
                <textarea
                  value={exercise}
                  onChange={(e) => updateExercise(index, e.target.value)}
                  placeholder="Enter exercise details"
                  className="w-full p-2 border border-gray-300 rounded"
                  rows="2"
                />
              </div>
            </div>
            <button
              onClick={() => deleteExercise(index)}
              className="text-red-500 hover:text-red-700 mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={addExercise}
        className="mt-3 bg-emerald-200 hover:bg-emerald-300 text-gray-800 py-2 px-4 rounded transition"
      >
        Add Exercise
      </button>
    </div>
  );
};

export default PracticalComponent;