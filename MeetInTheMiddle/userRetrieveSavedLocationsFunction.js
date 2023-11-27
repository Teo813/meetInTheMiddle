const { MongoClient, ServerApiVersion } = require('mongodb');

async function retrieveSavedLocation(userID) {
  const dbName = 'UserLocations';
  const collectionName = 'SavedLocations';
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

    const query = { userID: userID };
    const documents = await collection.find(query).toArray();

    // Map documents to the desired format (e.g., extract addressName)
    const formattedLocations = documents.map(document => ({
      addressName: document.addressName,
    }));

    return formattedLocations;
  } catch (error) {
    console.error('Error retrieving saved address from the collection:', error);
    throw error;
  } finally {
    await client.close();
  }
}

module.exports = retrieveSavedLocation;
