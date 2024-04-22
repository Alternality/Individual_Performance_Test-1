const mongoose = require('mongoose');

// Define schema for course
const courseSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  units: {
    type: Number,
    required: true
  },
  tags: [String]
});

// Define schema for year
const yearSchema = new mongoose.Schema({
  year: {
    type: String,
    required: true
  },
  courses: [courseSchema] // Embed course schema
});

// Define schema for entire curriculum
const curriculumSchema = new mongoose.Schema({
  years: [yearSchema] // Embed year schema
});

// Create model
const Course = mongoose.model('Course', curriculumSchema,'coursedata');

module.exports = Course;
