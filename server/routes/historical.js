const express = require("express");
const router = express.Router();
const PriceSchema = require("../models/price");

router.get("/", async (req, res) => {
  try {
    const prices = await PriceSchema.find().sort({ time: 1 });
    res.json(prices);
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});

module.exports = router;
