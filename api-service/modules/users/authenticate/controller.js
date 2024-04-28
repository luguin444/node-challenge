const { authenticateUserUseCase } = require("./useCase");

class AuthenticateUserController {
  async handle(req, res) {
    const data = req.body;

    const jwtToken = await authenticateUserUseCase.execute(data);
    res.status(200).send({ token: jwtToken });
  }
}

const authenticateUserController = new AuthenticateUserController();

module.exports = { authenticateUserController };
