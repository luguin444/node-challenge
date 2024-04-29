require("../config/env");
const { prisma } = require("../libs/prisma");

async function cleanPrismaDB() {
  await prisma.query.deleteMany({ where: {} });
  await prisma.session.deleteMany({ where: {} });
  await prisma.user.deleteMany({ where: {} });
}

beforeEach(cleanPrismaDB);
