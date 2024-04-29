const jwt = require("jsonwebtoken");
const { sessionFactory } = require("../factories/session");
const { userFactory } = require("../factories/user");

const getDefaultPayload = async () => {
  const user = await userFactory();
  const session = await sessionFactory({ userId: user.id });

  return {
    userId: user.id,
    sessionId: session.id,
  };
};

const generateJwtToken = async (payload) => {
  if (payload == null) {
    payload = await getDefaultPayload();
  }

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const getHeadersObjectWithCorrectJWT = async (token = null) => {
  if (!token) token = await generateJwtToken();

  return {
    "x-access-token": token,
  };
};

module.exports = { getHeadersObjectWithCorrectJWT };
