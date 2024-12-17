const Todo = require("../models/Todo");

const sanitizeInput = (inputObject) => {
  const sanitized = {};

  for (const key in inputObject) {
    let value = inputObject[key];
    if (typeof value === "string") {
      value = value.replace(/[<>\/]/g, "");
      value = value.trim();
    }
    if (
      typeof value === "number" ||
      typeof value === "boolean" ||
      typeof value === "string"
    )
      sanitized[key] = value;
  }
  return sanitized;
};

exports.addTodo = async (req, res) => {
  try {
    console.log(sanitizeInput(req.body));
    const { title, description } = sanitizeInput(req.body);
    if (!title) return res.status(400).json({ error: "Title is required" });
    const newTodo = await Todo.create({ title, description });
    res.status(201).json({ message: "Todo created", todo: newTodo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({}).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = sanitizeInput(req.params);
    const { title, description, completed } = sanitizeInput(req.body);
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, description, completed, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedTodo) return res.status(404).json({ error: "Todo not found" });
    res.json({ message: "Todo updated", todo: updatedTodo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = sanitizeInput(req.params);
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) return res.status(404).json({ error: "Todo not found" });
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.markCompleted = async (req, res) => {
  try {
    const { id } = sanitizeInput(req.params);
    const completedTodo = await Todo.findByIdAndUpdate(
      id,
      { completed: true, updatedAt: Date.now() },
      { new: true }
    );
    if (!completedTodo)
      return res.status(404).json({ error: "Todo not found" });
    res.json({ message: "Todo marked as completed", todo: completedTodo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
