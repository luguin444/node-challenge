const { prisma } = require("../libs/prisma");
const { AuthenticationError } = require("../errors/http/authenticationError");
const { userFactory } = require("../test/factories/user");
const { verifyAdminUser } = require("./verifyAdminUser");

describe("TEST Admin middleware", () => {
  it("should throw Authentication error, because userId was not provided", async () => {
    const req = {
      userId: null,
    };

    const res = {};
    const next = jest.fn();

    await expect(verifyAdminUser(req, res, next)).rejects.toBeInstanceOf(
      AuthenticationError
    );
    await expect(verifyAdminUser(req, res, next)).rejects.toThrow(
      "UserId was not provided"
    );

    expect(next).not.toHaveBeenCalled();
  });

  it("should throw Authentication error, because there is no user with this id", async () => {
    const req = {
      userId: 99999999,
    };

    const res = {};
    const next = jest.fn();

    await expect(verifyAdminUser(req, res, next)).rejects.toBeInstanceOf(
      AuthenticationError
    );
    await expect(verifyAdminUser(req, res, next)).rejects.toThrow(
      "User is not an admin"
    );

    expect(next).not.toHaveBeenCalled();
  });

  it("should throw Authentication error, because user is not ADMIN_USER", async () => {
    const user = await userFactory({ role: "USER" });
    const req = {
      userId: user.id,
    };

    const res = {};
    const next = jest.fn();

    await expect(verifyAdminUser(req, res, next)).rejects.toBeInstanceOf(
      AuthenticationError
    );
    await expect(verifyAdminUser(req, res, next)).rejects.toThrow(
      "User is not an admin"
    );

    expect(next).not.toHaveBeenCalled();
  });

  it("should call next function, because user is ADMIN_USER", async () => {
    const user = await userFactory({ role: "USER_ADMIN" });
    const req = {
      userId: user.id,
    };

    const res = {};
    const next = jest.fn();

    await verifyAdminUser(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
