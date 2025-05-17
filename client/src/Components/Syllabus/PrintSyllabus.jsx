  import React from 'react';

  const PrintSyllabus = ({ formData, ltpcValues }) => {
    return (
      <div className="container mx-auto p-4 print:p-0 font-serif">
        {/* Header Section */}

        {/* Course Information Table */}
        <table className="w-full mb-4 print:mb-2">
          <tbody>
            <tr>
              <td className="font-semibold w-1/4 print:font-medium print:text-sm">Course Code:</td>
              <td className="w-1/4 print:text-sm">{formData.courseCode}</td>
              <td className="font-semibold w-1/4 print:font-medium print:text-sm">L-T-P-C:</td>
              <td className="w-1/4 print:text-sm">{formData.ltpc}</td>
            </tr>
            <tr>
              <td className="font-semibold w-1/4 print:font-medium print:text-sm">Course Title:</td>
              <td colSpan="3" className="print:text-sm">{formData.courseTitle}</td>
            </tr>
            <tr>
              <td className="font-semibold w-1/4 print:font-medium print:text-sm">Prerequisites:</td>
              <td colSpan="3" className="print:text-sm">{formData.prerequisites}</td>
            </tr>
          </tbody>
        </table>

        {/* Objectives */}
        <div className="mb-4 print:mb-2">
          <h3 className="text-lg font-semibold mb-1 print:text-base print:font-medium">Objectives:</h3>
          <ul className="list-disc pl-5 print:pl-4">
            {formData.objectives.split(',').map((objective, index) => (
              <li key={index} className="print:text-sm">{objective.trim()}</li>
            ))}
          </ul>
        </div>

        {/* Outcomes */}
        <div className="mb-4 print:mb-2">
          <h3 className="text-lg font-semibold mb-1 print:text-base print:font-medium">Outcomes:</h3>
          <ul className="list-disc pl-5 print:pl-4">
            {formData.outcomes.split(',').map((outcome, index) => (
              <li key={index} className="print:text-sm">{outcome.trim()}</li>
            ))}
          </ul>
        </div>

        {/* Modules */}
        <div className="mb-4 print:mb-2">
          <h3 className="text-lg font-semibold mb-1 print:text-base print:font-medium">Modules:</h3>
          {formData.modules.map((module) => (
            <div key={module.id} className="mb-2 print:mb-1">
              <h4 className="font-semibold print:font-medium">Module-{module.id}: {module.title} ({module.hours} hrs)</h4>
              <p className="text-gray-800 print:text-xs">{module.content}</p>
            </div>
          ))}
        </div>

        {/* References */}
        <div className="mb-4 print:mb-2">
          <h3 className="text-lg font-semibold mb-1 print:text-base print:font-medium">Reference Book(s):</h3>
          <ol className="list-decimal pl-6 print:pl-5">
            {formData.references.map((ref) => (
              <li key={ref.id} className="mb-1 print:text-sm">
                {ref.author}. <i>{ref.title}</i>. {ref.publisher}, {ref.year}.
              </li>
            ))}
          </ol>
        </div>

        {/* Web Resources */}
        <div className="mb-4 print:mb-2">
          <h3 className="text-lg font-semibold mb-1 print:text-base print:font-medium">Web Resource(s):</h3>
          <ul className="list-disc pl-5 print:pl-4">
            {formData.webResources.map((resource) => (
              <li key={resource.id} className="mb-1 print:text-sm">
                <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 print:text-blue-500">
                  {resource.title || resource.url}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Online Courses */}
        <div className="mb-4 print:mb-2">
          <h3 className="text-lg font-semibold mb-1 print:text-base print:font-medium">Online Course(s):</h3>
          <ul className="list-disc pl-5 print:pl-4">
            {formData.onlineCourses.map((course) => (
              <li key={course.id} className="mb-1 print:text-sm">
                <a href={course.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 print:text-blue-500">
                  {course.title || course.url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  export default PrintSyllabus;
