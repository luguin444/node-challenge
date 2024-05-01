const { prisma } = require("../libs/prisma");
const { AuthenticationError } = require("../errors/http/authenticationError");
const jwt = require("jsonwebtoken");

async function verifyJWT(req, _res, next) {
  const token = req.headers["x-access-token"];
  if (!token) throw new AuthenticationError("JWT token is compulsory");

  const decodedData = await jwt.verify(token, process.env.JWT_SECRET);

  const session = await prisma.session.findFirst({
    where: { id: decodedData.sessionId, userId: decodedData.userId },
  });

  if (!session) throw new AuthenticationError("JWT token is invalid");

  req.userId = decodedData.userId;
  next();
}

module.exports = { verifyJWT };
