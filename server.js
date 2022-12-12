const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Course = require('./models/course');
const bodyParser = require('body-parser')

const port = 3000;
const uri = "mongodb+srv://admin-sdev255:admin-password@m08db.7yam6ar.mongodb.net/faux-school?retryWrites=true&w=majority";

const app = express();
app.use(cors());
app.use(bodyParser.json())

//connect to mongodb
try {
    mongoose.connect(
        uri, {useNewUrlParser: true, useUnifiedTopology: true},
        () => console.log("mongoose is connected")
    );

} catch (e) {
    console.log("could not connect")
}

app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

//Routes

app.get('/api/courses', (req, res) => {
    Course.find()
    .then(result => {
        res.send(result);
    });
});
app.patch('/api/course/edit', (req, res) => {
    console.log(req.body.courseCredits)    
    Course.findById(req.body.courseID)
    .then((resp) => {
        resp.name = req.body.courseName
        resp.title = req.body.courseTitle
        resp.credits = req.body.courseCredits
        resp.save() 
    })
});
// Get a single Course
app.post('/api/course', (req, res) => {
	Course.findById(req.body.courseID)
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			console.log(err);
		});
});

app.post("/api/course/add", (req, res, next) => {
    course = new Course({
        name: req.body.name,
        title: req.body.title
    });
    console.log(course);
    course.save(function (err, course){
        if (err){
            return next(err)
        }
        res.status(201).json(course)
    })
})

app.post("/api/course/delete", (req, res) => {
  Course.findByIdAndDelete(req.body.courseID, (err) => {
    if (err) console.log(err)
    console.log("successful deletion")
  })
})



app.listen(port, () => console.log('App Running'));

