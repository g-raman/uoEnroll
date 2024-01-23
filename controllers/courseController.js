const Course = require("../models/courseModel");
const Section = require("../models/sectionModel");
const Component = require("../models/componentModel");
const catchAsync = require("../utils/catchAsync");

exports.getCourse = catchAsync(async (req, res, next) => {
  const data = await Course.findOne({
    courseCode: req.params.courseCode,
  }).populate({
    path: "sections",
    select: "-_id -__v",
    populate: {
      path: "lecture labs dgds tutorials",
      select: "-_id -__v",
    },
  });

  res.status(200).json({
    status: "success",
    data,
  });
});
