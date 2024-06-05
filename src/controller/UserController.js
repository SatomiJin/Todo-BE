import UserService from "../service/UserService";
import refreshTokenJwtService from "../service/JwtService";

const signUpUser = async (req, res) => {
  try {
    let response = await UserService.signUpUser(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log("ERROR:", e.toString());
    return res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

const SignInUser = async (req, res) => {
  try {
    let response = await UserService.SignInUser(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log("ERROR:", e);
    return res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

const getDetailUser = async (req, res) => {
  try {
    let response = await UserService.getDetailUser(req.headers);
    return res.status(200).json(response);
  } catch (e) {
    console.log("ERROR:", e);
    return res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

const updateInfoUser = async (req, res) => {
  try {
    let response = await UserService.updateInfoUser(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log("ERROR:", e);
    return res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    let token = req.headers.token.split(" ")[1];
    if (!token) {
      return res.status(200).json({
        status: "ERROR",
        message: "Missing parameters...",
      });
    }
    const response = await refreshTokenJwtService(token);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

const countUser = async (req, res) => {
  try {
    let response = await UserService.countUser();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    let response = await UserService.getAllUser();
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

const deleteUserById = async (req, res) => {
  try {
    let response = await UserService.deleteUserById(req.headers);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
      error: e,
    });
  }
};
module.exports = {
  signUpUser,
  SignInUser,
  getDetailUser,
  updateInfoUser,
  refreshToken,
  countUser,
  getAllUser,
  deleteUserById,
};
