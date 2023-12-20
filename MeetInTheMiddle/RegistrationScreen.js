import React, { useState } from 'react';
import { Image, View, Text, TextInput, Button, StyleSheet, Pressable } from 'react-native';

import { styles } from './Styles/styles.js';
//import { initDB, insertUser, emailExists } from './userDatabase';
//const { MongoClient, ServerApiVersion } = require('mongodb');
async function checkEmails(email) {
  const SERVER_URL = 'http://18.116.60.22:3000/checkEmail';  // Replace 'your_server_ip' with the actual IP of your server  
    // const SERVER_URL = 'http://localhost:3000/checkEmail';  // Replace 'your_server_ip' with the actual IP of your server
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
  const SERVER_URL = 'http://18.116.60.22:3000/addUser';  // Replace 'your_server_ip' with the actual IP of your server
//const SERVER_URL = 'http://localhost:3000/addUser'; // Replace with your server URL

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
    <View style={styles.w2}>
      <View style={styles.p}><Image source={require("./assets/icon-black.png")} style={styles.loginIcon}></Image></View>
      <View style = {styles.break}/>
      <View  style = {styles.p}>
      <Text style = {styles.h1}>Email</Text>
      <TextInput 
        style = {styles.ti1}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
      />
      </View>
      <View  style = {styles.p}>
      <Text style = {styles.h1}>Password</Text>
      <TextInput 
        style = {styles.ti1}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
      />
      </View>
      <View style={styles.p}>
      <Text style = {styles.h1}>Confirm Password</Text>
      <TextInput 
        style = {styles.ti1}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm your password"
        secureTextEntry
      />
      </View>
      <View style = {styles.break}></View>
      <View  style = {styles.p}>
      <Pressable  style = {styles.pBlue} 
        title="Create Account"
        onPress={() => {addUserToDatabase(email, password, confirmPassword)
          alert("Your account has been created! Jeepers")
          navigation.navigate('LoginScreen')
        }}
        color="#43CFEF"
        > 
        <Text style = {styles.tiP}>Create Account</Text>
        </Pressable>
        </View>
        <View style = {styles.p}>
        <Pressable style = {styles.pRed}
        onPress={() => {
          navigation.navigate('LoginScreen');
        }}><Text style = {styles.tiP2}>Login Here</Text>
        </Pressable>
      </View>
    </View>
  );
};


export default RegistrationScreen;
