const { prisma } = require("../../../libs/prisma");
const { userFactory } = require("../../../test/factories/user");
const { getStockBySymbolUseCase } = require("./useCase");
const axios = require("axios");

describe("TEST GetStockBySymbolUseCase.execute", () => {
  it("should throw not found error and not create query, since mock return NULL", async () => {
    const mockGetStockData = jest
      .spyOn(getStockBySymbolUseCase, "getStockData")
      .mockImplementationOnce(async () => null);

    await expect(getStockBySymbolUseCase.execute(1, "ABEV.US")).rejects.toThrow(
      "Stock not found by the symbol"
    );

    const query = await prisma.query.findMany({ where: { symbol: "ABEV.US" } });

    expect(mockGetStockData).toHaveBeenCalledWith("ABEV.US");
    expect(query.length).toBe(0);
  });

  it("should create query in database and return stock", async () => {
    const user = await userFactory();
    const mockReturn = {
      name: "AMBEV",
      symbol: "ABEV.US",
      open: 2.33,
      high: 2.35,
      low: 2.32,
      close: 2.33,
    };
    const mockGetStockData = jest
      .spyOn(getStockBySymbolUseCase, "getStockData")
      .mockImplementationOnce(async () => mockReturn);

    const stock = await getStockBySymbolUseCase.execute(user.id, "ABEV.US");

    expect(mockGetStockData).toHaveBeenCalledWith("ABEV.US");
    expect(stock).toMatchObject(mockReturn);
  });
});

describe("TEST GetStockBySymbolUseCase.getStockData", () => {
  beforeAll(() => {
    jest.mock("axios");
  });

  it("should return what axios returned", async () => {
    const stockSymbol = "TestSymbol";
    const mockResponseData = { data: { id: 1 } };
    const mockGetAxios = jest
      .spyOn(axios, "get")
      .mockImplementationOnce(async () => mockResponseData);

    const result = await getStockBySymbolUseCase.getStockData(stockSymbol);

    expect(result).toMatchObject({ id: 1 });
    expect(mockGetAxios).toHaveBeenCalledWith(
      `${process.env.STOCK_SERVICE_URL}/stocks?q=${stockSymbol}`
    );
  });

  it("should return null id axios throw error", async () => {
    const stockSymbol = "TestSymbol";
    const mockGetAxios = jest
      .spyOn(axios, "get")
      .mockImplementationOnce(async () => {
        throw new Error("Failed to fetch data");
      });

    const result = await getStockBySymbolUseCase.getStockData(stockSymbol);

    expect(result).toBe(null);
    expect(mockGetAxios).toHaveBeenCalledWith(
      `${process.env.STOCK_SERVICE_URL}/stocks?q=${stockSymbol}`
    );
  });
});
