import { useState } from "react";
import CourseDetailsPreview from "./CourseDetailsPreview";
import Modal from "./Pre_Modal"; // You’ll also need to create this file (see below)

const CourseDetails = ({ formData, handleInputChange }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);

  const inputClass =
    "border border-emerald-300 rounded-xl p-2 w-full focus:outline-none focus:ring-2 focus:ring-emerald-400";
  const labelClass = "text-sm font-medium text-emerald-800 mb-1 block";



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
                {[1, 2, 3, 4, 5].map((val) => (
                  <option key={val}>{val}</option>
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
                {["I", "II", "III", "IV", "V", "VI", "VII", "VIII"].map((sem) => (
                  <option key={sem}>{sem}</option>
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
                max="100"
                className={inputClass}
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
                {["A", "B", "C"].map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Prerequisites</label>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="w-full border border-emerald-300 rounded-xl p-2 text-left bg-white hover:bg-emerald-50"
              >
                {formData.prerequisites || "Click to add prerequisites"}
              </button>
            </div>
            <div>
              <label className={labelClass}>Year</label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                placeholder="e.g. I"
                className={inputClass}
              />
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
                type="text"
                name="internalMarks"
                value={formData.internalMarks}
                onChange={handleInputChange}
                placeholder="e.g. 40"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>End Semester Marks</label>
              <input
                type="text"
                name="endSemesterMarks"
                value={formData.endSemesterMarks}
                onChange={handleInputChange}
                placeholder="e.g. 60"
                className={inputClass}
              />
            </div>
          </div>
        </section>

        {/* Section 5: ESA Duration */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-emerald-600">⏱️ ESA Duration</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Theory Duration</label>
              <input
                type="text"
                name="durationTheory"
                value={formData.durationTheory}
                onChange={handleInputChange}
                placeholder="e.g. 03 hrs."
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Practical Duration</label>
              <input
                type="text"
                name="durationPractical"
                value={formData.durationPractical}
                onChange={handleInputChange}
                placeholder="e.g. 03 hrs."
                className={inputClass}
              />
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
  inputClass="your-input-class"
  courseTitle={formData.courseTitle} // 👈 Assuming courseTitle is in formData
/>


    </div>
  );
};

export default CourseDetails;
