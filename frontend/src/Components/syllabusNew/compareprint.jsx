import React, { useRef } from "react";

const PrintSyllabusNEP = ({ formData }) => {
  const tableRef = useRef(null);

  const practicalHoursPerExercise =
    formData.practicalHoursPerExercise ||
    Array(formData.practicalExercises.length).fill(
      Math.floor(formData.practicalHours / formData.practicalExercises.length)
    );

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="p-4 max-w-4xl mx-auto bg-white print:p-0 relative">
      {/* Print styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @media print {
            html, body {
              margin: 0;
              padding: 0;
              font-size: 11pt;
              background-color: white;
            }

            @page {
              size: A4;
              margin: 1cm;
            }

            .page-break {
              page-break-after: always;
            }

            table.syllabus-table {
              border-collapse: collapse !important;
              width: 100% !important;
              border: 2px solid black !important;
            }

            .syllabus-table tr {
              page-break-inside: avoid;
              border: 1px solid black !important;
            }

            .syllabus-table td,
            .syllabus-table th {
              border: 1px solid black !important;
              padding: 8px !important;
              vertical-align: top !important;
              box-shadow: inset 0px 0px 0px 1px black !important;
              outline: 1px solid black !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
            }

            .gray-bg {
              background-color: #e0e0e0 !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
            }

            .no-print, .no-print * {
              display: none !important;
            }

            .watermark {
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 400px;
              height: 400px;
              opacity: 0.2;
              z-index: 0;
              pointer-events: none;
            }
          }
        `,
        }}
      />

      {/* Watermark image (print only) */}
      <img
        src="/image.png"
        alt="Watermark"
        className="watermark hidden print:block"
      />

      {/* Print/Download Buttons */}
      <div className="mb-4 flex space-x-4 no-print print:hidden">
        <button
          onClick={handlePrint}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Print Syllabus
        </button>
        <button
          onClick={handleDownload}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Download as PDF
        </button>
      </div>

      {/* Syllabus Content */}
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

            {formData.units.map((unit) => (
              <tr key={unit.id}>
                <td className="border-2 border-gray-800 p-2">
                  <strong>Unit {unit.number}</strong>
                  <div className="font-bold">{unit.title}</div>
                </td>
                <td className="border-2 border-gray-800 p-2" colSpan="3">
                  {unit.content.split(' – ').map((part, idx) => (
                    <React.Fragment key={idx}>
                      {idx > 0 && <span> – </span>}
                      {part}
                    </React.Fragment>
                  ))}
                </td>
                <td className="border-2 border-gray-800 p-2 text-center">
                  {unit.hours}
                </td>
              </tr>
            ))}

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
                <td className ="border-2 border-gray-800 p-2 text-center">
                  {practicalHoursPerExercise[index]}
                </td>
              </tr>
            ))}

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

            <tr>
              <td className="border-2 border-gray-800 p-2" colSpan="5">
                <strong>Syllabus Design:</strong> {formData.designedBy}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PrintSyllabusNEP;
