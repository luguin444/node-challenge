const { v4: uuidv4 } = require("uuid");
const { prisma } = require("../../../libs/prisma");

class RegisterUserUseCase {
  async execute(data) {
    const { email, role } = data;

    const roles = {
      user: "USER",
      "user/admin": "USER_ADMIN",
    };

    const user = await prisma.user.create({
      data: {
        email,
        role: roles[role],
        password: uuidv4(),
      },
    });

    return { email: user.email, password: user.password };
  }
}

const registerUserUseCase = new RegisterUserUseCase();

module.exports = { registerUserUseCase };
