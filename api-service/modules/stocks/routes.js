const express = require("express");
const { getStockBySymbolController } = require("./get_by_symbol/controller");
const { verifyJWT } = require("../../middlewares/verifyJwt");

const stockRouter = express.Router();

stockRouter.get("/stock", verifyJWT, getStockBySymbolController.handle);

module.exports = stockRouter;
