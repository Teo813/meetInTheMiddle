const { MongoClient, ServerApiVersion } = require('mongodb');

async function delALLSavedEvents(userID) {
    // Connection URI and database name
    const dbName = 'UserEvents';
    const collectionName = 'SavedEvents';
    const uri = "mongodb+srv://eventsManager:n4Fdeiwx7HDooFkn@events.kj7t0rr.mongodb.net/?retryWrites=true&w=majority";
  
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
  
    try {
        // Connect to the MongoDB server
        await client.connect();
  
        // Access the database and collection
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
  
        const filter = { userID: userID };
      
        // Delete all documents that match the filter
        const result = await collection.deleteMany(filter);

        return { success: true, deletedCount: result.deletedCount }; // Return an object with success and deletedCount properties
    } catch (error) {
        console.log('ERROR', error);
        return { success: false, error: 'Failed to delete events from the database' };
    } finally {
        // Close the client when done
        await client.close();
    }
}

module.exports = delALLSavedEvents;
