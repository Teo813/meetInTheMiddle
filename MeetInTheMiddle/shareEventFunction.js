//sharing event to user email
//will need event id
//the event already has to be created in the database to share the event

const { MongoClient, ServerApiVersion } = require('mongodb');

async function shareEvent(userID, email, eventID) {
  // Connection URI and database name
  const dbName = 'UserEvents';
  const collectionName = 'SharedEvents';
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
        userIDwithEvent: userID,
        emailOfUserToShareEventTo: email, 
        idOfSharedEvent: eventID,
      };
  
      // Insert the document into the collection
      const result = await collection.insertOne(document);
  
      return result.insertedId;
  } finally {
    // Close the client when done
    await client.close();
  }
}

module.exports = shareEvent;