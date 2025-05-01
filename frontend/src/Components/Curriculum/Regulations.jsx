import React, { useState } from 'react';

const Regulations = ({ pdfFile, setPdfFile, pdfUrl, setPdfUrl }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    
    if (!file) return;

    // Check if the file is a PDF
    if (file.type !== 'application/pdf') {
      setErrorMessage('Please upload a PDF file only.');
      setPdfFile(null);
      
      // Clean up previous URL if it exists
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
        setPdfUrl(null);
      }
      
      e.target.value = ''; // Reset the input
      return;
    }

    // Clear any previous errors
    setErrorMessage('');
    
    // Store the file
    setPdfFile(file);
    
    // Clean up previous URL if it exists
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
    }
    
    // Create URL for preview
    const fileUrl = URL.createObjectURL(file);
    setPdfUrl(fileUrl);
  };

  const removePdf = () => {
    setPdfFile(null);
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl); // Clean up
      setPdfUrl(null);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Upload Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold border-b pb-2">Regulations Document</h2>
        
        <div className="rounded-lg border border-gray-200 p-5 bg-gray-50">
          <h3 className="font-medium text-gray-700 mb-3">Upload PDF Document</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Upload your regulations document (PDF only)
            </label>
            
            <div className="flex items-center">
              <input
                type="file"
                accept="application/pdf"
                onChange={handlePdfUpload}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
              {pdfFile && (
                <button 
                  onClick={removePdf} 
                  className="ml-2 text-red-600 hover:text-red-800"
                  title="Remove PDF"
                >
                  ✕
                </button>
              )}
            </div>
            
            {errorMessage && (
              <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
            )}
            
            {pdfFile && (
              <div className="mt-3 text-sm text-gray-600">
                <div className="font-medium">File uploaded:</div>
                <div className="flex items-center mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0v3H7V4h6zm-5 7a1 1 0 100-2 1 1 0 000 2zm0 3a1 1 0 100-2 1 1 0 000 2zm5-3a1 1 0 100-2 1 1 0 000 2zm0 3a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  <span>{pdfFile.name}</span>
                  <span className="ml-2 text-gray-500">({Math.round(pdfFile.size / 1024)} KB)</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            <p className="font-medium mb-1">Note:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Upload the complete regulations document in PDF format</li>
              <li>The document will be included in the final curriculum</li>
              <li>Maximum file size: 10MB</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Preview Section */}
      <div className="relative">
        <h2 className="text-xl font-semibold border-b pb-2 mb-6">PDF Preview</h2>
        <div className="sticky top-4">
          {pdfUrl ? (
            <div className="bg-white shadow-lg rounded-lg border overflow-hidden" style={{ height: '800px' }}>
              <iframe 
                src={pdfUrl}
                title="PDF Preview" 
                className="w-full h-full" 
              />
            </div>
          ) : (
            <div className="bg-white shadow-lg p-8 min-h-[800px] flex flex-col items-center justify-center rounded-lg border">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-lg text-gray-400 mb-2">No PDF Uploaded</p>
              <p className="text-sm text-gray-400 text-center max-w-md">
                Upload a PDF document using the form on the left to see a preview here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Regulations;