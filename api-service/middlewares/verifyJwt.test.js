const { AuthenticationError } = require("../errors/http/authenticationError");
const { sessionFactory } = require("../test/factories/session");
const { userFactory } = require("../test/factories/user");
const jwt = require("jsonwebtoken");
const { verifyJWT } = require("./verifyJwt");

describe("TEST JWT middleware", () => {
  it("should throw Authentication error, because token was not provided", async () => {
    const req = {
      headers: {},
    };
    const res = {};
    const next = jest.fn();

    await expect(verifyJWT(req, res, next)).rejects.toBeInstanceOf(
      AuthenticationError
    );
    await expect(verifyJWT(req, res, next)).rejects.toThrow(
      "JWT token is compulsory"
    );

    expect(next).not.toHaveBeenCalled();
  });

  it("should return throw Authentication error, because there is no session with credentials provided", async () => {
    const user = await userFactory();
    const sessionInvalid = 9999999;
    const token = jwt.sign(
      { userId: user.id, sessionId: sessionInvalid },
      process.env.JWT_SECRET
    );
    const req = {
      headers: {
        "x-access-token": token,
      },
    };
    const res = {};
    const next = jest.fn();

    await expect(verifyJWT(req, res, next)).rejects.toBeInstanceOf(
      AuthenticationError
    );
    await expect(verifyJWT(req, res, next)).rejects.toThrow(
      "JWT token is invalid"
    );

    expect(next).not.toHaveBeenCalled();
  });

  it("should pass the middleware, because everything is correct", async () => {
    const user = await userFactory();
    const session = await sessionFactory({ userId: user.id });
    const token = jwt.sign(
      { userId: user.id, sessionId: session.id },
      process.env.JWT_SECRET
    );
    const req = {
      headers: {
        "x-access-token": token,
      },
    };
    const res = {};
    const next = jest.fn();

    await verifyJWT(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
