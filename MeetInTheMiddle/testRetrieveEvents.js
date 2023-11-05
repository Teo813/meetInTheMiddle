const retrieveDocumentsByUserID = require('./userRetrieveEventsFunction.js'); //need this line at the top of your file

const userIDToRetrieve = 'user123'; // Replace with the desired userID, can be a variable
retrieveDocumentsByUserID(userIDToRetrieve)
  .then(documents => {
    console.log('Documents retrieved:');
    console.log(documents);
  })
  .catch(error => {
    console.error('Error retrieving documents:', error);
  });