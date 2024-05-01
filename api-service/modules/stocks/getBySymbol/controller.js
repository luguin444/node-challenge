const {
  UnprocessableEntityError,
} = require("../../../errors/http/unprocessableEntityError");
const { getStockBySymbolUseCase } = require("./useCase");

class GetStockBySymbolController {
  async handle(req, res) {
    const stockSymbol = req.query.q;
    const userId = req.userId;

    if (!stockSymbol)
      throw new UnprocessableEntityError("Stock symbol is required");

    const stock = await getStockBySymbolUseCase.execute(userId, stockSymbol);
    res.status(200).send(stock);
  }
}

const getStockBySymbolController = new GetStockBySymbolController();

module.exports = { getStockBySymbolController };
