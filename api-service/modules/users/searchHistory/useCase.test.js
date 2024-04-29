const { queryFactory } = require("../../../test/factories/query");
const { userFactory } = require("../../../test/factories/user");
const { getHistoryOfSearchUseCase } = require("./useCase");

describe("TEST GetHistoryOfSearchUseCase", () => {
  it("should catch the queries from the user in order DESC by date", async () => {
    const user = await userFactory();
    const firstQuery = await queryFactory({ userId: user.id });
    const lastQuery = await queryFactory({ userId: user.id });

    const queries = await getHistoryOfSearchUseCase.execute(user.id);

    expect(queries.length).toBe(2);

    expect(queries[0]).toMatchObject({
      date: lastQuery.createdAt,
      name: lastQuery.name,
      symbol: lastQuery.symbol,
      open: lastQuery.open.toString(),
      high: lastQuery.high,
      low: lastQuery.low,
      close: lastQuery.close.toString(),
    });
    expect(queries[1]).toMatchObject({
      date: firstQuery.createdAt,
      name: firstQuery.name,
      symbol: firstQuery.symbol,
      open: firstQuery.open.toString(),
      high: firstQuery.high,
      low: firstQuery.low,
      close: firstQuery.close.toString(),
    });
  });
});
