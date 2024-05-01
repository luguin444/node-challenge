const { getTop5UseCase } = require("./useCase");

class GetTop5Controller {
  async handle(_req, res) {
    const stocks = await getTop5UseCase.execute();
    res.status(200).send(stocks);
  }
}

const getTop5Controller = new GetTop5Controller();

module.exports = { getTop5Controller };
