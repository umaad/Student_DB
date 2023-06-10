const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');
const path = require("path");

const app = express();
const PORT = 5000;
app.use(cors());
app.use(bodyParser.json());

const uri = 'mongodb+srv://sa:a@cestar.ksorqde.mongodb.net/student_db?retryWrites=true&w=majority';

// Connect to MongoDB Atlas using Mongoose
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.log('Error connecting to MongoDB Atlas:', err));

app.get("/", (req, res) => {
    //res.send("Welcome to the Student DB API");
  res.sendFile(path.join(__dirname,"index.html"));

  });
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// Define the student schema
const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  id: { type: Number, required: true },
  semester: { type: Number, required: true },
  courses: [{ type: String }]
});

// Define the student model
const Student = mongoose.model('Student', studentSchema);

// Define the course schema
const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true }
});

// Define the course model
const Course = mongoose.model('Course', courseSchema);

// RESTful APIs for students
// Add a new student to the database
app.post('/students', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.send(student);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all the students in the database
app.get('/students', async (req, res) => {
  debugger;
  try {
    const students = await Student.find();
    res.send(students);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get a specific student by id
app.get('/students/:id', async (req, res) => {
  try {
    const student = await Student.findOne({ id: req.params.id });
    res.send(student);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update a specific student by id
app.patch('/students/:id', async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    res.send(student);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete a specific student by id
app.delete('/students/:id', async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({ id: req.params.id });
    res.send(student);
  } catch (err) {
    res.status(400).send(err);
  }
});

// RESTful APIs for courses
// Add a new course to the database
app.post('/courses', async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.send(course);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all the courses in the database
app.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.send(courses);
  } catch (err) {
     res.status(400).send(err);
  }
});