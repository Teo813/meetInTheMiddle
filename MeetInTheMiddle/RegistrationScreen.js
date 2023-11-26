import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
//import { initDB, insertUser, emailExists } from './userDatabase';
//const { MongoClient, ServerApiVersion } = require('mongodb');
async function checkEmails(email) {
  //const SERVER_URL = 'http://18.116.60.22:3000/checkEmail';  // Replace 'your_server_ip' with the actual IP of your server  
    const SERVER_URL = 'http://18.116.60.22:3000/checkEmail';  // Replace 'your_server_ip' with the actual IP of your server
    //console.log(selectedPlace); //?
    const loginDetails = {
        email
    };
      try {
        const response = await fetch(SERVER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginDetails)
        });
  
        const result = await response.json();
        return result.emailExists;
      } catch (error) {
          console.error('Error checking email:', error);
          return false;
      }
}
async function addUserToDatabase(email, password, confirmPassword) {
  //const SERVER_URL = 'http://18.116.60.22:3000/addUser';  // Replace 'your_server_ip' with the actual IP of your server
  const SERVER_URL = 'http://18.116.60.22:3000/addUser'; // Replace with your server URL

  const loginDetails = {
      email,
      password
  };

  if (password == confirmPassword) {
      // Await the result from checkEmails
      const emailExists = await checkEmails(email);
      console.log("emailExists:");
      console.log(emailExists);
      if (!emailExists) {
          try {
              const response = await fetch(SERVER_URL, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(loginDetails)
              });

              const result = await response.json();

              if (result.success) {
                  console.log(`User added with ID: ${result.insertedId}`);
              } else {
                  console.error('Failed to register user:', result.error);
              }
          } catch (error) {
              console.error('Error registering user:', error);
          }
      } else {
          alert("An account already exists with this email.");
      }
  } else {
      alert("Passwords do not match!");
  }
}



const RegistrationScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput 
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
      />

      <Text>Password</Text>
      <TextInput 
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
      />

      <Text>Confirm Password</Text>
      <TextInput 
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm your password"
        secureTextEntry
      />

      <Button 
        title="Create Account"
        onPress={() => {addUserToDatabase(email, password, confirmPassword)
          alert("Your account has been created! Jeepers")
          navigation.navigate('LoginScreen')
        }}
        color="#FF0000"
      />
    </View>
  );

  
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default RegistrationScreen;
