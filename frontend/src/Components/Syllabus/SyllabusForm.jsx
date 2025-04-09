import React, { useState, useEffect } from "react";
import CourseDetails from "./CourseDetails";
import ModuleDetails from "./ModuleDetails";
import ReferenceDetails from "./ReferenceDetails";
import WebResources from "./WebResources";
import PrintSyllabus from "./PrintSyllabus";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";

const SyllabusForm = () => {
    const navigate = useNavigate();
  
    // Dark Mode State
    const [darkMode, setDarkMode] = useState(false);

    // Check theme preference on mount
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === "dark") {
            setDarkMode(true);
            document.documentElement.classList.add("dark");
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove("dark");
        }
    }, []);

    // Toggle Dark Mode
    const toggleDarkMode = () => {
        setDarkMode((prevMode) => {
            const newMode = !prevMode;
            document.documentElement.classList.toggle("dark", newMode);
            localStorage.setItem("theme", newMode ? "dark" : "light");
            return newMode;
        });
    };

    const [formData, setFormData] = useState({
        courseCode: "",
        courseTitle: "",
        ltpc: "0-0-0-0",
        prerequisites: "",
        objectives: "",
        outcomes: "",
        modules: [
            { id: 1, title: "Module-I", content: "", hours: 9 },
            { id: 2, title: "Module-II", content: "", hours: 9 },
            { id: 3, title: "Module-III", content: "", hours: 9 },
        ],
        references: [{ id: 1, author: "", title: "", publisher: "", year: "" }],
        webResources: [
            { id: 1, title: "", url: "" },
            { id: 2, title: "", url: "" },
        ],
        onlineCourses: [{ id: 1, title: "", url: "" }],
    });

    const [currentStep, setCurrentStep] = useState(0);
    const [showPrintPreview, setShowPrintPreview] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const nextStep = () => setCurrentStep(currentStep + 1);
    const prevStep = () => setCurrentStep(currentStep - 1);

    const renderComponent = () => {
        switch (currentStep) {
            case 0:
                return <CourseDetails formData={formData} handleInputChange={handleInputChange} />;
            case 1:
                return <ModuleDetails formData={formData} setFormData={setFormData} />;
            case 2:
                return <ReferenceDetails formData={formData} setFormData={setFormData} />;
            case 3:
                return <WebResources formData={formData} setFormData={setFormData} />;
            default:
                return null;
        }
    };

    return (
        <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} min-h-screen`}>
            <Navbar darkMode={darkMode} setDarkMode={toggleDarkMode} />
            {showPrintPreview ? (
                <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-auto">
                    <div className="p-4 flex justify-between items-center bg-gray-100 dark:bg-gray-800 sticky top-0">
                        <h2 className="text-xl font-bold">Print Preview</h2>
                        <div className="space-x-2">
                            <button
                                onClick={() => window.print()}
                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                            >
                                Print
                            </button>
                            <button
                                onClick={() => setShowPrintPreview(false)}
                                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                    <div className="p-8">
                        <PrintSyllabus formData={formData} />
                    </div>
                </div>
            ) : (
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-1/2 space-y-6">
                            {renderComponent()}
                            <div className="flex justify-between">
                                {currentStep > 0 && (
                                    <button
                                        onClick={prevStep}
                                        className="bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 text-gray-800 dark:text-gray-200 py-2 px-4 rounded"
                                    >
                                        Previous
                                    </button>
                                )}
                                {currentStep < 3 ? (
                                    <button
                                        onClick={nextStep}
                                        className="bg-emerald-200 dark:bg-emerald-600 hover:bg-emerald-300 dark:hover:bg-emerald-700 text-gray-800 dark:text-white py-2 px-4 rounded"
                                    >
                                        Next
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setShowPrintPreview(true)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                                    >
                                        Show Print Preview
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <h2 className="text-xl font-bold border-b border-gray-300 dark:border-gray-600 pb-2 mb-4">
                                Live Preview
                            </h2>
                            <div className="p-4 border border-gray-300 dark:border-gray-600 rounded shadow-md">
                                <PrintSyllabus formData={formData} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SyllabusForm;
