import express from "express";
import { createTodo, deleteTodo, listTodos, toggleTodo } from "./todos.js";
const router = express.Router();

router
  .route('/')
  .get(listTodos)
  .post(createTodo)
  
router
  .route("/:id")
  .patch(toggleTodo)
  .delete(deleteTodo);

export { router };
