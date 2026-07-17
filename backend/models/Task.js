const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Done"],
    default: "To Do",
  },
  deadline: Date,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Task", TaskSchema);
