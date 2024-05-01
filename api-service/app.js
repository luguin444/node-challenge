require("express-async-errors");
require("./config/env");
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSetUpFile = require("./swaggerSetUpFile.json");
const logger = require("morgan");

const userRouter = require("./modules/users/routes");
const stockRouter = require("./modules/stocks/routes");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSetUpFile));
app.use("/", userRouter);
app.use("/", stockRouter);

app.use(function (error, req, res, next) {
  const status = error.status || 500;

  res.status(status).json({
    name: error.name,
    message: error.message,
  });
});

module.exports = app;
