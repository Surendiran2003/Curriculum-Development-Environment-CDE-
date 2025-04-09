import React, { useState } from "react";
import CourseDetails from "./CourseDetails";
import CourseOutcomes from "./CourseOutcomes";
import UnitDetails from "./UnitDetails";
import PracticalComponent from "./PracticalComponent";
import ReferenceDetails from "./ReferenceDetails";
import PrintSyllabusNEP from "./PrintSyllabusNEP";
import Navbar from "../Navbar";

const SyllabusFormNEP = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [editingUnit, setEditingUnit] = useState(null);
  const [editingReference, setEditingReference] = useState(null);

  const [formData, setFormData] = useState({
    courseCode: "CSCS101",
    courseTitle: "Digital Logic Fundamentals",
    credits: "4",
    semester: "I",
    totalHours: "75",
    category: "C",
    prerequisites: "NIL",
    year: "I",
    internalMarks: "40",
    endSemesterMarks: "60",
    durationTheory: "03 hrs.",
    durationPractical: "03 hrs.",
    outcomes: [
      "Understand the principles of digital systems and binary number operations",
      "Apply Karnaugh mapping to simplify Boolean expressions and optimize digital circuits",
      "Analyze and design basic combinational circuits",
      "Synthesize and evaluate synchronous sequential circuits using storage elements and HDL",
      "Design and implement various types of registers and counters using HDL"
    ],
    units: [
      {
        id: 1,
        number: "I",
        title: "Introduction",
        content: "Digital Systems – Binary Numbers – Conversions – Types – Codes – Storage and Registers – Binary Logic – Boolean Algebra – Theorems and Properties – Functions – Canonical and Standard Forms – Other Logic Operations – Digital Logic Gates – Integrated Circuits",
        hours: 9
      },
      {
        id: 2,
        number: "II",
        title: "Gate‐Level Minimization",
        content: "Map Method – Four‐Variable KMap – Product‐of‐Sums Simplification – Don't‐Care Conditions – NAND and NOR Implementation – Other Two‐Level Implementations – Exclusive‐OR Function – Hardware Description Language",
        hours: 9
      },
      {
        id: 3,
        number: "III",
        title: "Combinational Logic",
        content: "Analysis Procedure – Design Procedure – Binary Adder– Subtractor – Decimal Adder – Binary Multiplier – Magnitude Comparator – Decoders – Encoders – Multiplexers – HDL Models of Combinational Circuits",
        hours: 9
      },
      {
        id: 4,
        number: "IV",
        title: "Synchronous Sequential Logic",
        content: "Storage Elements – Latches – Flip‐Flops – Analysis of Clocked Sequential Circuits – Synthesizable HDL Models of Sequential Circuits – State Reduction and Assignment – Design Procedure",
        hours: 9
      },
      {
        id: 5,
        number: "V",
        title: "Registers and Counters",
        content: "Registers – Shift Registers – Ripple Counters – Synchronous Counters – Other Counters – HDL for Registers and Counters",
        hours: 9
      }
    ],
    practicalHours: 30,
    practicalExercises: [
      "Binary to Decimal and viceversa",
      "Decimal to Hexadecimal and ViceVersa",
      "Digital Logic Gates",
      "Simplification of Boolean Functions",
      "Combinational Logic Circuits: i. Code Converters ii. Arithmetic (Adders, Subtractors, Multipliers, Comparators) iii. Data Handling (Multiplexers, Demultiplexers, Encoders & Decoders)",
      "Combinational Logic Circuit Design",
      "Binary AdderSubtractor Simulation",
      "Decimal Adder Simulation",
      "Binary Multiplier Simulation",
      "Sequential Circuit Storage Elements: FlipFlop Simulation"
    ],
    references: [
      {
        id: 1,
        author: "M. Morris Mano, Michael D. Ciletti",
        title: "Digital design With an Introduction to the Verilog HDL",
        publisher: "Pearson",
        year: "Sixth Edition, 2018"
      },
      {
        id: 2,
        author: "M. Rafiquzzaman",
        title: "Fundamentals of Digital Logic and Microcomputer Design",
        publisher: "John Wiley & Sons, Inc.",
        year: "Fifth Edition, 2009"
      }
    ],
    designedBy: "Dr. ,  Professor, PUDoCS"
  });

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
        return <CourseOutcomes formData={formData} setFormData={setFormData} />;
      case 2:
        return <UnitDetails 
          formData={formData} 
          setFormData={setFormData} 
          editingUnit={editingUnit}
          setEditingUnit={setEditingUnit}
        />;
      case 3:
        return <PracticalComponent formData={formData} setFormData={setFormData} />;
      case 4:
        return <ReferenceDetails 
          formData={formData} 
          setFormData={setFormData} 
          editingReference={editingReference}
          setEditingReference={setEditingReference}
        />;
      default:
        return null;
    }
  };

  const handlePrintPreview = () => {
    setShowPrintPreview(true);
  };

  const handleBackToEdit = () => {
    setShowPrintPreview(false);
  };

  const handleSave = () => {
    // Add logic to save the form data (e.g., to backend API or local storage)
    alert("Syllabus saved successfully!");
  };

  if (showPrintPreview) {
    return (
      <div>
        <PrintSyllabusNEP formData={formData} />
        <div className="mt-4 flex justify-between">
          <button 
            onClick={handleBackToEdit}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-green-600 mx-0.5"
          >
            Back to Edit
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
    <Navbar/>
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">NEP Syllabus Builder</h1>
        
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {[
              "Course Details",
              "Course Outcomes",
              "Unit Details",
              "Practical Component",
              "References"
            ].map((step, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`px-4 py-2 rounded ${
                  currentStep === index
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {step}
              </button>
            ))}
          </div>
        </div>

        {renderComponent()}

        <div className="flex justify-between mt-8">
          {currentStep > 0 && (
            <button
              onClick={prevStep}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              Previous
            </button>
          )}
          {currentStep < 4 ? (
            <button
              onClick={nextStep}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ml-auto"
            >
              Next
            </button>
          ) : (
            <div className="flex ml-auto">
              <button
                onClick={handleSave}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mr-2"
              >
                Save
              </button>
              <button
                onClick={handlePrintPreview}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Preview
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default SyllabusFormNEP;