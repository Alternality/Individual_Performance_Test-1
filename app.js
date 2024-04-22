const express = require('express');
const mongoose = require('mongoose');
const Course = require('./course'); //schema model

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://markmacalisangulrich:DuYZryZCTAH08uFV@ulrichdb.kroysnh.mongodb.net/coursecollection', {
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

// Middleware
app.use(express.json());

// Define route to retrieve and output sorted course data
app.get('/courses/sorted', async (req, res) => {
  try {
    // Retrieve all documents (curriculum) from the Course collection
    const courses = await Course.aggregate([
      {
        $project: {
          "courses": {
            $concatArrays: ["$1st Year", "$2nd Year", "$3rd Year", "$4th Year"]
          }
        }
      },
      { $unwind: "$courses" },
      { $sort: { "courses.description": 1 } }, // Sort courses by name in ascending order
      { $project: { _id: 0, name: "$courses.description", specialization: { $arrayElemAt: ["$courses.tags", 1] } } } // Project name and specialization
    ]);

    // Output the retrieved courses
    res.json({ courses });
  } catch (error) {
    console.error('Error retrieving and sorting course data:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define route to select and extract course names and specializations
app.get('/courses/names-and-specializations', async (req, res) => {
  try {
    // Extract query parameter for course name
    const courseName = req.query.name;

    // Define projection to include name and specialization fields
    const projection = {
      _id: 0,
      name: "$courses.description",
      specialization: { $arrayElemAt: ["$courses.tags", 1] } // Assuming specialization is the second tag
    };

    // Retrieve all courses or filter by course name if provided example: http://localhost:3000/courses/names-and-specializations?name=Introduction%20to%20Information%20Technology
    let pipeline = [
      {
        $project: {
          "courses": {
            $concatArrays: ["$1st Year", "$2nd Year", "$3rd Year", "$4th Year"]
          }
        }
      },
      { $unwind: "$courses" },
      { $project: projection }
    ];

    if (courseName) {
      pipeline.push({ $match: { name: courseName } });
    }

    const allCourses = await Course.aggregate(pipeline);

    // Output the retrieved course names and specializations
    res.json({ courses: allCourses });
  } catch (error) {
    console.error('Error retrieving course names and specializations:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to retrieve and output BSIT courses
app.get('/courses/bsit', async (req, res) => {
  try {
    // Retrieve all published BSIT courses
    const bsitCourses = await Course.aggregate([
      {
        $project: {
          "courses": {
            $concatArrays: ["$1st Year", "$2nd Year", "$3rd Year", "$4th Year"]
          }
        }
      },
      { $unwind: "$courses" },
      { 
        $match: { 
          "courses.tags": "BSIT" 
        } 
      },
      { $sort: { "courses.description": 1 } }, // Sort alphabetically by description
      { 
        $project: { 
          _id: 0, 
          code: "$courses.code", 
          description: "$courses.description", 
          units: "$courses.units" 
        } 
      }
    ]);

    // Output the retrieved BSIT courses
    res.json({ bsitCourses });
  } catch (error) {
    console.error('Error retrieving BSIT courses:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to retrieve and output BSIS courses
app.get('/courses/bsis', async (req, res) => {
  try {
    // Retrieve all published BSIS courses
    const bsisCourses = await Course.aggregate([
      {
        $project: {
          "courses": {
            $concatArrays: ["$1st Year", "$2nd Year", "$3rd Year", "$4th Year"]
          }
        }
      },
      { $unwind: "$courses" },
      { 
        $match: { 
          "courses.tags": "BSIS" 
        } 
      },
      { $sort: { "courses.description": 1 } }, // Sort alphabetically by description
      { 
        $project: { 
          _id: 0, 
          code: "$courses.code", 
          description: "$courses.description", 
          units: "$courses.units" 
        } 
      }
    ]);

    // Output the retrieved BSIS courses
    res.json({ bsisCourses });
  } catch (error) {
    console.error('Error retrieving BSIS courses:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});