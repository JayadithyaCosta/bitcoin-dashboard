const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
    time: {
        type: Date,
        required: true,
        default: Date.now
    },
    usd: {
        type: Number,
        required: true
    },
    gbp: {
        type: Number,
        required: true
    },
    eur: {
        type: Number,
        required: true
    }
});

const Price = mongoose.model('Price', priceSchema);

module.exports = Price;
