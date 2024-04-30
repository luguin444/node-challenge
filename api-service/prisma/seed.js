const { prisma } = require("../libs/prisma");
const { sessionFactory } = require("../test/factories/session");
const { userFactory } = require("../test/factories/user");
const jwt = require("jsonwebtoken");

async function seed() {
  await prisma.session.deleteMany({ where: {} });
  await prisma.user.deleteMany({ where: {} });

  const user = await userFactory({
    email: "jobsity@gmail.com",
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
  console.log(
    "=================================================================="
  );
}

seed();
