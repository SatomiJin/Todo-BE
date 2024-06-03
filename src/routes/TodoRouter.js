import express from "express";
import { authUserMiddleware, auth } from "../middleware/UserMiddleware";
import TodoController from "../controller/TodoController";
let router = express.Router();

router.post("/create-todo", authUserMiddleware, TodoController.createTodo);
router.post("/update-todo", authUserMiddleware, TodoController.updateTodo);
router.post("/confirm-todo-user", authUserMiddleware, TodoController.confirmTodo);
router.get("/get-all-todo", TodoController.getAllTodo);
router.get("/get-all-todo-user", authUserMiddleware, TodoController.getTodoByUser);
router.get("/get-todo-by-id", authUserMiddleware, TodoController.getTodoById);
router.get("/count-todo", TodoController.countTodo);
router.delete("/delete-todo-by-id", authUserMiddleware, TodoController.deleteTodoById);
module.exports = router;
