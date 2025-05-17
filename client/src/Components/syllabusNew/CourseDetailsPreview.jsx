import React from "react";

const CourseDetailsPreview = ({ formData }) => {
  return (
    <div className="overflow-x-auto border rounded-lg shadow p-4 bg-white">
      <h2 className="text-xl font-bold mb-4">Course Details Preview</h2>

      <table className="table-auto border-collapse w-full text-sm">
        <tbody>
          {/* First row: Year, Course Code/Title, Credits */}
          <tr>
            <td className="border-2 border-gray-800 p-2 w-24 text-center font-bold">Year</td>
            <td className="border-2 border-gray-800 p-2 w-24 text-center">{formData.year}</td>
            <td className="border-2 border-gray-800 p-2" rowSpan="3">
              <strong>Course Code:</strong> {formData.courseCode}<br />
              <strong>Course Title:</strong> {formData.courseTitle}
            </td>
            <td className="border-2 border-gray-800 p-2 w-28 text-center font-bold">Credits</td>
            <td className="border-2 border-gray-800 p-2 w-16 text-center">{formData.credits}</td>
          </tr>

          {/* Second row: Semester and Hours */}
          <tr>
            <td className="border-2 border-gray-800 p-2 text-center font-bold" rowSpan="2">Sem.</td>
            <td className="border-2 border-gray-800 p-2 text-center" rowSpan="2">{formData.semester}</td>
            <td className="border-2 border-gray-800 p-2 text-center font-bold">Hours</td>
            <td className="border-2 border-gray-800 p-2 text-center">{formData.totalHours}</td>
          </tr>

          {/* Third row: Category */}
          <tr>
            <td className="border-2 border-gray-800 p-2 text-center font-bold">Category</td>
            <td className="border-2 border-gray-800 p-2 text-center">{formData.category}</td>
          </tr>
          <tr>
            <td className="border-2 border-gray-800 p-2" colSpan="2">
              <strong>Course Prerequisites,<br />if any</strong>
            </td>
            <td className="border-2 border-gray-800 p-2" colSpan="3">
              {formData.prerequisites}
            </td>
          </tr>
          <tr>
            <td className="border-2 border-gray-800 p-2" colSpan="2">
              <strong>Internal Assessment<br />Marks: </strong>{formData.internalMarks}
            </td>
            <td className="border-2 border-gray-800 p-2">
              <strong>End Semester Marks: </strong>{formData.endSemesterMarks}
            </td>
            <td className="border-2 border-gray-800 p-2" colSpan="2">
              <strong>Duration of ESA (Theory): </strong>{formData.durationTheory}<br />
              <strong>Duration of ESA (Practical): </strong>{formData.durationPractical}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CourseDetailsPreview;
