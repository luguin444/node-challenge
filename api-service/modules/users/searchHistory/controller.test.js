const request = require("supertest");
const app = require("../../../app");
const {
  getHeadersObjectWithCorrectJWT,
  generateJwtToken,
} = require("../../../test/helpers/generateJwt");
const { userFactory } = require("../../../test/factories/user");
const { sessionFactory } = require("../../../test/factories/session");
const { queryFactory } = require("../../../test/factories/query");

describe("TEST GET /history", () => {
  it("should return unauthorized, since it has no JWT token", async () => {
    const response = await request(app).get(`/history`);

    expect(response.body).toEqual({
      name: "AuthenticationError",
      message: "JWT token is compulsory",
    });
    expect(response.status).toBe(401);
  });

  it("should return queries correctly serialized", async () => {
    const user = await userFactory();
    const session = await sessionFactory({ userId: user.id });

    const token = await generateJwtToken({
      userId: user.id,
      sessionId: session.id,
    });
    const headers = await getHeadersObjectWithCorrectJWT(token);

    await queryFactory({ userId: user.id });
    await queryFactory({ userId: user.id });
    await queryFactory({ userId: user.id });

    const response = await request(app).get(`/history`).set(headers);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3);
    expect(response.body[0]).toMatchObject({
      date: expect.any(String),
      name: "APPLE",
      symbol: "AAPL.US",
      open: expect.any(String),
      high: expect.any(Number),
      low: expect.any(Number),
      close: expect.any(String),
    });
  });
});
