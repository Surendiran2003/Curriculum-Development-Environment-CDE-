import React from 'react';

const SyllabusPreview = ({ formData, ltpcValues }) => {
  return (
    <div className="md:w-1/2 border border-gray-200 rounded-lg p-6 bg-gray-50">
      <div className="text-center mb-6">
        <h1 className="text-lg font-bold text-gray-800">{formData.courseCode}: {formData.courseTitle}</h1>
        
        <div className="flex justify-end">
          <table className="border-collapse border border-gray-300 text-sm">
            {/* LTPC Table */}
          </table>
        </div>
      </div>

      <div className="space-y-4 text-sm">
        {/* Prerequisites */}
        <div>
          <p className="font-semibold italic">Prerequisites:</p>
          <ul className="list-disc pl-6">
            <li>{formData.prerequisites}</li>
          </ul>
        </div>

        {/* Objectives */}
        <div>
          <p className="font-semibold italic">Objectives:</p>
          <ul className="list-disc pl-6">
            {formData.objectives.split(',').map((obj, idx) => (
              <li key={idx}>{obj.trim()}</li>
            ))}
          </ul>
        </div>

        {/* Outcomes */}
        <div>
          <p className="font-semibold italic">Outcomes:</p>
          <ul className="list-disc pl-6">
            {formData.outcomes.split(',').map((outcome, idx) => (
              <li key={idx}>{outcome.trim()}</li>
            ))}
          </ul>
        </div>

        {/* Modules */}
        <div className="space-y-3">
          {formData.modules.map((module) => (
            <div key={module.id}>
              <p className="font-semibold italic flex justify-between">
                <span>{module.title}:</span>
                <span>({module.hours} hrs)</span>
              </p>
              <p className="text-gray-700">{module.content}</p>
            </div>
          ))}
        </div>

        {/* References */}
        <div>
          <p className="font-semibold italic">Reference Book(s):</p>
          <ol className="list-decimal pl-6">
            {formData.references.map((ref) => (
              <li key={ref.id}>
                {ref.author}. {ref.title} – {ref.publisher}, {ref.year}.
              </li>
            ))}
          </ol>
        </div>

        {/* Web Resources */}
        <div>
          <p className="font-semibold italic">Web Resource(s):</p>
          <ol className="list-decimal pl-6">
            {formData.webResources.map((resource) => (
              <li key={resource.id}>
                {resource.title} : {resource.url}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default SyllabusPreview;