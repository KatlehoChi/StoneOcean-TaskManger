const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const Task = require("../models/Task");

// Create Task
router.post("/", auth, async (req, res) => {
  const { title, description, status, deadline } = req.body;
  try {
    const newTask = new Task({
      title,
      description,
      status,
      deadline,
      userId: req.user.id,
    });
    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Get Tasks
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Update Task
router.put("/:id", auth, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    if (task.userId.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not authorized" });

    task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Delete Task
router.delete("/:id", auth, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    if (task.userId.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not authorized" });

    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: "Task removed" });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
