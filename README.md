Course API

This API provides endpoints to retrieve, sort, and filter course data from a MongoDB database.

Dependencies:

Node.js
Express.js
Mongoose
Nodemon
Usage:

-Clone the repository to your local machine.
-Install dependencies using the following command:

npm install

-Start the server using the following command:

npm start

npm run dev

-The server will start running on port 3000 by default. You can access the API endpoints as follows:

-Retrieve All Courses Sorted Alphabetically:

GET /courses/sorted
-Retrieves all published courses sorted alphabetically by their names.
-Retrieve Courses by Name and Specialization:

GET /courses/names-and-specializations?name=<course-name>
-exampple: http://localhost:3000/courses/names-and-specializations?name=Introduction%20to%20Information%20Technology
-Retrieves courses by name and specialization. Replace <course-name> with the name of the course you want to search for.

-Retrieve BSIT Courses:

GET /courses/bsit
-Retrieves all published BSIT (Bachelor of Science in Information Technology) courses.

-Retrieve BSIS Courses:

GET /courses/bsis
-Retrieves all published BSIS (Bachelor of Science in Information Systems) courses.


During this activity, I learned and found useful several key aspects:

Schema Modeling: I grasped the importance of designing a schema model tailored to my data structure. Crafting schemas for courses, years, and the entire curriculum helped me maintain data integrity and streamline data management.
MongoDB Database Setup: Through hands-on experience, I successfully set up a MongoDB database. Connecting my Node.js application to MongoDB Atlas, a cloud-based MongoDB service, proved essential for efficient data storage and retrieval.
Data Sorting and Pipelining: Exploring MongoDB's aggregation framework allowed me to sort and manipulate data pipelines effectively. By aggregating and unwinding nested arrays, I could extract, sort, and project specific fields from my course data, providing customized responses to API requests.
