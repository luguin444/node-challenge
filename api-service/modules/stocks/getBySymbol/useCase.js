const axios = require("axios");
const { NotFoundError } = require("../../../errors/http/not-found-error");
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
        `${process.env.STOCK_API_URL}?s=${stockSymbol}&f=sd2t2ohlcvn&h&e=csv`
      );

      const data = response.data.split("\n")[1];
      const [symbol, _date, _time, open, high, low, close, _volume, name] =
        data.split(",");

      if (open === "N/D") return null;

      return {
        name: name.replace("\r", ""),
        symbol,
        open: parseFloat(open),
        high: parseFloat(high),
        low: parseFloat(low),
        close: parseFloat(close),
      };
    } catch (_e) {
      return null;
    }
  }
}

const getStockBySymbolUseCase = new GetStockBySymbolUseCase();

module.exports = { getStockBySymbolUseCase };
