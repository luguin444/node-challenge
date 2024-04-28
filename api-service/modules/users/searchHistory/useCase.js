const { prisma } = require("../../../libs/prisma");

class GetHistoryOfSearchUseCase {
  async execute(userId) {
    const queries = await prisma.query.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const serializedQueries = queries.map((query) => {
      return {
        date: query.createdAt,
        name: query.name,
        symbol: query.symbol,
        open: query.open.toString(),
        high: query.high,
        low: query.low,
        close: query.close.toString(),
      };
    });

    return serializedQueries;
  }
}

const getHistoryOfSearchUseCase = new GetHistoryOfSearchUseCase();

module.exports = { getHistoryOfSearchUseCase };
