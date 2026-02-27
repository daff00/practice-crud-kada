import express from "express";
import Todo from "../models/models.js";

const router = express.Router();

// Get
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Post
router.post("/", async (req, res) => {
  try {
    const { task, status } = req.body;

    const todo = await Todo.create({ task, status });

    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// find one
router.get("/:id", async (req, res) => {
  try {
    const findById = await Todo.findById(req.params.id);
    if (!findById) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(findById);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update
router.patch("/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      returnValidators: true,
      returnDocument: "after",
    });

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// delete
router.delete("/:id", async (req, res) => {
  try {
    const deleteTask = await Todo.findByIdAndDelete(req.params.id);
    if (!deleteTask) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json({ message: `Successful delete task with id ${req.params.id}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
