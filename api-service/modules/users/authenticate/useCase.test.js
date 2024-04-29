const jwt = require("jsonwebtoken");
const { userFactory } = require("../../../test/factories/user");
const { authenticateUserUseCase } = require("./useCase");
const { prisma } = require("../../../libs/prisma");

describe("TEST AuthenticateUserUseCase", () => {
  it("should create session and return correct JWT", async () => {
    const password = "123456";
    const user = await userFactory({ password });
    const data = {
      email: user.email,
      password: password,
    };

    const token = await authenticateUserUseCase.execute(data);

    const decodedData = await jwt.verify(token, process.env.JWT_SECRET);

    const session = await prisma.session.findFirst({
      where: { id: decodedData.sessionId, userId: decodedData.userId },
    });

    expect(session).toBeTruthy();
    expect(decodedData.userId).toBe(user.id);
  });
});
