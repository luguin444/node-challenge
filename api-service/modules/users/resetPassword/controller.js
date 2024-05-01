const { resetPasswordUseCase } = require("./useCase");

class ResetPasswordController {
  async handle(req, res) {
    const userId = req.userId;

    const success = await resetPasswordUseCase.execute(userId);
    res.status(200).send({ success });
  }
}

const resetPasswordController = new ResetPasswordController();

module.exports = { resetPasswordController };
