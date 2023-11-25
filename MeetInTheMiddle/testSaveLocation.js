const saveAddressToCollection = require('./userSaveLocationFunction.js'); //need this line at the top of your file

// Test the addToCollection function
const userID = 'user13';
const addressName = 'idontknow';
const address = 'st';


saveAddressToCollection(userID, addressName, address)
  .then(insertedId => {
    console.log(`Document inserted with _id: ${insertedId}`);
  })
  .catch(error => {
    console.error('Error inserting document:', error);
  });
