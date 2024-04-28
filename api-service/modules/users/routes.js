const express = require("express");
const { registerUserController } = require("./register/controller");
const { authenticateUserController } = require("./authenticate/controller");

const userRouter = express.Router();

userRouter.post("/register", registerUserController.handle);
userRouter.post("/login", authenticateUserController.handle);

module.exports = userRouter;
