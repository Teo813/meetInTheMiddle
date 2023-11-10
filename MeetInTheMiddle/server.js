require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const addToCollection = require('./userAddEventsFunction');  
const retrieveDocumentsByUserID = require('./userRetrieveEventsFunction.js');
const app = express();
const PORT = 3000;  // You can choose any port
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
app.use(cors()); 
app.get('/getNearbyPlaces', async (req, res) => {
    const { lat, lng, radius, types } = req.query;
    const endpoint = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${types}&key=${GOOGLE_API_KEY}`;

    try {
        const response = await axios.get(endpoint);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data from Google Places API" });
    }
});

app.use(bodyParser.json());

// Route for adding an event
app.post('/addEvent', async (req, res) => {
    const { userID, eventName, address1, address2, meetingPoint } = req.body;

    try {
        const insertedId = await addToCollection(userID, eventName, address1, address2, meetingPoint);
        res.json({ success: true, insertedId });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to add event to the database.' });
    }
});

//* Route for retrieving events by userID
app.post('/retrieveEvent', async (req, res) => {
    const { userID } = req.body;

    try {
        const retrievedEvents = await retrieveDocumentsByUserID(userID);
        res.json({ success: true, events: retrievedEvents });
    } catch (error) {
        console.error('Error retrieving events:', error);
        res.status(500).json({ success: false, error: 'Failed to retrieve events from the database.' });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
