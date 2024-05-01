const axios = require("axios");
const { NotFoundError } = require("../../../errors/http/notFoundError");
const { prisma } = require("../../../libs/prisma");

class GetStockBySymbolUseCase {
  async execute(userId, stockSymbol) {
    const stock = await this.getStockData(stockSymbol);
    if (!stock) throw new NotFoundError("Stock not found by the symbol");

    await prisma.query.create({
      data: {
        userId: userId,
        name: stock.name,
        symbol: stock.symbol,
        open: stock.open,
        high: stock.high,
        low: stock.low,
        close: stock.close,
      },
    });

    return stock;
  }

  async getStockData(stockSymbol) {
    try {
      const response = await axios.get(
        `${process.env.STOCK_SERVICE_URL}/stocks?q=${stockSymbol}`
      );

      return response.data;
    } catch (_e) {
      return null;
    }
  }
}

const getStockBySymbolUseCase = new GetStockBySymbolUseCase();

module.exports = { getStockBySymbolUseCase };
