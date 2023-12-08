import React,{ useState, Component } from 'react';
import {View, Text, TextInput, Button, Image,Pressable} from 'react-native';
import { styles } from "./Styles/styles.js";

async function validateUser(email, password,{ navigation }) {
  console.log("validateUser Function called!");
  const SERVER_URL = 'http://18.116.60.22:3000/validateUser';  // Replace 'your_server_ip' with the actual IP of your server  
//const SERVER_URL = 'http://localhost:3000/validateUser';  // Replace 'your_server_ip' with the actual IP of your server
  const loginInfo = {
    email,
    password
  };
  try{
    const response = await fetch(SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginInfo)
    });

    const result = await response.json();
    console.log(result);
    console.log(result.insertedId);
    if (result.insertedId.success){
      console.log('User logged in.');
      console.log(result.insertedId.userId);
      console.log(email);
      navigation.navigate('DashboardScreen', {userID: result.insertedId.userId, email: email});

        console.log("It worked!!!! Yippe!");
  } else{
  alert("LoginScreen: Email or Password is incorrect.")
}
} catch (error) {
    console.error("Error logging in: ", error)
    return false;
  }
}

const staticImage = require("./assets/icon.png");
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.w2}>
      <View style={styles.p}><Image source={require("./assets/icon-black.png")} style={styles.loginIcon}></Image></View>
      <View style = {styles.break}></View>
      <View style={styles.p}>
      <Text style = {styles.h1}>Email</Text>
      <TextInput style = {styles.ti1}
        value = {email}
        onChangeText={setEmail}
        placeholder="Enter your email"
      />
      </View>
      
      <View style = {styles.p}>
      <Text style = {styles.h1}>Password</Text>
      <TextInput 
        style = {styles.ti1}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
      />
      </View>

      <View style = {styles.break}/>
      <View style = {styles.p}>
      <Pressable style = {styles.pBlue}
        onPress={() => {
          validateUser(email, password,{ navigation });
        }}><Text style = {styles.tiP}>Login</Text></Pressable>
      </View>
      <View style = {styles.p}>
      <Pressable style = {styles.pRed}
        onPress={() => {
          navigation.navigate('RegistrationScreen');
        }}><Text style = {styles.tiP2}>Register</Text></Pressable>
           </View>
    </View>
  );
};

export default LoginScreen;
