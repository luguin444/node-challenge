const { HttpError } = require("./httError");

class ConclictError extends HttpError {
  constructor(message) {
    super(409, message, "ConclictError");
    this.message = message;
    this.name = "ConclictError";
    this.status = 409;
  }
}

module.exports = { ConclictError };
