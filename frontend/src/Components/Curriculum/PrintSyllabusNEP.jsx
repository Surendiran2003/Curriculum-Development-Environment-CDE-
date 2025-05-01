import React, { useRef } from "react";

// Modified to accept course data from mockData structure
const PrintSyllabusNEP = ({ course, semesterNumber, academicYear }) => {
  const tableRef = useRef(null);
  
  // Extract syllabus data with fallbacks for missing properties
  const syllabus = course.syllabus || {};
  
  // Map course data to required format
  const formData = {
    year: academicYear || "2025",
    courseCode: course.code || course.courseCode,
    courseTitle: course.title,
    semester: semesterNumber.toString(),
    totalHours: (parseInt(course.lectureHours || 0) + 
                parseInt(course.tutorialHours || 0) + 
                parseInt(course.practicalHours || 0)).toString(),
    category: course.component,
    credits: course.credits.toString(),
    prerequisites: syllabus.prerequisites || "None",
    internalMarks: syllabus.internalMarks || "40",
    endSemesterMarks: syllabus.endSemesterMarks || "60",
    durationTheory: syllabus.durationTheory || "3 hours",
    durationPractical: syllabus.durationPractical || "N/A",
    outcomes: syllabus.outcomes || syllabus.objectives || ["Course outcome information not available"],
    units: syllabus.units || [
      { id: 1, number: 1, title: "Course Content", content: syllabus.description || "Detailed content not available", hours: course.lectureHours || "3" }
    ],
    practicalExercises: syllabus.practicalExercises || 
      (parseInt(course.practicalHours) > 0 ? ["Practical component details not specified"] : []),
    references: syllabus.references || [],
    designedBy: syllabus.designedBy || "Department Faculty"
  };

  // Calculate practical hours distribution if needed
  const practicalHoursPerExercise =
    syllabus.practicalHoursPerExercise ||
    Array(formData.practicalExercises.length).fill(
      Math.floor(parseInt(course.practicalHours || 0) / Math.max(formData.practicalExercises.length, 1))
    );

  return (
    <div className="relative z-10">
      <table
        ref={tableRef}
        className="syllabus-table w-full border-collapse border-2 border-gray-800 print:border-black"
      >
        <tbody>
          <tr>
            <td className="border-2 border-gray-800 p-2 w-24 text-center font-bold">
              Year
            </td>
            <td className="border-2 border-gray-800 p-2 w-24 text-center">
              {formData.year}
            </td>
            <td className="border-2 border-gray-800 p-2" rowSpan="3">
              <strong>Course Code:</strong> {formData.courseCode}
              <br />
              <strong>Course Title:</strong> {formData.courseTitle}
            </td>
            <td className="border-2 border-gray-800 p-2 w-28 text-center font-bold">
              Credits
            </td>
            <td className="border-2 border-gray-800 p-2 w-16 text-center">
              {formData.credits}
            </td>
          </tr>

          <tr>
            <td className="border-2 border-gray-800 p-2 text-center font-bold" rowSpan="2">
              Sem.
            </td>
            <td className="border-2 border-gray-800 p-2 text-center" rowSpan="2">
              {formData.semester}
            </td>
            <td className="border-2 border-gray-800 p-2 text-center font-bold">
              Hours
            </td>
            <td className="border-2 border-gray-800 p-2 text-center">
              {formData.totalHours}
            </td>
          </tr>

          <tr>
            <td className="border-2 border-gray-800 p-2 text-center font-bold">
              Category
            </td>
            <td className="border-2 border-gray-800 p-2 text-center">
              {formData.category}
            </td>
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
              <strong>Internal Assessment<br />Marks: </strong>
              {formData.internalMarks}
            </td>
            <td className="border-2 border-gray-800 p-2">
              <strong>End Semester Marks: </strong>
              {formData.endSemesterMarks}
            </td>
            <td className="border-2 border-gray-800 p-2" colSpan="2">
              <strong>Duration of ESA (Theory): </strong>
              {formData.durationTheory}
              <br />
              <strong>Duration of ESA (Practical): </strong>
              {formData.durationPractical}
            </td>
          </tr>

          {formData.outcomes && formData.outcomes.length > 0 && (
            <tr>
              <td className="border-2 border-gray-800 p-2 font-bold">
                Course<br />Outcomes
              </td>
              <td className="border-2 border-gray-800 p-2" colSpan="4">
                <ul className="list-none pl-0 m-0">
                  {formData.outcomes.map((outcome, index) => (
                    <li key={index} className="flex mb-2">
                      <span className="mr-4 ml-2">●</span>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          )}

          {formData.units && formData.units.length > 0 && (
            <>
              <tr>
                <td className="border-2 border-gray-800 p-2 text-center font-bold">
                  Unit No.
                </td>
                <td className="border-2 border-gray-800 p-2 text-center font-bold" colSpan="3">
                  Course Content
                </td>
                <td className="border-2 border-gray-800 p-2 text-center font-bold">
                  Hours
                </td>
              </tr>

              <tr>
                <td className="border-2 border-gray-800 p-2 text-center bg-gray-200 gray-bg font-bold" colSpan="5">
                  Theory Component
                </td>
              </tr>

              {formData.units.map((unit, index) => (
                <tr key={unit.id || index}>
                  <td className="border-2 border-gray-800 p-2">
                    <strong>Unit {unit.number || index+1}</strong>
                    <div className="font-bold">{unit.title}</div>
                  </td>
                  <td className="border-2 border-gray-800 p-2" colSpan="3">
                    {typeof unit.content === 'string' && unit.content.includes(' – ') ? 
                      unit.content.split(' – ').map((part, idx) => (
                        <React.Fragment key={idx}>
                          {idx > 0 && <span> – </span>}
                          {part}
                        </React.Fragment>
                      )) : unit.content}
                  </td>
                  <td className="border-2 border-gray-800 p-2 text-center">
                    {unit.hours}
                  </td>
                </tr>
              ))}
            </>
          )}

          {formData.practicalExercises && formData.practicalExercises.length > 0 && (
            <>
              <tr>
                <td className="border-2 border-gray-800 p-2 text-center bg-gray-200 gray-bg font-bold" colSpan="5">
                  Practical Component
                </td>
              </tr>

              {formData.practicalExercises.map((exercise, index) => (
                <tr key={index}>
                  <td className="border-2 border-gray-800 p-2">
                    <strong>Exercise {index + 1}</strong>
                  </td>
                  <td className="border-2 border-gray-800 p-2" colSpan="3">
                    {exercise}
                  </td>
                  <td className="border-2 border-gray-800 p-2 text-center">
                    {practicalHoursPerExercise[index]}
                  </td>
                </tr>
              ))}
            </>
          )}

          {formData.references && formData.references.length > 0 && (
            <>
              <tr>
                <td className="border-2 border-gray-800 p-2 font-bold" colSpan="5">
                  Recommended Learning Resources
                </td>
              </tr>

              <tr>
                <td className="border-2 border-gray-800 p-2 font-bold">
                  Print<br />Resources
                </td>
                <td className="border-2 border-gray-800 p-2" colSpan="4">
                  <ol className="mt-1">
                    {formData.references.map((ref, index) => (
                      <li key={index}>
                        {ref.author}, "{ref.title}", {ref.publisher}, {ref.year}.
                      </li>
                    ))}
                  </ol>
                </td>
              </tr>
            </>
          )}

          <tr>
            <td className="border-2 border-gray-800 p-2" colSpan="5">
              <strong>Syllabus Design:</strong> {formData.designedBy}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PrintSyllabusNEP;
