import { useState } from "react";

const Modal = ({
  isOpen,
  onClose,
  formData,
  handleInputChange,
  aiSuggestions,
  setAiSuggestions,
  setModalOpen,
  inputClass,
  courseTitle, // 👈 Add this
  children
}) => {
  const [loading, setLoading] = useState(false);

  const generateAISuggestions = async () => {
    if (!courseTitle) return;
    setLoading(true); // <-- ✅ START loading here
    const prompt = `Based on a typical undergraduate curriculum structure, suggest the most relevant prerequisite knowledge or courses for the following subject:
  
  Course Title: "${courseTitle}"
  
  - Assume that the learner is a university-level student pursuing a bachelor's degree.
  - Suggest 1 to 3 list of appropriate prerequisite course names or topic areas that would prepare a student to understand this course effectively without markdowns format.
  - If no clear prerequisites exist (e.g., for beginner-level or general education courses), clearly mention: “No specific prerequisites.”
  `;
    try {
      const response = await fetch("http://localhost:5000/api/gemini-prereqs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
  
      const data = await response.json();
      const cleaned = (data.suggestions || []).map((s) =>
        s
          .replace(/^[-*•\d.\s]+/, "")              // remove bullets/numbers at start
          .replace(/\*\*([^*]+)\*\*/g, "$1")        // remove bold (around text)
          .replace(/[_~`]/g, "")                    // remove stray markdown (italic, strikethrough, code)
          .trim()
      );
      
    
      setAiSuggestions(cleaned);
    } catch (error) {
      console.error("Error fetching AI suggestions:", error);
      setAiSuggestions(["Failed to fetch suggestions"]);
    }finally {
      setLoading(false); // Stop loading
    }
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-emerald-700">📋 Enter Prerequisites</h2>
        <input
          type="text"
          name="prerequisites"
          value={formData.prerequisites}
          onChange={handleInputChange}
          placeholder="e.g. Basic of"
          className={inputClass}
        />

<button
  onClick={generateAISuggestions}
  disabled={loading}
  className="mt-4 px-4 py-2 text-sm text-white bg-emerald-500 rounded hover:bg-emerald-600 disabled:opacity-60 disabled:cursor-not-allowed"
>
  {loading ? "Generating..." : "Generate with AI"}
</button>


        {aiSuggestions.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-sm text-gray-600">Suggestions:</p>
            <ul className="space-y-1">
              {aiSuggestions.map((s, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    handleInputChange({ target: { name: "prerequisites", value: s } });
                    setModalOpen(false);
                  }}
                  className="cursor-pointer px-3 py-1 bg-emerald-100 rounded hover:bg-emerald-200"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        {children}

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 text-sm text-white bg-emerald-600 rounded hover:bg-emerald-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
