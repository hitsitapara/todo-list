const express = require("express");
const router = express.Router();
const {
  addTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  markCompleted,
} = require("../controllers/todoController");

router.post("/", addTodo);
router.get("/", getTodos);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);
router.patch("/:id/complete", markCompleted);

module.exports = router;
