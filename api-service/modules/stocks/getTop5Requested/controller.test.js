const request = require("supertest");
const app = require("../../../app");
const {
  getHeadersObjectWithCorrectJWT,
  generateJwtToken,
} = require("../../../test/helpers/generateJwt");
const { userFactory } = require("../../../test/factories/user");
const { sessionFactory } = require("../../../test/factories/session");
const { queryFactory } = require("../../../test/factories/query");

describe("TEST GET /stats", () => {
  it("should return unauthorized, since it has no JWT token", async () => {
    const response = await request(app).get(`/stats`);

    expect(response.body).toEqual({
      name: "AuthenticationError",
      message: "JWT token is compulsory",
    });
    expect(response.status).toBe(401);
  });

  it("should return unauthorized, since user is not ADMIN", async () => {
    const user = await userFactory({ role: "USER" });
    const session = await sessionFactory({ userId: user.id });

    const token = await generateJwtToken({
      userId: user.id,
      sessionId: session.id,
    });
    const headers = await getHeadersObjectWithCorrectJWT(token);

    const response = await request(app).get(`/stats`).set(headers);

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      name: "AuthenticationError",
      message: "User is not an admin",
    });
  });

  it("should return top stocks searched", async () => {
    const user = await userFactory({ role: "USER_ADMIN" });
    const session = await sessionFactory({ userId: user.id });

    const token = await generateJwtToken({
      userId: user.id,
      sessionId: session.id,
    });
    const headers = await getHeadersObjectWithCorrectJWT(token);

    const queries = ["A.US", "A.US"];
    for (const symbol of queries) {
      await queryFactory({ symbol });
    }

    const response = await request(app).get(`/stats`).set(headers);

    expect(response.status).toBe(200);
    expect(response.body[0]).toEqual({
      stock: "A.US",
      times_requested: 2,
    });
  });
});
