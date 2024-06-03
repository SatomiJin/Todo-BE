import jwt from "jsonwebtoken";
require("dotenv").config();

const authUserMiddleware = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  const emailUser = req.headers.email;
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(200).json({
        status: "ERROR",
        message: "Authorized is failed!!!",
        information: err,
      });
    }

    if (user.email === emailUser || user.role === "R1") {
      next();
    } else {
      return res.status(200).json({
        status: "ERROR",
        message: "Authorized is failed!!!",
      });
    }
  });
};

const authMiddleWare = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(200).json({
        status: "ERROR",
        message: "Authorized was failed!",
        error: err,
      });
    }
    if (user?.role === "R1") {
      next();
    } else {
      return res.status(200).json({
        status: "ERROR",
        message: "Authorized was failed!",
        error: err,
      });
    }
  });
};
module.exports = {
  authUserMiddleware,
  authMiddleWare,
};
