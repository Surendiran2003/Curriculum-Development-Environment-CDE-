import React, { useState, useEffect } from 'react';

const SyllabusForm = () => {
  const [formData, setFormData] = useState({
    courseCode: '',
    courseTitle: '',
    ltpc: '3-0-0-3',
    prerequisites: '',
    objectives: '',
    outcomes: '',
    modules: [
      { 
        id: 1, 
        title: '', 
        content: '', 
        hours: 9 
      },
      { 
        id: 2, 
        title: 'Module-II', 
        content: 'Basics of Web Content Accessibility Guidelines – Principles: Perceivable – Operable – Understandable – Robust – Various Levels of Accessibility – WCAG standards evaluation tools and Comparative analysis.', 
        hours: 9 
      },
      { 
        id: 3, 
        title: 'Module-III', 
        content: 'Accessibility of web page components: Images – Hyperlinks – Color contrast – Tables – Forms – Document Accessibility – Video accessibility – Audio accessibility – Static vs Dynamic page accessibility.', 
        hours: 9
      }
    ],
    references: [
      { 
        id: 1, 
        author: 'Simon Harper, Yeliz Yesilada (Editors)', 
        title: 'Web Accessibility: A Foundation for Research', 
        publisher: 'Springer Publications', 
        year: '2010' 
      }
    ],
    webResources: [
      { 
        id: 1, 
        title: 'W3C Resources on Web Accessibility', 
        url: 'https://www.w3.org/WAI/intro/accessibility.php' 
      },
      { 
        id: 2, 
        title: 'WebAIM(Web Accessibility in Mind) Resources', 
        url: 'http://webaim.org' 
      }
    ],
    onlineCourses: [
      {
        id: 1,
        title: 'Introduction to Web Accessibility by Google',
        url: 'https://webaccessibility.withgoogle.com/course'
      }
    ]
  });

  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [editingModule, setEditingModule] = useState(null);
  const [editingReference, setEditingReference] = useState(null);
  const [editingResource, setEditingResource] = useState(null);

  // Parse LTPC values
  const [ltpcValues, setLtpcValues] = useState({ L: 3, T: 0, P: 0, C: 3 });

  useEffect(() => {
    const ltpcParts = formData.ltpc.split('-');
    if (ltpcParts.length === 4) {
      setLtpcValues({
        L: parseInt(ltpcParts[0]) || 0,
        T: parseInt(ltpcParts[1]) || 0,
        P: parseInt(ltpcParts[2]) || 0,
        C: parseInt(ltpcParts[3]) || 0
      });
    }
  }, [formData.ltpc]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addModule = () => {
    const newModule = {
      id: Date.now(),
      title: `Module-${formData.modules.length + 1}`,
      content: '',
      hours: 9
    };
    setFormData({ ...formData, modules: [...formData.modules, newModule] });
    setEditingModule(newModule);
  };

  const updateModule = (id, field, value) => {
    const updatedModules = formData.modules.map(module => 
      module.id === id ? { ...module, [field]: value } : module
    );
    setFormData({ ...formData, modules: updatedModules });
  };

  const deleteModule = (id) => {
    const updatedModules = formData.modules.filter(module => module.id !== id);
    setFormData({ ...formData, modules: updatedModules });
    if (editingModule && editingModule.id === id) {
      setEditingModule(null);
    }
  };

  const addReference = () => {
    const newRef = {
      id: Date.now(),
      author: '',
      title: '',
      publisher: '',
      year: ''
    };
    setFormData({ ...formData, references: [...formData.references, newRef] });
    setEditingReference(newRef);
  };

  const updateReference = (id, field, value) => {
    const updatedRefs = formData.references.map(ref => 
      ref.id === id ? { ...ref, [field]: value } : ref
    );
    setFormData({ ...formData, references: updatedRefs });
  };

  const deleteReference = (id) => {
    const updatedRefs = formData.references.filter(ref => ref.id !== id);
    setFormData({ ...formData, references: updatedRefs });
    if (editingReference && editingReference.id === id) {
      setEditingReference(null);
    }
  };

  const addWebResource = () => {
    const newResource = {
      id: Date.now(),
      title: '',
      url: ''
    };
    setFormData({ ...formData, webResources: [...formData.webResources, newResource] });
    setEditingResource(newResource);
  };

  const updateWebResource = (id, field, value) => {
    const updatedResources = formData.webResources.map(resource => 
      resource.id === id ? { ...resource, [field]: value } : resource
    );
    setFormData({ ...formData, webResources: updatedResources });
  };

  const deleteWebResource = (id) => {
    const updatedResources = formData.webResources.filter(resource => resource.id !== id);
    setFormData({ ...formData, webResources: updatedResources });
    if (editingResource && editingResource.id === id) {
      setEditingResource(null);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {showPrintPreview ? (
        <div className="fixed inset-0 bg-white z-50 overflow-auto">
          <div className="p-4 flex justify-between items-center bg-gray-100 sticky top-0">
            <h2 className="text-xl font-bold">Print Preview</h2>
            <div className="space-x-2">
              <button 
                onClick={() => window.print()} 
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition"
              >
                Print
              </button>
              <button 
                onClick={() => setShowPrintPreview(false)} 
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded transition"
              >
                Close
              </button>
            </div>
          </div>
          <div className="p-8">
            <PrintSyllabus formData={formData} ltpcValues={ltpcValues} />
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column - Form Inputs */}
            <div className="md:w-1/2 space-y-6">
              <div>
                <h2 className="text-xl font-bold border-b border-gray-300 pb-2 mb-4">Syllabus Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course Code</label>
                    <input
                      type="text"
                      name="courseCode"
                      value={formData.courseCode}
                      onChange={handleInputChange}
                      placeholder="Course code"
                      className="w-full p-2 border border-emerald-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">L, T, P, C</label>
                    <input
                      type="text"
                      name="ltpc"
                      value={formData.ltpc}
                      onChange={handleInputChange}
                      placeholder="L-T-P-C (e.g. 3-0-0-3)"
                      className="w-full p-2 border border-emerald-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                    <input
                      type="text"
                      name="courseTitle"
                      value={formData.courseTitle}
                      onChange={handleInputChange}
                      placeholder="Course Title"
                      className="w-full p-2 border border-emerald-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prerequisites</label>
                    <input
                      type="text"
                      name="prerequisites"
                      value={formData.prerequisites}
                      onChange={handleInputChange}
                      placeholder="Prerequisites"
                      className="w-full p-2 border border-emerald-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Objectives (comma separated)</label>
                    <textarea
                      name="objectives"
                      value={formData.objectives}
                      onChange={handleInputChange}
                      placeholder="Objectives (separate with commas)"
                      className="w-full p-2 border border-emerald-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-200"
                      rows="2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Outcomes (comma separated)</label>
                    <textarea
                      name="outcomes"
                      value={formData.outcomes}
                      onChange={handleInputChange}
                      placeholder="Outcomes (separate with commas)"
                      className="w-full p-2 border border-emerald-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-200"
                      rows="2"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold border-b border-gray-300 pb-2 mb-4">Module details</h2>
                <div className="space-y-4">
                  {formData.modules.map((module) => (
                    <div key={module.id} className="border border-gray-200 rounded p-3">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{module.title}</h3>
                        <div className="space-x-2">
                          <button
                            onClick={() => setEditingModule(editingModule?.id === module.id ? null : module)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            {editingModule?.id === module.id ? 'Close' : 'Edit'}
                          </button>
                          <button
                            onClick={() => deleteModule(module.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      
                      {editingModule?.id === module.id && (
                        <div className="space-y-2 mt-2">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                              type="text"
                              value={module.title}
                              onChange={(e) => updateModule(module.id, 'title', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                            <textarea
                              value={module.content}
                              onChange={(e) => updateModule(module.id, 'content', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded"
                              rows="3"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Hours</label>
                            <input
                              type="number"
                              value={module.hours}
                              onChange={(e) => updateModule(module.id, 'hours', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <button 
                  onClick={addModule}
                  className="mt-3 bg-emerald-200 hover:bg-emerald-300 text-gray-800 py-2 px-4 rounded transition"
                >
                  Add Module
                </button>
              </div>
              
              <div>
                <h2 className="text-xl font-bold border-b border-gray-300 pb-2 mb-4">Reference details</h2>
                <div className="space-y-4">
                  {formData.references.map((ref) => (
                    <div key={ref.id} className="border border-gray-200 rounded p-3">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium truncate">{ref.title || 'New Reference'}</h3>
                        <div className="space-x-2">
                          <button
                            onClick={() => setEditingReference(editingReference?.id === ref.id ? null : ref)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            {editingReference?.id === ref.id ? 'Close' : 'Edit'}
                          </button>
                          <button
                            onClick={() => deleteReference(ref.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      
                      {editingReference?.id === ref.id && (
                        <div className="space-y-2 mt-2">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Author(s)</label>
                            <input
                              type="text"
                              value={ref.author}
                              onChange={(e) => updateReference(ref.id, 'author', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                              type="text"
                              value={ref.title}
                              onChange={(e) => updateReference(ref.id, 'title', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Publisher</label>
                            <input
                              type="text"
                              value={ref.publisher}
                              onChange={(e) => updateReference(ref.id, 'publisher', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                            <input
                              type="text"
                              value={ref.year}
                              onChange={(e) => updateReference(ref.id, 'year', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <button 
                  onClick={addReference}
                  className="mt-3 bg-emerald-200 hover:bg-emerald-300 text-gray-800 py-2 px-4 rounded transition"
                >
                  Add Ref.
                </button>
              </div>
              
              <div>
                <h2 className="text-xl font-bold border-b border-gray-300 pb-2 mb-4">Web Resource Details</h2>
                <div className="space-y-4">
                  {formData.webResources.map((resource) => (
                    <div key={resource.id} className="border border-gray-200 rounded p-3">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium truncate">{resource.title || 'New Resource'}</h3>
                        <div className="space-x-2">
                          <button
                            onClick={() => setEditingResource(editingResource?.id === resource.id ? null : resource)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            {editingResource?.id === resource.id ? 'Close' : 'Edit'}
                          </button>
                          <button
                            onClick={() => deleteWebResource(resource.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      
                      {editingResource?.id === resource.id && (
                        <div className="space-y-2 mt-2">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                              type="text"
                              value={resource.title}
                              onChange={(e) => updateWebResource(resource.id, 'title', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                            <input
                              type="text"
                              value={resource.url}
                              onChange={(e) => updateWebResource(resource.id, 'url', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <button 
                  onClick={addWebResource}
                  className="mt-3 bg-emerald-200 hover:bg-emerald-300 text-gray-800 py-2 px-4 rounded transition"
                >
                  Add Web
                </button>
              </div>
              
              <div className="flex justify-center mt-8">
                <button 
                  onClick={() => setShowPrintPreview(true)}
                  className="bg-emerald-200 hover:bg-emerald-300 text-gray-800 py-2 px-12 rounded transition"
                >
                  Print
                </button>
              </div>
            </div>
            
            {/* Right Column - Preview */}
            <div className="md:w-1/2 border border-gray-200 rounded-lg p-6 bg-gray-50">
              <div className="text-center mb-6">
                <h1 className="text-lg font-bold text-gray-800">{formData.courseCode}: {formData.courseTitle}</h1>
                
                <div className="flex justify-end">
                  <table className="border-collapse border border-gray-300 text-sm">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 p-1">L</th>
                        <th className="border border-gray-300 p-1">T</th>
                        <th className="border border-gray-300 p-1">P</th>
                        <th className="border border-gray-300 p-1">C</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 p-1">{ltpcValues.L}</td>
                        <td className="border border-gray-300 p-1">{ltpcValues.T}</td>
                        <td className="border border-gray-300 p-1">{ltpcValues.P}</td>
                        <td className="border border-gray-300 p-1">{ltpcValues.C}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-semibold italic">Prerequisites:</p>
                  <ul className="list-disc pl-6">
                    <li>{formData.prerequisites}</li>
                  </ul>
                </div>
                
                <div>
                  <p className="font-semibold italic">Objectives:</p>
                  <ul className="list-disc pl-6">
                    {formData.objectives.split(',').map((obj, idx) => (
                      <li key={idx}>{obj.trim()}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <p className="font-semibold italic">Outcomes:</p>
                  <ul className="list-disc pl-6">
                    {formData.outcomes.split(',').map((outcome, idx) => (
                      <li key={idx}>{outcome.trim()}</li>
                    ))}
                  </ul>
                </div>
                
                {/* Module content */}
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
          </div>
        </div>
      )}
    </div>
  );
};

export default SyllabusForm;