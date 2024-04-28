const { getStockBySymbolUseCase } = require("./useCase");

class GetStockBySymbolController {
  async handle(req, res) {
    const stockSymbol = req.query.q;
    const userId = req.userId;

    const stock = await getStockBySymbolUseCase.execute(userId, stockSymbol);
    res.status(200).send(stock);
  }
}

const getStockBySymbolController = new GetStockBySymbolController();

module.exports = { getStockBySymbolController };
