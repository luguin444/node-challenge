const { prisma } = require("../../../libs/prisma");

class GetTop5UseCase {
  async execute() {
    const top5MostRequested = await prisma.query.groupBy({
      by: ["symbol"],
      _count: {
        symbol: true,
      },
      orderBy: {
        _count: {
          symbol: "desc",
        },
      },
      take: 5,
    });

    const resultSerialized = top5MostRequested.map((stock) => {
      return {
        stock: stock.symbol,
        times_requested: stock._count.symbol,
      };
    });

    return resultSerialized;
  }
}

const getTop5UseCase = new GetTop5UseCase();

module.exports = { getTop5UseCase };
