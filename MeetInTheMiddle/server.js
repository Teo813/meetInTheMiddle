require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const addToCollection = require('./userAddEventsFunction');  
const retrieveDocumentsByUserID = require('./userRetrieveEventsFunction.js');
const handleCreateAccount = require('./registerAddEvent');
const userValidation= require('./userValidation');
const checkEmail = require('./checkEmail');
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

app.post('/addUser', async (req, res) => {
    const {email, password } = req.body;

    try{
        const insertedId = await handleCreateAccount(email, password);
        res.json({ success: true, insertedId});
    } catch (error) {
        res.status(500).json({ success: false, error: 'adding user didnt work. >:('});
    }
});

app.post('/checkEmail', async (req, res) => {
    const {email} = req.body;

    try{
        console.log("Shaggy was here <3");
        const insertedId = await checkEmail(email);
        
        res.json({ emailExists: insertedId});
    } catch (error) {
        res.status(500).json({ success: false, error: 'checking email didnt work 2. >:('});
    }
});

app.post('/validateUser', async (req, res) => {
    const {email, password} = req.body;
    console.log("Starting server try catch");
    try{ 
        console.log("Calling userValidation");
        const insertedId = await userValidation(email, password);
        console.log("InsertedID set");
        res.json({ success: insertedId.success, insertedId});
    } catch (error){
        res.status(500).json({ success: false, error: 'validating user didnt work :(('});
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
