const addToCollection = require('./userAddEventsFunction.js'); //need this line at the top of your file

// Test the addToCollection function
const userID = 'user123';
const eventName = 'tmmrw';
const address1 = 'st';
const address2 = 'Apt 222';
const meetingPoint = 'Central texas';

addToCollection(userID, eventName, address1, address2, meetingPoint)
  .then(insertedId => {
    console.log(`Document inserted with _id: ${insertedId}`);
  })
  .catch(error => {
    console.error('Error inserting document:', error);
  });