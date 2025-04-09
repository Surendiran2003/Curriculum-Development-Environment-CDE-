import React from 'react';

const CourseDetails = ({ formData, handleInputChange, darkMode }) => {
  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} p-4 rounded-lg shadow-md`}>
      <h2 className="text-xl font-bold border-b border-gray-500 pb-2 mb-4">Course Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
            Course Code
          </label>
          <input
            type="text"
            name="courseCode"
            value={formData.courseCode}
            onChange={handleInputChange}
            placeholder="Course code"
            className={`w-full p-2 border rounded focus:outline-none focus:ring-2 transition ${darkMode ? "border-gray-600 bg-gray-800 text-white focus:ring-emerald-400" : "border-emerald-300 focus:ring-emerald-200"}`}
          />
        </div>

        <div>
          <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
            L-T-P-C
          </label>
          <input
            type="text"
            name="ltpc"
            value={formData.ltpc}
            onChange={handleInputChange}
            placeholder="L-T-P-C (e.g. 3-0-0-3)"
            className={`w-full p-2 border rounded focus:outline-none focus:ring-2 transition ${darkMode ? "border-gray-600 bg-gray-800 text-white focus:ring-emerald-400" : "border-emerald-300 focus:ring-emerald-200"}`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
            Course Title
          </label>
          <input
            type="text"
            name="courseTitle"
            value={formData.courseTitle}
            onChange={handleInputChange}
            placeholder="Course Title"
            className={`w-full p-2 border rounded focus:outline-none focus:ring-2 transition ${darkMode ? "border-gray-600 bg-gray-800 text-white focus:ring-emerald-400" : "border-emerald-300 focus:ring-emerald-200"}`}
          />
        </div>

        <div>
          <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
            Prerequisites
          </label>
          <input
            type="text"
            name="prerequisites"
            value={formData.prerequisites}
            onChange={handleInputChange}
            placeholder="Prerequisites"
            className={`w-full p-2 border rounded focus:outline-none focus:ring-2 transition ${darkMode ? "border-gray-600 bg-gray-800 text-white focus:ring-emerald-400" : "border-emerald-300 focus:ring-emerald-200"}`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-4">
        <div>
          <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
            Objectives (comma separated)
          </label>
          <textarea
            name="objectives"
            value={formData.objectives}
            onChange={handleInputChange}
            placeholder="Objectives (separate with commas)"
            className={`w-full p-2 border rounded focus:outline-none focus:ring-2 transition ${darkMode ? "border-gray-600 bg-gray-800 text-white focus:ring-emerald-400" : "border-emerald-300 focus:ring-emerald-200"}`}
            rows="2"
          />
        </div>

        <div>
          <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}>
            Outcomes (comma separated)
          </label>
          <textarea
            name="outcomes"
            value={formData.outcomes}
            onChange={handleInputChange}
            placeholder="Outcomes (separate with commas)"
            className={`w-full p-2 border rounded focus:outline-none focus:ring-2 transition ${darkMode ? "border-gray-600 bg-gray-800 text-white focus:ring-emerald-400" : "border-emerald-300 focus:ring-emerald-200"}`}
            rows="2"
          />
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
