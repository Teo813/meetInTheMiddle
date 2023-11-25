const { MongoClient, ServerApiVersion } = require('mongodb');

async function userValidation(email, password) {
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
        // Check if email already exists in the database
        // Check if email exists
    const user = await collection.findOne({ email: email });
    if (!user) {
      return { success: false, message: "Email does not exist." };
    }

    // Verify password
    const passwordIsValid = (password == user.password);
    if (!passwordIsValid) {
      return { success: false, message: "Incorrect password." };
    }

    // Successful login
    console.log(user.userId);
    return { success: true,  userId: user.userId, message: "Login successful." };
  } catch (err) {
    console.error(err);
    return { success: false, message: "An error occurred." };
  } finally {
    await client.close();
  }
}


module.exports = userValidation;