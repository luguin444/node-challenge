const { prisma } = require("../../libs/prisma");

async function sessionFactory(data = {}) {
  const dataToBeCreated = {
    userId: data.userId || (await userFactory()).id,
  };

  const session = await prisma.session.create({ data: dataToBeCreated });

  return session;
}

module.exports = { sessionFactory };
