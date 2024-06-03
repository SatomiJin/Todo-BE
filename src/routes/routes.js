import express from "express";
import UserRouter from "./UserRouter";
import TodoRouter from "./TodoRouter";
let router = express.Router();

let initWebRoute = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/todo", TodoRouter);
};

module.exports = initWebRoute;
