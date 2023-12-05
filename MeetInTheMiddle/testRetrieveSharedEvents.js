const retrieveDocumentsByEmail = require('./userRetrieveSharedEventFunction.js'); //need this line at the top of your file

const userIDToRetrieve = 'yadayadayada@gmail.com'; // Replace with the desired userID, can be a variable
retrieveDocumentsByEmail(userIDToRetrieve)
  .then(documents => {
    console.log('Documents retrieved:');
    console.log(documents);
  })
  .catch(error => {
    console.error('Error retrieving documents:', error);
  });