import db from "../models/index";
import bcrypt from "bcryptjs";

import { generalAccessToken, generalRefreshToken } from "./JwtService";
const salt = bcrypt.genSaltSync(10);

let signUpUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.password || !data.displayName || !data.phoneNumber || !data.gender) {
        resolve({
          status: "ERROR",
          message: "Missing parameters...",
        });
      } else {
        let checkEmail = await db.User.findOne({
          where: { email: data.email },
        });

        if (checkEmail) {
          resolve({
            status: "ERROR",
            message: "The email is existed",
          });
        } else {
          const hashPassword = await await bcrypt.hashSync(data.password, salt);
          let newUser = await db.User.create({
            email: data.email,
            password: hashPassword,
            phoneNumber: data.phoneNumber,
            displayName: data.displayName,
            gender: data.gender,
            role: data.role || "R2",
            image: data.image,
          });
          resolve({
            status: "OK",
            message: "Create user is success!",
            information: newUser,
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let SignInUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.password) {
        resolve({
          status: "WARNING",
          message: "Please fill in all fields",
        });
      } else {
        let checkUser = await db.User.findOne({
          where: { email: data.email },
          raw: true,
        });
        if (!checkUser) {
          resolve({
            status: "ERROR",
            message: "Email is not found!",
          });
        }
        let comparePassword = await bcrypt.compareSync(data.password, checkUser.password);
        if (!comparePassword) {
          resolve({
            status: "ERROR",
            message: "Email or password is incorrect",
          });
        } else {
          let access_token = await generalAccessToken({
            email: checkUser.email,
            role: checkUser.role,
          });
          let refresh_token = await generalRefreshToken({
            email: checkUser.email,
            role: checkUser.role,
          });
          resolve({
            status: "OK",
            message: "Login success!",
            access_token: access_token,
            refresh_token: refresh_token,
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email) {
        resolve({
          status: "ERROR",
          message: "Missing parameters...",
        });
      }
      let detailUser = await db.User.findOne({
        where: { email: data.email },
        raw: false,
        attributes: {
          exclude: ["password", "createdAt", "updatedAt", "id"],
        },
      });
      if (detailUser) {
        if (detailUser && detailUser.image) {
          detailUser.image = Buffer.from(detailUser.image, "base64").toString("binary");
        }
        resolve({
          status: "OK",
          message: "Get detail's user is success!",
          user: detailUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateInfoUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email1) {
        resolve({
          status: "ERROR",
          message: "Missing parameters....",
        });
      } else {
        let checkUser = await db.User.findOne({
          where: { email: data.email },
          raw: false,
        });

        if (!checkUser) {
          resolve({
            status: "ERROR",
            message: "User is not define!",
          });
        } else {
          checkUser.phoneNumber = data.phoneNumber;
          checkUser.displayName = data.displayName;
          checkUser.gender = data.gender;
          checkUser.image = data.image;
          checkUser.role = data.role;
          await checkUser.save();
          resolve({
            status: "OK",
            message: "Update user is success!!!",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

const countUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let countUser = await db.User.findAll({
        attributes: {
          exclude: ["displayName", "gender", "role", "email", "password", "createdAt", "updatedAt"],
        },
      });
      if (countUser.length > 0) {
        resolve({
          status: "OK",
          message: "Get information success!!",
          title: "Số lượng người dùng",
          countUser: countUser.length,
        });
      } else {
        resolve({
          status: "ERROR",
          message: "Data is Empty!!",
          title: "Số lượng người dùng",
          countUser: countUser.length,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let listUser = await db.User.findAll();
      if (listUser.length > 0) {
        resolve({
          status: "OK",
          message: "Get list user was success!!",
          data: listUser,
        });
      } else {
        resolve({
          status: "ERROR",
          message: "Get list user was success!!",
          data: listUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const deleteUserById = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkUser = await db.User.findOne({
        where: { email: data.email1, id: data.id },
      });
      if (!checkUser) {
        resolve({
          status: "ERROR",
          message: "User is not defined!",
        });
      } else {
        await checkUser.destroy();
        resolve({
          status: "OK",
          message: "Delete user is success!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  signUpUser,
  SignInUser,
  getDetailUser,
  updateInfoUser,
  countUser,
  getAllUser,
  deleteUserById,
};
