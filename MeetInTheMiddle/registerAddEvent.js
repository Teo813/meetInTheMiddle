const { MongoClient, ServerApiVersion } = require('mongodb');

async function handleCreateAccount(email, password) {
    // Connection URI and database name
    const dbName = 'UserLogin';
    const collectionName = 'userLogins';
    const uri = "mongodb+srv://eventsManager:n4Fdeiwx7HDooFkn@events.kj7t0rr.mongodb.net/?retryWrites=true&w=majority";
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    // TODO: Add logic to handle account creation with SQLite database
   
    const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
   
    try{

        //connect to MongoDB server
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const document = {
            email: email,
            password: password 
          };
        // Check if email already exists in the database
        const existingUser = await collection.findOne({ email: email });
        if (existingUser) {
            console.log("Ruh-roh! Email already exists :(( ");
        } else {
            // Generate a user ID (you can use a package like uuid for generating unique IDs)
            const userId = require('uuid').v4(); // Ensure you have 'uuid' package installed
            document.userId = userId; // Add generated user ID to the document

            // Insert the document into the collection
            const result = await collection.insertOne(document);
            return result.insertedId; // This returns the inserted document's unique ID
        }
    } finally {
        await client.close();
    }
}

module.exports = handleCreateAccount;