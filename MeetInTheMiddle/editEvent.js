const { MongoClient, ServerApiVersion } = require('mongodb');

async function editEvent(eventId, userID, eventName, address1, address2, meetingPoint) {
    const dbName = 'UserEvents';
    const collectionName = 'SavedEvents';
    const uri = "mongodb+srv://eventsManager:n4Fdeiwx7HDooFkn@events.kj7t0rr.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
  
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
    
        // Define the filter for the update
        const filter = { _id: eventId, userID: userID };
    
        // Define the update
        const update = {
          $set: {
            eventName: eventName,
            address1: address1,
            address2: address2,
            meetingPoint: meetingPoint
          }
        };
    
        // Perform the update operation
        const result = await collection.updateOne(filter, update);
    
        return result.modifiedCount; // Return the count of modified documents
      } finally {
        await client.close();
      }
    }
  
  module.exports = editEvent;
  
