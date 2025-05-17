import React from 'react';

const CourseOutcomes = ({ formData, setFormData }) => {
  const addOutcome = () => {
    const newOutcomes = [...formData.outcomes, ""];
    setFormData({ ...formData, outcomes: newOutcomes });
  };

  const updateOutcome = (index, value) => {
    const updatedOutcomes = [...formData.outcomes];
    updatedOutcomes[index] = value;
    setFormData({ ...formData, outcomes: updatedOutcomes });
  };

  const deleteOutcome = (index) => {
    const updatedOutcomes = formData.outcomes.filter((_, i) => i !== index);
    setFormData({ ...formData, outcomes: updatedOutcomes });
  };

  return (
    <div>
      <h2 className="text-xl font-bold border-b border-gray-300 pb-2 mb-4">Course Outcomes</h2>
      <div className="space-y-4">
        {formData.outcomes.map((outcome, index) => (
          <div key={index} className="flex items-start space-x-2">
            <div className="flex-grow">
              <div className="flex items-center">
                <span className="mr-2">●</span>
                <textarea
                  value={outcome}
                  onChange={(e) => updateOutcome(index, e.target.value)}
                  placeholder="Enter course outcome"
                  className="w-full p-2 border border-gray-300 rounded"
                  rows="2"
                />
              </div>
            </div>
            <button
              onClick={() => deleteOutcome(index)}
              className="text-red-500 hover:text-red-700 mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={addOutcome}
        className="mt-3 bg-emerald-200 hover:bg-emerald-300 text-gray-800 py-2 px-4 rounded transition"
      >
        Add Outcome
      </button>
    </div>
  );
};

export default CourseOutcomes;