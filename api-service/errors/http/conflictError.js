const { HttpError } = require("./httpError");

class ConflictError extends HttpError {
  constructor(message) {
    super(409, message, "ConflictError");
    this.message = message;
    this.name = "ConflictError";
    this.status = 409;
  }
}

module.exports = { ConflictError };
