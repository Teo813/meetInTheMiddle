const { MongoClient, ServerApiVersion } = require('mongodb');

async function retrieveSharedEventsByEmail(email) {
  // Connection URI and database name
  const dbName = 'UserEvents';
  const sharedEventsCollectionName = 'SharedEvents';
  const savedEventsCollectionName = 'SavedEvents';
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

    // Access the database and collections
    const db = client.db(dbName);
    const sharedEventsCollection = db.collection(sharedEventsCollectionName);

    // Define the query to find documents in SharedEvents by email
    const sharedEventsQuery = {emailOfUserToShareEventTo: email };

  // Use the `aggregate` method with $lookup to cross-reference with SavedEvents collection
  const documents = await sharedEventsCollection.aggregate([
    { $match: sharedEventsQuery },
    {
      $lookup: {
        from: savedEventsCollectionName,
        localField: 'idOfSharedEvent',
        foreignField: '_id',
        as: 'savedEvents'
      }
    },
    {
      $unwind: '$savedEvents'
    },
    {
      $replaceRoot: { newRoot: '$savedEvents' }
    }
  ]).toArray();

  return documents;
    
  } finally {
    // Close the client when done
    await client.close();
  }
}

module.exports = retrieveSharedEventsByEmail;
