const express = require("express");
const router = express.Router();
const PriceSchema = require("../models/price");
const updateRoutes = require("./update");

router.get("/", async (req, res) => {
  try {
    const prices = await PriceSchema.find();
    if (prices.length > 0) {
      const lastPriceEntry = prices[prices.length - 1];
      if (Date(lastPriceEntry.time) < Date.now()) {
        updateRoutes();
      }
      res.json(prices);
    }
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});

module.exports = router;
