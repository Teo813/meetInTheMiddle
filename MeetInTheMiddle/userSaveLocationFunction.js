const { MongoClient, ServerApiVersion } = require('mongodb');
async function saveAddressToCollection(userID, addressName, address) {
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
      
        // Create a document with the provided data
        const document = {
          userID: userID,
          addressName: addressName, 
          address: address,
        };
      
        // Insert the document into the collection
        const result = await collection.insertOne(document);
      
        return result.insertedId;
      } catch (error) {
        console.error('Error saving address to the collection:', error);
        throw error; // Rethrow the error to be caught by the calling function
      } finally {
        // Close the client when done
        await client.close();
      }
  }
  
  module.exports = saveAddressToCollection;