const { faker } = require("../../libs/faker");
const { hash } = require("bcrypt");
const { prisma } = require("../../libs/prisma");

async function userFactory(data = {}) {
  const dataToBeCreated = {
    email: data.email || faker.email(),
    role: data.role || "USER",
    password: data.password
      ? await hash(data.password, 10)
      : await hash("123456", 10),
  };

  const user = await prisma.user.create({ data: dataToBeCreated });

  return user;
}

module.exports = { userFactory };
