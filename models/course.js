const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: {
        type: String, 
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    credits: {
        type: Number,
        required: true
    }
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
