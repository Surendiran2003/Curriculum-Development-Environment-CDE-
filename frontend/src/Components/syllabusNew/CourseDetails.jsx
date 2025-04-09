import React from 'react';

const CourseDetails = ({ formData, handleInputChange }) => {
  return (
    <div className="p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold border-b border-gray-500 pb-2 mb-4">Course Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Course Code
          </label>
          <input
            type="text"
            name="courseCode"
            value={formData.courseCode}
            onChange={handleInputChange}
            placeholder="e.g. CSCS101"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 transition border-emerald-300 focus:ring-emerald-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Course Title
          </label>
          <input
            type="text"
            name="courseTitle"
            value={formData.courseTitle}
            onChange={handleInputChange}
            placeholder="e.g. Digital Logic Fundamentals"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 transition border-emerald-300 focus:ring-emerald-200"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Credits
          </label>
          <input
            type="text"
            name="credits"
            value={formData.credits}
            onChange={handleInputChange}
            placeholder="e.g. 4"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 transition border-emerald-300 focus:ring-emerald-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Semester
          </label>
          <input
            type="text"
            name="semester"
            value={formData.semester}
            onChange={handleInputChange}
            placeholder="e.g. I"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 transition border-emerald-300 focus:ring-emerald-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Total Hours
          </label>
          <input
            type="text"
            name="totalHours"
            value={formData.totalHours}
            onChange={handleInputChange}
            placeholder="e.g. 75"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 transition border-emerald-300 focus:ring-emerald-200"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            placeholder="e.g. C"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 transition border-emerald-300 focus:ring-emerald-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Prerequisites
          </label>
          <input
            type="text"
            name="prerequisites"
            value={formData.prerequisites}
            onChange={handleInputChange}
            placeholder="e.g. NIL"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 transition border-emerald-300 focus:ring-emerald-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Year
          </label>
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            placeholder="e.g. I"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 transition border-emerald-300 focus:ring-emerald-200"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Internal Assessment Marks
          </label>
          <input
            type="text"
            name="internalMarks"
            value={formData.internalMarks}
            onChange={handleInputChange}
            placeholder="e.g. 40"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 transition border-emerald-300 focus:ring-emerald-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            End Semester Marks
          </label>
          <input
            type="text"
            name="endSemesterMarks"
            value={formData.endSemesterMarks}
            onChange={handleInputChange}
            placeholder="e.g. 60"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 transition border-emerald-300 focus:ring-emerald-200"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Duration of ESA (Theory)
          </label>
          <input
            type="text"
            name="durationTheory"
            value={formData.durationTheory}
            onChange={handleInputChange}
            placeholder="e.g. 03 hrs."
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 transition border-emerald-300 focus:ring-emerald-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Duration of ESA (Practical)
          </label>
          <input
            type="text"
            name="durationPractical"
            value={formData.durationPractical}
            onChange={handleInputChange}
            placeholder="e.g. 03 hrs."
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 transition border-emerald-300 focus:ring-emerald-200"
          />
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;