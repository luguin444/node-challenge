const express = require("express");
const { registerUserController } = require("./register/controller");
const { authenticateUserController } = require("./authenticate/controller");
const { verifyJWT } = require("../../middlewares/verifyJwt");
const { getHistoryOfSearchController } = require("./searchHistory/controller");
const { resetPasswordController } = require("./resetPassword/controller");

const userRouter = express.Router();

userRouter.post("/register", verifyJWT, registerUserController.handle);
userRouter.post("/login", authenticateUserController.handle);
userRouter.post("/reset_password", verifyJWT, resetPasswordController.handle);

userRouter.get("/history", verifyJWT, getHistoryOfSearchController.handle);

module.exports = userRouter;
