const express = require('express');
const router = express.Router();
const Syllabus = require('../models/Syllabus');

// Get all syllabuses
router.get('/', async (req, res) => {
  try {
    const syllabuses = await Syllabus.find();
    res.status(200).json(syllabuses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get syllabus by ID
router.get('/:id', async (req, res) => {
  try {
    const syllabus = await Syllabus.findOne({ id: req.params.id });
    if (!syllabus) {
      return res.status(404).json({ message: 'Syllabus not found' });
    }
    res.status(200).json(syllabus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Check if syllabus exists by course code and ID
router.get('/check/:courseCode/:courseId', async (req, res) => {
  try {
    const syllabus = await Syllabus.findOne({ 
      courseCode: req.params.courseCode, 
      courseId: Number(req.params.courseId) 
    });
    
    if (syllabus) {
      return res.status(200).json({ exists: true, syllabus });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new syllabus
router.post('/', async (req, res) => {
  try {
    const newSyllabus = new Syllabus({
      ...req.body,
      id: req.body.id || Date.now()
    });
    
    const savedSyllabus = await newSyllabus.save();
    res.status(201).json(savedSyllabus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update syllabus
router.put('/:id', async (req, res) => {
  try {
    const updatedSyllabus = await Syllabus.findOneAndUpdate(
      { id: req.params.id },
      { ...req.body, lastModified: new Date() },
      { new: true, runValidators: true }
    );
    
    if (!updatedSyllabus) {
      return res.status(404).json({ message: 'Syllabus not found' });
    }
    
    res.status(200).json(updatedSyllabus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete syllabus
router.delete('/:id', async (req, res) => {
  try {
    const deletedSyllabus = await Syllabus.findOneAndDelete({ id: Number(req.params.id) });
    
    if (!deletedSyllabus) {
      return res.status(404).json({ message: 'Syllabus not found' });
    }
    
    res.status(200).json({ message: 'Syllabus deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;