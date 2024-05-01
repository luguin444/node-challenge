const { prisma } = require("../libs/prisma");
const { sessionFactory } = require("../test/factories/session");
const { userFactory } = require("../test/factories/user");
const jwt = require("jsonwebtoken");

async function seed() {
  const random = Math.random().toString(36).substring(7);
  const user = await userFactory({
    email: `jobsity${random}@gmail.com`,
    password: "123",
    role: "USER_ADMIN",
  });

  const session = await sessionFactory({
    userId: user.id,
  });

  const jwtToken = jwt.sign(
    { userId: user.id, sessionId: session.id },
    process.env.JWT_SECRET
  );

  console.log(
    "=================================================================="
  );
  console.log("JWT: ", jwtToken);
  console.log("email: ", user.email);
  console.log("password: ", "123");
  console.log(
    "=================================================================="
  );
}

seed();
