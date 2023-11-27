const { MongoClient, ServerApiVersion } = require('mongodb');
async function retrieveSavedLocation(userID) {
    // Connection URI and database name
    const dbName = 'UserLocations';
    const collectionName = 'SavedLocations';
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
      
        // Define the query to find documents by userID
        const query = { userID: userID };

        // Use the `find` method to retrieve documents that match the query
        const documents = await collection.find(query, { projection: { addressName: 1, address: 1 } }).toArray();

        return documents;
        
      } catch (error) {
        console.error('Error reteiveing saved address from to the collection:', error);
        throw error; // Rethrow the error to be caught by the calling function
      } finally {
        // Close the client when done
        await client.close();
      }
  }
  
  module.exports = retrieveSavedLocation;