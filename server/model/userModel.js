const mongoose = require('mongoose');

// Unit Schema
const unitSchema = new mongoose.Schema({
  id: Number,
  number: String,
  title: String,
  content: String,
  hours: Number
});

// Reference Schema
const referenceSchema = new mongoose.Schema({
  id: Number,
  author: String,
  title: String,
  publisher: String,
  year: String
});

// Syllabus Schema
const syllabusSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  courseCode: {
    type: String,
    required: true
  },
  courseTitle: {
    type: String,
    required: true
  },
  credits: String,
  semester: String,
  totalHours: String,
  category: String,
  prerequisites: String,
  year: String,
  internalMarks: String,
  endSemesterMarks: String,
  durationTheory: String,
  durationPractical: String,
  outcomes: [String],
  units: [unitSchema],
  practicalHours: Number,
  practicalExercises: [String],
  references: [referenceSchema],
  designedBy: String,
  syllabusType: {
    type: String,
    enum: ['regular', 'nep'],
    default: 'regular'
  },
  lastModified: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Draft', 'Published'],
    default: 'Draft'
  },
  isCurriculumLink: {
    type: Boolean,
    default: false
  },
  isCourseLink: {
    type: Boolean,
    default: false
  },
  showInDashboard: {
    type: Boolean,
    default: true
  },
  courseId: Number,
  linkedCurriculumId: Number
}, { timestamps: true });

module.exports = mongoose.model('Syllabus', syllabusSchema);