import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const SyllabusService = {
  // Get all syllabuses
  getAllSyllabuses: async () => {
    try {
      const response = await axios.get(`${API_URL}/syllabus`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Get syllabus by ID
  getSyllabusById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/syllabus/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Check if syllabus exists for course
  checkSyllabusExists: async (courseCode, courseId) => {
    try {
      const response = await axios.get(`${API_URL}/syllabus/check/${courseCode}/${courseId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Create new syllabus
  createSyllabus: async (syllabusData) => {
    try {
      // Generate ID if not provided
      const data = {
        ...syllabusData,
        id: syllabusData.id || Date.now()
      };
      
      const response = await axios.post(`${API_URL}/syllabus`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Update syllabus
  updateSyllabus: async (id, syllabusData) => {
    try {
      const response = await axios.put(`${API_URL}/syllabus/${id}`, syllabusData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Delete syllabus
  deleteSyllabus: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/syllabus/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default SyllabusService;