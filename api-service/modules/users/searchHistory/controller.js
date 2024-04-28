const { getHistoryOfSearchUseCase } = require("./useCase");

class GetHistoryOfSearchController {
  async handle(req, res) {
    const userId = req.userId;

    const history = await getHistoryOfSearchUseCase.execute(userId);
    res.status(200).send(history);
  }
}

const getHistoryOfSearchController = new GetHistoryOfSearchController();

module.exports = { getHistoryOfSearchController };
