const express = require("express");
const router = express.Router();
const axios = require("axios");
const PriceSchema = require("../models/price");

router.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.coindesk.com/v1/bpi/currentprice.json"
    );
    const data = response.data;
    const price = new PriceSchema({
      usd: data.bpi.USD.rate_float,
      gbp: data.bpi.GBP.rate_float,
      eur: data.bpi.EUR.rate_float,
    });
    await price.save();
    return res.send({
      status: true,
      message: "Data Updated",
    });
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});

module.exports = router;
