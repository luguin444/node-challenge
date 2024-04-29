const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/stocks", async function (req, res) {
  try {
    const stockSymbol = req.query.q;

    const response = await axios.get(
      `${process.env.STOCK_API_URL}?s=${stockSymbol}&f=sd2t2ohlcvn&h&e=csv`
    );

    const data = response.data.split("\n")[1];
    const [symbol, _date, _time, open, high, low, close, _volume, name] =
      data.split(",");

    if (open === "N/D") return null;

    res.status(200).send({
      name: name.replace("\r", ""),
      symbol,
      open: parseFloat(open),
      high: parseFloat(high),
      low: parseFloat(low),
      close: parseFloat(close),
    });
  } catch (_e) {
    res.status(404).send(null);
  }
});

module.exports = router;
