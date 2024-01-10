const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseCode: String,
  courseName: String,
});

const courseModel = mongoose.model("course", courseSchema);
module.exports = courseModel;
