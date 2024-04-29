const request = require("supertest");
const app = require("../../../app");
const { userFactory } = require("../../../test/factories/user");

describe("TEST POST /login", () => {
  it("should call return 400, since the body has no password", async () => {
    const data = {
      email: "johndoe@contoso.com",
    };

    const response = await request(app).post(`/login`).send(data);

    expect(response.status).toBe(422);
    expect(response.body).toMatchObject({
      name: "UnprocessableEntityError",
      message: "Invalid data",
    });
  });

  it("should give AuthenticationError when there is no user with the email", async () => {
    const data = {
      email: "johndoe@contoso.com",
      password: "123456",
    };

    const response = await request(app).post(`/login`).send(data);

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      name: "AuthenticationError",
      message: "Credentials is not valid",
    });
  });

  it("should give AuthenticationError when password is wrong", async () => {
    const user = await userFactory();
    const data = {
      email: user.email,
      password: "INVALID",
    };

    const response = await request(app).post(`/login`).send(data);

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      name: "AuthenticationError",
      message: "Credentials is not valid",
    });
  });

  it("should return JWT token", async () => {
    const password = "123456";
    const user = await userFactory({ password });
    const data = {
      email: user.email,
      password: password,
    };

    const response = await request(app).post(`/login`).send(data);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      token: expect.any(String),
    });
  });
});
