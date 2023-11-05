const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;  // You can choose any port

app.use(cors()); 

app.get('/getNearbyPlaces', async (req, res) => {
    const { lat, lng, radius, types } = req.query;
    const API_KEY = 'AIzaSyBaPcbrFg7clbcDU8LLnmzZd3vBU89S0CM';
    const endpoint = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${types}&key=${API_KEY}`;

    try {
        const response = await axios.get(endpoint);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data from Google Places API" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
