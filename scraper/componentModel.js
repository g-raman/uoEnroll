const mongoose = require("mongoose");

const componentSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  section: {
    type: String,
  },
  instructor: {
    type: String,
  },
  timings: {
    type: [String],
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  status: {
    type: String,
  },
  isOpen: Boolean,
});

const Lecture = mongoose.model("Lecture", componentSchema);
const Lab = mongoose.model("Lab", componentSchema);
const Dgd = mongoose.model("Dgd", componentSchema);
const Tutorial = mongoose.model("Tutorials", componentSchema);

exports.Lecture = Lecture;
exports.Lab = Lab;
exports.Dgd = Dgd;
exports.Tutorial = Tutorial;
