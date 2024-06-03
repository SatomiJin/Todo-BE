import TodoService from "../service/TodoService";

const createTodo = async (req, res) => {
  try {
    let response = await TodoService.createTodo(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log("e", e);
    return res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    let response = await TodoService.updateTodo(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log("error:", e);
    return res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

const getAllTodo = async (req, res) => {
  try {
    let response = await TodoService.getAllTodo();
    return res.status(200).json(response);
  } catch (e) {
    console.log("error:", e);
    return res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

const getTodoByUser = async (req, res) => {
  try {
    let response = await TodoService.getTodoByUser(req.headers);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

const getTodoById = async (req, res) => {
  try {
    let response = await TodoService.getTodoById(req.headers);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

const deleteTodoById = async (req, res) => {
  try {
    let response = await TodoService.deleteTodoById(req.headers);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

const confirmTodo = async (req, res) => {
  try {
    let response = await TodoService.confirmTodo(req.headers);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

const countTodo = async (req, res) => {
  try {
    let response = await TodoService.countTodo();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};
module.exports = {
  createTodo,
  updateTodo,
  getAllTodo,
  getTodoByUser,
  getTodoById,
  deleteTodoById,
  confirmTodo,
  countTodo,
};
