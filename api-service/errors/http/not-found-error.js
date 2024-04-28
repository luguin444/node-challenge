const { HttpError } = require("./http-error");

class NotFoundError extends HttpError {
  constructor(message) {
    super(404, message, "NotFoundError");
    this.message = message;
    this.name = "NotFoundError";
    this.status = 404;
  }
}

module.exports = { NotFoundError };
