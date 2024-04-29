const { HttpError } = require("./httpError");

class AuthenticationError extends HttpError {
  constructor(message) {
    super(401, message, "AuthenticationError");
    this.message = message;
    this.name = "AuthenticationError";
    this.status = 401;
  }
}

module.exports = { AuthenticationError };
