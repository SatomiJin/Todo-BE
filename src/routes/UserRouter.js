import express from "express";
import UserController from "../controller/UserController";
import { authUserMiddleware, authMiddleWare } from "../middleware/UserMiddleware";
let router = express.Router();

router.post("/sign-up", UserController.signUpUser);
router.post("/sign-in", UserController.SignInUser);
router.post("/update-info-user", authUserMiddleware, UserController.updateInfoUser);
router.post("/refresh-token", authUserMiddleware, UserController.refreshToken);
router.get("/get-detail-user", authUserMiddleware, UserController.getDetailUser);
router.get("/count-user", authMiddleWare, UserController.countUser);
router.get("/get-all-user", authMiddleWare, UserController.getAllUser);
router.delete("/delete-user-by-id", UserController.deleteUserById);
module.exports = router;
