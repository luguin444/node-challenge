const express = require("express");
const { getStockBySymbolController } = require("./getBySymbol/controller");
const { verifyJWT } = require("../../middlewares/verifyJwt");
const { getTop5Controller } = require("./getTop5Requested/controller");
const { verifyAdminUser } = require("../../middlewares/verifyAdminUser");

const stockRouter = express.Router();

stockRouter.get("/stock", verifyJWT, getStockBySymbolController.handle);

stockRouter.get("/stats", verifyJWT, verifyAdminUser, getTop5Controller.handle);

module.exports = stockRouter;
