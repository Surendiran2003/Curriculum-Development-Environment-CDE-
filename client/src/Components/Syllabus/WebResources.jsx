// WebResources.jsx
import React from 'react';

const WebResources = ({ formData, setFormData, editingResource, setEditingResource }) => {
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

    const addOnlineCourse = () => {
        const newCourse = {
            id: Date.now(),
            title: '',
            url: ''
        };
        setFormData({ ...formData, onlineCourses: [...formData.onlineCourses, newCourse] });
    };

    const updateOnlineCourse = (id, field, value) => {
        const updatedCourses = formData.onlineCourses.map(course =>
            course.id === id ? { ...course, [field]: value } : course
        );
        setFormData({ ...formData, onlineCourses: updatedCourses });
    };

    const deleteOnlineCourse = (id) => {
        const updatedCourses = formData.onlineCourses.filter(course => course.id !== id);
        setFormData({ ...formData, onlineCourses: updatedCourses });
    };

  return (
    <div>
      <h2 className="text-xl font-bold border-b border-gray-300 pb-2 mb-4">Web Resources</h2>
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
        Add Web Resource
      </button>

        <h2 className="text-xl font-bold border-b border-gray-300 pb-2 mb-4 mt-6">Online Courses</h2>
        <div className="space-y-4">
            {formData.onlineCourses.map((course) => (
                <div key={course.id} className="border border-gray-200 rounded p-3">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium truncate">{course.title || 'New Course'}</h3>
                        <div className="space-x-2">
                            <button
                                onClick={() => deleteOnlineCourse(course.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2 mt-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                value={course.title}
                                onChange={(e) => updateOnlineCourse(course.id, 'title', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                            <input
                                type="text"
                                value={course.url}
                                onChange={(e) => updateOnlineCourse(course.id, 'url', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <button
            onClick={addOnlineCourse}
            className="mt-3 bg-emerald-200 hover:bg-emerald-300 text-gray-800 py-2 px-4 rounded transition"
        >
            Add Online Course
        </button>
    </div>
  );
};

export default WebResources;
