const { AuthenticationError } = require("../errors/http/authenticationError");
const { prisma } = require("../libs/prisma");

async function verifyAdminUser(req, _res, next) {
  const userId = req.userId;

  if (!userId) throw new AuthenticationError("UserId was not provided");

  const user = await prisma.user.findFirst({
    where: { id: userId },
  });

  if (user?.role !== "USER_ADMIN")
    throw new AuthenticationError("User is not an admin");

  next();
}

module.exports = { verifyAdminUser };
