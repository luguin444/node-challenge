const { faker } = require("../../libs/faker");
const { prisma } = require("../../libs/prisma");

async function queryFactory(data = {}) {
  const dataToBeCreated = {
    userId: data.userId || (await userFactory()).id,
    name: data.name || "APPLE",
    symbol: data.symbol || "AAPL.US",
    open: data.open || faker.floating({ min: 0, max: 200 }),
    high: data.high || faker.floating({ min: 0, max: 200 }),
    low: data.low || faker.floating({ min: 0, max: 200 }),
    close: data.close || faker.floating({ min: 0, max: 200 }),
  };

  const query = await prisma.query.create({ data: dataToBeCreated });

  return query;
}

module.exports = { queryFactory };
