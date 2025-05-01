import { useState } from "react";
import CourseDetailsPreview from "./CourseDetailsPreview";
import Modal from "./Pre_Modal";

const CourseDetails = ({ formData, handleInputChange }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);

  const inputClass =
    "border border-emerald-300 rounded-xl p-2 w-full focus:outline-none focus:ring-2 focus:ring-emerald-400";
  const labelClass = "text-sm font-medium text-emerald-800 mb-1 block";

  const numberInputClass =
    "border border-emerald-300 rounded-xl p-2 w-full focus:outline-none focus:ring-2 focus:ring-emerald-400 appearance-none";

  const wrapperClass = "relative";

  // Custom handler for duration inputs
  const handleDurationChange = (e) => {
    const { name, value } = e.target;
    // Format the value to have leading zero if needed and add "hrs."
    const formattedValue = value ? `${value.padStart(2, '0')} hrs.` : "";
    
    // Update the form data with the formatted value
    handleInputChange({
      target: {
        name: name,
        value: formattedValue
      }
    });
  };

  // Extract just the numeric value from the formatted string for display in input
  const extractDurationValue = (formattedValue) => {
    if (!formattedValue) return "";
    // Extract numbers from the formatted string (e.g., "03 hrs." -> "3")
    const matches = formattedValue.match(/^(\d+)/);
    return matches ? parseInt(matches[1], 10).toString() : "";
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="p-6 bg-gradient-to-br from-white to-emerald-50 rounded-2xl shadow-lg border border-emerald-100 space-y-8">
        <h2 className="text-2xl font-bold text-emerald-700 flex items-center gap-2">
          📚 Course Details
        </h2>

        {/* Section 1: Basic Info */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-emerald-600">📌 Basic Info</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Course Code</label>
              <input
                type="text"
                name="courseCode"
                value={formData.courseCode}
                onChange={handleInputChange}
                placeholder="e.g. CSCS101"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Course Title</label>
              <input
                type="text"
                name="courseTitle"
                value={formData.courseTitle}
                onChange={handleInputChange}
                placeholder="e.g. Digital Logic"
                className={inputClass}
              />
            </div>
          </div>
        </section>

        {/* Section 2: Structure */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-emerald-600">🎓 Course Structure</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className={labelClass}>Credits</label>
              <select
                name="credits"
                value={formData.credits}
                onChange={handleInputChange}
                className={inputClass}
              >
                <option value="">Select Credits</option>
                {[1, 2, 3, 4, 5].map((val) => (
                  <option key={val} value={val}>{val}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Semester</label>
              <select
                name="semester"
                value={formData.semester}
                onChange={handleInputChange}
                className={inputClass}
              >
                <option value="">Select Semester</option>
                {["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI","XII"].map((sem) => (
                  <option key={sem} value={sem}>{sem}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Total Hours (max 100)</label>
              <input
                type="number"
                name="totalHours"
                value={formData.totalHours}
                onChange={handleInputChange}
                min="0"
                max="100"
                className={numberInputClass}
              />
            </div>
          </div>
        </section>

        {/* Section 3: Category & Year */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-emerald-600">📂 Category & Year</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className={labelClass}>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={inputClass}
              >
                <option value="">Select Category</option>
                {["A", "B", "C"].map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
  <label className={labelClass}>Prerequisites</label>
  <button
    type="button"
    onClick={() => setModalOpen(true)}
    className="w-full border border-emerald-300 rounded-xl p-2 text-left bg-white hover:bg-emerald-50"
  >
    {formData.prerequisites ? (
      <div 
        dangerouslySetInnerHTML={{ __html: formData.prerequisites }} 
        className="prerequisite-content"
        style={{
          // Override styles to ensure lists display correctly in the button
          "& ul": { listStyleType: "disc", paddingLeft: "1.5rem" },
          "& ol": { listStyleType: "decimal", paddingLeft: "1.5rem" }
        }}
      />
    ) : (
      "Click to add prerequisites"
    )}
  </button>
</div>

            <div>
              <label className={labelClass}>Year</label>
              <select
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                className={inputClass}
              >
                <option value="">Select Year</option>
                {["I", "II", "III", "IV", "V"].map((yr) => (
                  <option key={yr} value={yr}>{yr}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Section 4: Marks */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-emerald-600">📊 Marks Distribution</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Internal Assessment</label>
              <input
                type="number"
                name="internalMarks"
                value={formData.internalMarks}
                onChange={handleInputChange}
                min="10"
                max="100"
                placeholder="e.g. 40"
                className={numberInputClass}
              />
            </div>
            <div>
              <label className={labelClass}>End Semester Marks</label>
              <input
                type="number"
                name="endSemesterMarks"
                value={formData.endSemesterMarks}
                onChange={handleInputChange}
                min="10"
                max="100"
                placeholder="e.g. 60"
                className={numberInputClass}
              />
            </div>
          </div>
        </section>

        {/* Section 5: ESA Duration */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-emerald-600">⏱️ ESA Duration</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className={wrapperClass}>
              <label className={labelClass}>Theory Duration</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  name="durationTheory"
                  value={extractDurationValue(formData.durationTheory)}
                  onChange={(e) => handleDurationChange({
                    target: {
                      name: "durationTheory",
                      value: e.target.value
                    }
                  })}
                  min="0"
                  className={`${numberInputClass} pr-16`}
                  placeholder="Hours"
                />
                <span className="absolute right-4 text-emerald-500 text-sm">hrs.</span>
              </div>
            </div>
            <div className={wrapperClass}>
              <label className={labelClass}>Practical Duration</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  name="durationPractical"
                  value={extractDurationValue(formData.durationPractical)}
                  onChange={(e) => handleDurationChange({
                    target: {
                      name: "durationPractical",
                      value: e.target.value
                    }
                  })}
                  min="0"
                  className={`${numberInputClass} pr-16`}
                  placeholder="Hours"
                />
                <span className="absolute right-4 text-emerald-500 text-sm">hrs.</span>
              </div>
            </div>
          </div>
        </section>

        <hr className="my-6 border-emerald-200" />

        {/* Preview */}
        <section>
          <h3 className="text-xl font-semibold mb-4 text-emerald-800">🖨️ Course Preview</h3>
          <CourseDetailsPreview formData={formData} />
        </section>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        formData={formData}
        handleInputChange={handleInputChange}
        aiSuggestions={aiSuggestions}
        setAiSuggestions={setAiSuggestions}
        setModalOpen={setModalOpen}
        inputClass={inputClass}
        courseTitle={formData.courseTitle}
      />
    </div>
  );
};

export default CourseDetails;