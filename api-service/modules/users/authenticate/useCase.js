const { prisma } = require("../../../libs/prisma");
const {
  AuthenticationError,
} = require("../../../errors/http/authentication-error");
const { compare } = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthenticateUserUseCase {
  async execute(data) {
    const { email, password } = data;

    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) throw new AuthenticationError("Credentials is not valid");

    const isPasswordValid = await compare(data.password, user.password);

    if (!isPasswordValid)
      throw new AuthenticationError("Credentials is not valid");

    const session = await prisma.session.create({
      data: {
        userId: user.id,
      },
    });

    const jwtToken = jwt.sign(
      { userId: user.id, sessionId: session.id },
      process.env.JWT_SECRET,
      {
        expiresIn: 60 * 60 * 24 * 30, // 30 dias em segundos
      }
    );

    return jwtToken;
  }
}

const authenticateUserUseCase = new AuthenticateUserUseCase();

module.exports = { authenticateUserUseCase };
