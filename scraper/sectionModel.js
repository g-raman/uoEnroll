const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  section: {
    type: String,
  },
  lecture: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lecture",
  },
  labs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lab",
    },
  ],
  dgds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dgd",
    },
  ],
  tutorials: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutorial",
    },
  ],
});

const sectionModel = mongoose.model("Section", sectionSchema);
module.exports = sectionModel;
