const retrieveSavedLocation = require('./userRetrieveSavedLocationsFunction.js'); //need this line at the top of your file

const userIDToRetrieve = '1f064593-86f2-4d39-b056-b92d9c3660e6'; // Replace with the desired userID, can be a variable
retrieveSavedLocation(userIDToRetrieve)
  .then(documents => {
    console.log('Documents retrieved:');
    console.log(documents);
  })
  .catch(error => {
    console.error('Error retrieving documents:', error);
  });