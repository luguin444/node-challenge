const {
  UnprocessableEntityError,
} = require("../../../errors/http/unprocessableEntityError");
const { createUserSchema } = require("../schemas");
const { registerUserUseCase } = require("./useCase");

class RegisterUserController {
  async handle(req, res) {
    const data = req.body;

    const { error } = createUserSchema.validate(data);
    if (error) throw new UnprocessableEntityError("Invalid data");

    const user = await registerUserUseCase.execute(data);
    res.status(201).send(user);
  }
}

const registerUserController = new RegisterUserController();

module.exports = { registerUserController };
