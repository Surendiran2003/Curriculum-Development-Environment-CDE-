import React from 'react';

export const PrintSyllabus = ({ formData, ltpcValues }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">{formData.courseCode}: {formData.courseTitle}</h1>
        
        <div className="flex justify-end mt-4">
          <table className="border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">L</th>
                <th className="border border-gray-300 p-2">T</th>
                <th className="border border-gray-300 p-2">P</th>
                <th className="border border-gray-300 p-2">C</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">{ltpcValues.L}</td>
                <td className="border border-gray-300 p-2">{ltpcValues.T}</td>
                <td className="border border-gray-300 p-2">{ltpcValues.P}</td>
                <td className="border border-gray-300 p-2">{ltpcValues.C}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold italic mb-2">Prerequisites:</h2>
          <ul className="list-disc pl-8">
            <li>{formData.prerequisites}</li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold italic mb-2">Objectives:</h2>
          <ul className="list-disc pl-8">
            {formData.objectives.split(',').map((obj, idx) => (
              <li key={idx}>{obj.trim()}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold italic mb-2">Outcomes:</h2>
          <ul className="list-disc pl-8">
            {formData.outcomes.split(',').map((outcome, idx) => (
              <li key={idx}>{outcome.trim()}</li>
            ))}
          </ul>
        </div>
        
        {/* Module content */}
        <div className="space-y-4">
          {formData.modules.map((module) => (
            <div key={module.id}>
              <h2 className="text-lg font-semibold italic mb-2 flex justify-between">
                <span>{module.title}:</span>
                <span>({module.hours} hrs)</span>
              </h2>
              <p className="text-gray-800">{module.content}</p>
            </div>
          ))}
        </div>
        
        {/* References */}
        <div>
          <h2 className="text-lg font-semibold italic mb-2">Reference Book(s):</h2>
          <ol className="list-decimal pl-8">
            {formData.references.map((ref) => (
              <li key={ref.id} className="mb-2">
                {ref.author}. <span className="italic">{ref.title}</span> – {ref.publisher}, {ref.year}.
              </li>
            ))}
          </ol>
        </div>
        
        {/* Web Resources */}
        <div>
          <h2 className="text-lg font-semibold italic mb-2">Web Resource(s):</h2>
          <ol className="list-decimal pl-8">
            {formData.webResources.map((resource) => (
              <li key={resource.id} className="mb-2">
                {resource.title}: <span className="text-blue-600">{resource.url}</span>
              </li>
            ))}
          </ol>
        </div>
        
        {/* Online Courses */}
        {formData.onlineCourses && formData.onlineCourses.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold italic mb-2">Online Course(s):</h2>
            <ol className="list-decimal pl-8">
              {formData.onlineCourses.map((course) => (
                <li key={course.id} className="mb-2">
                  {course.title}: <span className="text-blue-600">{course.url}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">© {new Date().getFullYear()} - Curriculum Development Environment</p>
      </div>
    </div>
  );
};