const { registerUserUseCase } = require("./useCase");

class RegisterUserController {
  async handle(req, res) {
    const data = req.body;

    const user = await registerUserUseCase.execute(data);
    res.status(201).send(user);
  }
}

const registerUserController = new RegisterUserController();

module.exports = { registerUserController };
