class HttpError extends Error {
  status;

  constructor(status, message, name) {
    super(message);
    this.status = status;
    this.message = message;
    this.name = name;
  }
}

module.exports = { HttpError };
