const { MongoClient, ServerApiVersion } = require('mongodb');

async function addToCollection(userID, eventName, address1, address2, meetingPoint,nonUserSubmitted) {
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

    // Create a document with the provided data
    const document = {
      userID: userID,
      eventName: eventName, 
      address1: address1,
      address2: address2,
      meetingPoint: meetingPoint,
      nonUserSubmitted: nonUserSubmitted
    };

    // Insert the document into the collection
    const result = await collection.insertOne(document);

    return result.insertedId;
  } finally {
    // Close the client when done
    await client.close();
  }
}

module.exports = addToCollection;
