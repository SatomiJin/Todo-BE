import { where } from "sequelize";
import db from "../models/index";

const createTodo = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkTodo = await db.Todo.findOne({
        where: { todoTitle: data.todoTitle },
        raw: false,
      });
      if (!data.email || !data.contentMarkdown || !data.contentHTML || !data.todoTitle) {
        resolve({
          status: "ERROR",
          message: "Missing parameters...",
        });
      }
      if (checkTodo) {
        resolve({
          status: "ERROR",
          message: "Todo is exist!! try again",
        });
      }
      let newTodo = await db.Todo.create({
        email: data.email,
        contentMarkdown: data.contentMarkdown,
        contentHTML: data.contentHTML,
        todoTitle: data.todoTitle,
        status: false,
      });
      if (newTodo) {
        resolve({
          status: "OK",
          message: "Add Todo success!!",
          todo: newTodo,
        });
      } else {
        resolve({
          status: "ERROR",
          message: "Add toto is fail! Try again",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateTodo = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkTodo = await db.Todo.findOne({
        where: { id: data.id, email: data.email },
        raw: false,
      });
      if (!checkTodo) {
        resolve({
          status: "ERROR",
          message: "Todo is not found!",
        });
      } else {
        checkTodo.todoTitle = data.todoTitle;
        checkTodo.contentMarkdown = data.contentMarkdown;
        checkTodo.contentHTML = data.contentHTML;
        checkTodo.createdAt = new Date();
        checkTodo.status = data.status;
        await checkTodo.save();
        resolve({
          status: "OK",
          message: "Update todo is success!!",
          todo: checkTodo,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllTodo = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let listTodo = await db.Todo.findAll();

      if (listTodo.length < 0) {
        resolve({
          status: "ERROR",
          message: "Todo empty!",
        });
      } else {
        resolve({
          status: "OK",
          message: "Get list todo is success!!",
          list: listTodo,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getTodoByUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email) {
        resolve({
          status: "ERROR",
          message: "Missing parameters...",
        });
      } else {
        let getTodo = await db.Todo.findAll({
          where: { email: data.email },
        });
        if (getTodo.length < 1) {
          resolve({
            status: "OK",
            message: "Data is empty!",
            list: getTodo,
          });
        }
        resolve({
          status: "OK",
          message: "Get data is success!",
          list: getTodo,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getTodoById = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.id) {
        resolve({
          status: "ERROR",
          message: "Missing parameters...",
        });
      }
      let checkTodo = await db.Todo.findOne({
        where: { id: data.id, email: data.email },
        raw: false,
      });

      if (!checkTodo) {
        resolve({
          status: "ERROR",
          message: "Todo is not found!",
        });
      }
      resolve({
        status: "OK",
        message: "Get todo is success!",
        todo: checkTodo,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteTodoById = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.id) {
        resolve({
          status: "ERROR",
          message: "Missing parameters...",
        });
      }
      let checkTodo = await db.Todo.findOne({
        where: { id: data.id, email: data.email },
        raw: false,
      });

      if (!checkTodo) {
        resolve({
          status: "ERROR",
          message: "Item was not found!",
        });
      } else {
        await checkTodo.destroy();
        resolve({
          status: "OK",
          message: "Delete todo successfully!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const confirmTodo = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.email) {
        resolve({
          status: "ERROR",
          message: "Missing parameters...",
        });
      }
      let confirmTodoStatus = await db.Todo.findOne({
        where: { id: data.id, email: data.email },
        raw: false,
      });
      if (!confirmTodoStatus) {
        resolve({
          status: "ERROR",
          message: "Todo was not found!",
        });
      } else {
        confirmTodoStatus.status = true;
        await confirmTodoStatus.save();
        resolve({
          status: "OK",
          message: "Confirm todo is success!",
          // todo: confirmTodoStatus,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const countTodo = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let countTodo = await db.Todo.findAll();
      if (countTodo.length > 0) {
        resolve({
          status: "OK",
          message: "Get information success!",
          title: "Số lượng công việc",
          countTodo: countTodo.length,
          listTodo: countTodo,
        });
      } else {
        resolve({
          status: "ERROR",
          message: "Data is empty!",
          title: "Số lượng công việc",
          countTodo: countTodo.length,
          listTodo: countTodo,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
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
