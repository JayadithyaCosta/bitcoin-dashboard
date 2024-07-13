const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3001;

mongoose.connect('mongodb://localhost:27017/bitcoin', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());

app.get('/api/historical', async (req, res) => {
    try {
        const prices = await Price.find().sort({ time: 1 });
        res.json(prices);
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

app.get('/api/update', async (req, res) => {
    try {
        const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
        const data = response.data;
        const price = new Price({
            usd: data.bpi.USD.rate_float,
            gbp: data.bpi.GBP.rate_float,
            eur: data.bpi.EUR.rate_float
        });
        await price.save();
        res.send('Data updated');
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
