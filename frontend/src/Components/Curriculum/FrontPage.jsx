import React, { useState } from 'react';

const FrontPage = ({ frontPageData, setFrontPageData, logoImage, setLogoImage }) => {
  const [newSectionName, setNewSectionName] = useState('');
  const [newSectionContent, setNewSectionContent] = useState('');
  const [showAddSection, setShowAddSection] = useState(false);

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFrontPageData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle logo image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is of allowed type
      if (!file.type.match('image/jpeg|image/jpg|image/png')) {
        alert('Only JPG, JPEG, and PNG formats are allowed.');
        e.target.value = ''; // Reset input
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => setLogoImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Add new custom section
  const addNewSection = () => {
    if (newSectionName.trim() === '') return;
    
    setFrontPageData(prev => ({
      ...prev,
      additionalSections: [
        ...prev.additionalSections,
        { name: newSectionName, content: newSectionContent }
      ]
    }));
    
    // Reset input fields
    setNewSectionName('');
    setNewSectionContent('');
    setShowAddSection(false); // Hide the form after adding
  };

  // Remove a custom section
  const removeSection = (index) => {
    setFrontPageData(prev => ({
      ...prev,
      additionalSections: prev.additionalSections.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Form Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold border-b pb-2">Front Page Details</h2>
        
        <div className="rounded-lg border border-gray-200 p-5 bg-gray-50">
          <h3 className="font-medium text-gray-700 mb-3">University Information</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">University Name</label>
            <input
              type="text"
              name="universityName"
              value={frontPageData.universityName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">University Type</label>
            <input
              type="text"
              name="universityType"
              value={frontPageData.universityType}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">University Logo (JPG, JPEG, PNG only)</label>
            <div className="flex items-center">
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleImageUpload}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
              {logoImage && (
                <button 
                  onClick={() => setLogoImage(null)} 
                  className="ml-2 text-red-600 hover:text-red-800"
                  title="Remove image"
                >
                  ✕
                </button>
              )}
            </div>
            {logoImage && (
              <div className="mt-2">
                <img src={logoImage} alt="University Logo" className="h-16 object-contain" />
              </div>
            )}
          </div>
        </div>
        
        <div className="rounded-lg border border-gray-200 p-5 bg-gray-50">
          <h3 className="font-medium text-gray-700 mb-3">Department & Program</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">School Name</label>
            <input
              type="text"
              name="schoolName"
              value={frontPageData.schoolName}
              onChange={handleInputChange}
              placeholder="SCHOOL OF ENGINEERING AND TECHNOLOGY"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">Department Name</label>
            <input
              type="text"
              name="departmentName"
              value={frontPageData.departmentName}
              onChange={handleInputChange}
              placeholder="DEPARTMENT OF COMPUTER SCIENCE"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">Document Type</label>
            <input
              type="text"
              name="documentType"
              value={frontPageData.documentType}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">Program Name</label>
            <input
              type="text"
              name="programName"
              value={frontPageData.programName}
              onChange={handleInputChange}
              placeholder="MASTER OF COMPUTER APPLICATIONS (M.C.A.)"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="rounded-lg border border-gray-200 p-5 bg-gray-50">
          <h3 className="font-medium text-gray-700 mb-3">Additional Information</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">CBCS Text</label>
            <input
              type="text"
              name="cbcsText"
              value={frontPageData.cbcsText}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">Academic Year</label>
            <input
              type="text"
              name="academicYear"
              value={frontPageData.academicYear}
              onChange={handleInputChange}
              placeholder="2023 - 2024"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        {/* Additional Custom Sections */}
        <div className="rounded-lg border border-gray-200 p-5 bg-gray-50">
          <h3 className="font-medium text-gray-700 mb-3">Custom Sections</h3>
          
          {frontPageData.additionalSections.map((section, index) => (
            <div key={index} className="p-3 border rounded-lg mb-3 bg-white">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">{section.name}</h4>
                <button 
                  onClick={() => removeSection(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
              <p className="text-sm text-gray-600">{section.content}</p>
            </div>
          ))}
          
          {!showAddSection ? (
            <button
              onClick={() => setShowAddSection(true)}
              className="w-full py-2 px-4 border border-dashed border-gray-400 rounded-lg text-gray-600 hover:bg-gray-100 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add New Section
            </button>
          ) : (
            <div className="mt-4 border p-4 rounded-lg bg-white">
              <h4 className="font-medium text-gray-700 mb-2">Add New Section</h4>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1 text-gray-700">Section Title</label>
                <input
                  type="text"
                  value={newSectionName}
                  onChange={(e) => setNewSectionName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Accreditation"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1 text-gray-700">Section Content</label>
                <textarea
                  value={newSectionContent}
                  onChange={(e) => setNewSectionContent(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter content here..."
                  rows="3"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={addNewSection}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  disabled={!newSectionName.trim()}
                >
                  Add Section
                </button>
                <button
                  onClick={() => setShowAddSection(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Live Preview Section */}
      <div className="relative">
        <h2 className="text-xl font-semibold border-b pb-2 mb-6">Live Preview</h2>
        <div className="sticky top-4">
          <div className="bg-white shadow-lg p-8 min-h-[800px] flex flex-col relative rounded-lg border" style={{ fontFamily: 'Times New Roman, serif' }}>
            <div className="absolute top-4 right-4 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Page 1
            </div>
            
            {/* Title Section */}
            <div className="text-center mb-12 mt-16">
              <div className="mb-4 text-2xl font-bold">{frontPageData.universityName}</div>
              <div className="mb-4 text-xl">{frontPageData.universityType}</div>
              <div className="mb-2 text-xl font-bold">
                {frontPageData.schoolName || <span className="text-gray-400">SCHOOL OF ENGINEERING AND TECHNOLOGY</span>}
              </div>
              <div className="mb-6 text-xl font-bold">
                {frontPageData.departmentName || <span className="text-gray-400">DEPARTMENT OF COMPUTER SCIENCE</span>}
              </div>
              <div className="mb-2 text-xl">{frontPageData.documentType}</div>
              <div className="mb-2 text-xl">FOR</div>
              <div className="mb-8 text-xl font-bold">
                {frontPageData.programName || <span className="text-gray-400">MASTER OF COMPUTER APPLICATIONS (M.C.A.)</span>}
              </div>
              <div className="mb-2 text-lg">{frontPageData.cbcsText}</div>
              <div className="text-lg">
                (Effective from the Academic Year {frontPageData.academicYear || <span className="text-gray-400">2023 - 2024</span>})
              </div>
            </div>
            
            {/* Logo Section */}
            <div className="flex justify-center items-center mb-12">
              {logoImage ? (
                <img 
                  src={logoImage} 
                  alt="University Logo" 
                  className="max-w-[200px] max-h-[200px] object-contain"
                />
              ) : (
                <div className="rounded-full w-48 h-48 flex items-center justify-center bg-gray-100 border-4 border-gray-200">
                  <div className="text-gray-400 text-lg font-medium">University Logo</div>
                </div>
              )}
            </div>
            
            {/* Additional Custom Sections - now positioned better on page 1 */}
            {frontPageData.additionalSections.length > 0 && (
              <div className="mt-2 pt-4 border-t">
                {frontPageData.additionalSections.map((section, index) => (
                  <div key={index} className="mb-3 text-center">
                    <div className="font-bold mb-1">{section.name}</div>
                    <div className="text-sm">{section.content}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontPage;