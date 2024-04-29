const {
  UnprocessableEntityError,
} = require("../../../errors/http/unprocessableEntityError");
const { authenticateUserSchema } = require("../schemas");
const { authenticateUserUseCase } = require("./useCase");

class AuthenticateUserController {
  async handle(req, res) {
    const data = req.body;

    const { error } = authenticateUserSchema.validate(data);
    if (error) throw new UnprocessableEntityError("Invalid data");

    const jwtToken = await authenticateUserUseCase.execute(data);
    res.status(200).send({ token: jwtToken });
  }
}

const authenticateUserController = new AuthenticateUserController();

module.exports = { authenticateUserController };
