const express = require("express");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/authMiddleware");
const Task = require("../models/Task");

const router = express.Router();

router.post("/", auth, [
  check("taskName").notEmpty(),
  check("dueDate").notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { taskName, description, dueDate } = req.body;

  const task = new Task({
    user: req.user.id,
    taskName,
    description,
    dueDate
  });

  await task.save();
  res.json(task);
});

router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
});

router.put("/:id", auth, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ msg: "Task not found" });

  if (task.user.toString() !== req.user.id)
    return res.status(401).json({ msg: "Not authorized" });

  Object.assign(task, req.body);
  await task.save();
  res.json(task);
});

router.delete("/:id", auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ msg: "Task removed" });
});

module.exports = router;
