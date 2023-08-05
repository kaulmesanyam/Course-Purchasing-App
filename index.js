const express = require('express');
const app = express();

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

const adminAuth = (req, res, next) => {
    const {username, password} = req.headers;
    const adminIsValid = ADMINS.find(a => (a.username === username && a.password === password));

    if(adminIsValid) {
        next();
    } else {
        res.status(403).json({message: "Admin authentication failure"});
    }
}

// Admin routes
app.post('/admin/signup', (req, res) => {
    let adminBody = req.body;
    const existingAdmin = ADMINS.find(a => a.username === adminBody.username);
    if(existingAdmin) {
        res.status(403).json({message: "Admin already exists"});
    } else {
        ADMINS.push(adminBody);
        res.json({message: "Admin created successfully"});
    }
});

app.post('/admin/login', adminAuth, (req, res) => {
  res.json({message: "Admin logged in successfully"});
});

app.post('/admin/courses', adminAuth, (req, res) => {
    let {title} = req.body;
    const id = Date.now();

    let course = {
        id: id,
        title: title
    }

    COURSES.push(course);
    res.json({
        message: "Course added successfully" });

});

app.put('/admin/courses/:courseId', adminAuth, (req, res) => {
    let id = parseInt(req.params.courseId)
    let course = COURSES.find(a => a.id === id)
    let title = req.body.title;

    if(!title) {
        res.status(411).json({
            message: "Incorrect parameters provided for updation"
        }) 
    }
    if(course) {
        course.title = req.body.title;
        res.json({
            message: "Course updated successfully"
        })
    } else {
        res.status(401).json({
            message: "Course with given id does not exist"
        })
    }
   
});

app.get('/admin/courses',adminAuth, (req, res) => {
  res.json({
    Courses: COURSES
  })
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
});

app.post('/users/login', (req, res) => {
  // logic to log in user
});

app.get('/users/courses', (req, res) => {
  // logic to list all courses
});

app.post('/users/courses/:courseId', (req, res) => {
  // logic to purchase a course
});

app.get('/users/purchasedCourses', (req, res) => {
  // logic to view purchased courses
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});