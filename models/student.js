const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  age: {
    type: Number,
    default: 20,
    max: [80, "too old for a student"],
  },
  scholarship: {
    merit: { type: Number, min: 0, max: 6000 },
    other: { type: Number, min: 0 },
  },
});

module.exports = mongoose.model("Student", studentSchema);
