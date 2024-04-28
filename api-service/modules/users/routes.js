const express = require("express");
const { registerUserController } = require("./register/controller");

const userRouter = express.Router();

userRouter.post("/register", registerUserController.handle);

module.exports = userRouter;
