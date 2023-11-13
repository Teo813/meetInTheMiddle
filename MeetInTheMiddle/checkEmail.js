const { MongoClient, ServerApiVersion } = require('mongodb');

async function checkEmail(email) {
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
          };
        // Check if email already exists in the database
        const existingUser = await collection.findOne({ email: email });
        if (existingUser) {
            console.log("Email is in database");
            return true;
        } else {
            console.log("Email is not in database");
            return false;
        }
    } finally {
        await client.close();
    }
}

module.exports = checkEmail;