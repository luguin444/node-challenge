const request = require("supertest");
const app = require("../../../app");
const {
  getHeadersObjectWithCorrectJWT,
} = require("../../../test/helpers/generateJwt");
const { userFactory } = require("../../../test/factories/user");

describe("TEST POST /register", () => {
  it("should return unauthorized, since it has no JWT token", async () => {
    const response = await request(app).post(`/register`).send({
      email: "johndoe@contoso.com",
      role: "user",
    });

    expect(response.body).toEqual({
      name: "AuthenticationError",
      message: "JWT token is compulsory",
    });
    expect(response.status).toBe(401);
  });

  it("should call return 400, since the body has a role that does not exist", async () => {
    const data = {
      email: "johndoe@contoso.com",
      role: "user INVALIDO",
    };
    const headers = await getHeadersObjectWithCorrectJWT();

    const response = await request(app)
      .post(`/register`)
      .send(data)
      .set(headers);

    expect(response.status).toBe(422);
    expect(response.body).toMatchObject({
      name: "UnprocessableEntityError",
      message: "Invalid data",
    });
  });

  it("should throw confict error, since there is a user with the same email", async () => {
    const email = "johndoe@contoso.com";
    await userFactory({ email });

    const data = {
      email,
      role: "user",
    };
    const headers = await getHeadersObjectWithCorrectJWT();

    const response = await request(app)
      .post(`/register`)
      .send(data)
      .set(headers);

    expect(response.status).toBe(409);
    expect(response.body).toMatchObject({
      name: "ConflictError",
      message: "User already exists with this email",
    });
  });

  it("should create user and return 201", async () => {
    const data = {
      email: "johndoe@contoso.com",
      role: "user",
    };
    const headers = await getHeadersObjectWithCorrectJWT();

    const response = await request(app)
      .post(`/register`)
      .send(data)
      .set(headers);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      email: data.email,
      password: expect.any(String),
    });
  });
});
