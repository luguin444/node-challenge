const request = require("supertest");
const app = require("../../../app");
const {
  getHeadersObjectWithCorrectJWT,
  generateJwtToken,
} = require("../../../test/helpers/generateJwt");
const { getStockBySymbolUseCase } = require("./useCase");
const { userFactory } = require("../../../test/factories/user");
const { sessionFactory } = require("../../../test/factories/session");

describe("TEST GET /stock", () => {
  it("should return unauthorized, since it has no JWT token", async () => {
    const response = await request(app).get(`/stock`);

    expect(response.body).toEqual({
      name: "AuthenticationError",
      message: "JWT token is compulsory",
    });
    expect(response.status).toBe(401);
  });

  it("should return UnprocessableEntityError, since it has no stock symbol", async () => {
    const headers = await getHeadersObjectWithCorrectJWT(null);
    const response = await request(app).get(`/stock`).set(headers);

    expect(response.status).toBe(422);
    expect(response.body).toEqual({
      name: "UnprocessableEntityError",
      message: "Stock symbol is required",
    });
  });

  it("should call getStockBySymbolUseCase correctly", async () => {
    const user = await userFactory({ role: "USER_ADMIN" });
    const session = await sessionFactory({ userId: user.id });

    const token = await generateJwtToken({
      userId: user.id,
      sessionId: session.id,
    });
    const headers = await getHeadersObjectWithCorrectJWT(token);

    const mockedReturn = { data: "STOCK DATA" };
    const mockUseCase = jest
      .spyOn(getStockBySymbolUseCase, "execute")
      .mockImplementation(async () => mockedReturn);

    const response = await request(app).get(`/stock?q=ABEV.US`).set(headers);

    expect(response.status).toBe(200);
    expect(mockUseCase).toHaveBeenCalledWith(user.id, "ABEV.US");
    expect(response.body).toMatchObject(mockedReturn);
  });
});
