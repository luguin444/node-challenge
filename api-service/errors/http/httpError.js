class HttpError extends Error {
  constructor(status, message, name) {
    super(message);
    this.status = status;
    this.message = message;
    this.name = name;
  }
}

module.exports = { HttpError };
