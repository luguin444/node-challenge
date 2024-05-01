const { v4: uuidv4 } = require("uuid");
const { prisma } = require("../../../libs/prisma");
const { hash } = require("bcrypt");
const { ConflictError } = require("../../../errors/http/conflictError");

class RegisterUserUseCase {
  async execute(data) {
    const { email, role } = data;

    const userWithSameEmail = await prisma.user.findFirst({
      where: { email },
    });
    if (userWithSameEmail)
      throw new ConflictError("User already exists with this email");

    const password = uuidv4();
    const hashedPassword = await hash(password, 10);

    const roles = {
      user: "USER",
      "user/admin": "USER_ADMIN",
    };

    const user = await prisma.user.create({
      data: {
        email,
        role: roles[role],
        password: hashedPassword,
      },
    });

    return { email: user.email, password };
  }
}

const registerUserUseCase = new RegisterUserUseCase();

module.exports = { registerUserUseCase };
