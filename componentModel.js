const mongoose = require("mongoose");

const componentSchema = new mongoose.Schema({
  section: {
    type: String,
  },
  timings: {
    type: String,
  },
  status: {
    type: String,
  },
});

const Lecture = mongoose.model("lecture", componentSchema);
const Lab = mongoose.model("lab", componentSchema);
const Dgd = mongoose.model("dgd", componentSchema);
const Tutorial = mongoose.model("tutorials", componentSchema);

exports.Lecture = Lecture;
exports.Lab = Lab;
exports.Dgd = Dgd;
exports.Tutorial = Tutorial;
