const { ConflictError } = require("../../../errors/http/conflictError");
const { prisma } = require("../../../libs/prisma");
const { userFactory } = require("../../../test/factories/user");
const { registerUserUseCase } = require("./useCase");
const { compare } = require("bcrypt");

describe("TEST RegisterUserUseCase", () => {
  it("should throw conflict error", async () => {
    const emailRepeated = "teste@gmail.com";
    await userFactory({ email: emailRepeated });

    const data = {
      email: emailRepeated,
      role: "user",
    };
    await expect(registerUserUseCase.execute(data)).rejects.toBeInstanceOf(
      ConflictError
    );
    await expect(registerUserUseCase.execute(data)).rejects.toThrow(
      "User already exists with this email"
    );
  });

  it("should create admin user with hashed password", async () => {
    const data = {
      email: "teste@gmail.com",
      role: "user/admin",
    };
    const user = await registerUserUseCase.execute(data);

    const userCreatedInDB = await prisma.user.findFirst({
      where: { email: data.email },
    });

    const isPasswordValid = await compare(
      user.password,
      userCreatedInDB.password
    );

    expect(userCreatedInDB).toMatchObject({
      email: data.email,
      role: "USER_ADMIN",
    });
    expect(isPasswordValid).toBe(true);
  });

  it("should create user with hashed password", async () => {
    const data = {
      email: "teste@gmail.com",
      role: "user",
    };
    const user = await registerUserUseCase.execute(data);

    const userCreatedInDB = await prisma.user.findFirst({
      where: { email: data.email },
    });

    const isPasswordValid = await compare(
      user.password,
      userCreatedInDB.password
    );

    expect(userCreatedInDB).toMatchObject({
      email: data.email,
      role: "USER",
    });
    expect(isPasswordValid).toBe(true);
  });
});
