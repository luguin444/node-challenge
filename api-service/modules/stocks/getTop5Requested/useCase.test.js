const { queryFactory } = require("../../../test/factories/query");
const { userFactory } = require("../../../test/factories/user");
const { getHistoryOfSearchUseCase, getTop5UseCase } = require("./useCase");

describe("TEST GetTop5UseCase", () => {
  it("should catch the top 5 stocks requested", async () => {
    const queries = [
      "ACT.US",
      "ACORQ.US",
      "ACORQ.US",
      "ACP_A.US",
      "ACP_A.US",
      "ACP_A.US",
      "A.US",
      "A.US",
      "A.US",
      "A.US",
      "AAPL",
      "AAPL",
      "AAPL",
      "AAPL",
      "AAPL",
      "AACG.US",
      "AACG.US",
      "AACG.US",
      "AACG.US",
      "AACG.US",
      "AACG.US",
    ];
    for (const symbol of queries) {
      await queryFactory({ symbol });
    }

    const top5MostRequested = await getTop5UseCase.execute();

    expect(top5MostRequested.length).toBe(5);

    expect(top5MostRequested[0]).toEqual({
      stock: "AACG.US",
      times_requested: 6,
    });
    expect(top5MostRequested[1]).toEqual({
      stock: "AAPL",
      times_requested: 5,
    });
    expect(top5MostRequested[2]).toEqual({
      stock: "A.US",
      times_requested: 4,
    });
    expect(top5MostRequested[3]).toEqual({
      stock: "ACP_A.US",
      times_requested: 3,
    });
    expect(top5MostRequested[4]).toEqual({
      stock: "ACORQ.US",
      times_requested: 2,
    });
  });
});
