import React,{ useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

async function validateUser(email, password,{ navigation }) {
  console.log("validateUser Function called!");
  //const SERVER_URL = 'http://18.116.60.22:3000/checkEmail';  // Replace 'your_server_ip' with the actual IP of your server  
  const SERVER_URL = 'http://localhost:3000/validateUser';  // Replace 'your_server_ip' with the actual IP of your server
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

    if (result.insertedId.success){
      console.log('User logged in.');
      console.log(result.insertedId.userId);
      navigation.navigate('DashboardScreen', {userID: result.insertedId.userId});

        console.log("It worked!!!! Yippe!");
  } else{
  alert("Email or Password is incorrect.")
}
} catch (error) {
    console.error("Error logging in: ", error)
    return false;
  }
}


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 20 }}>

      <Text>Email</Text>
      <TextInput 
        style={{ 
          height: 40, 
          borderColor: 'gray', 
          borderWidth: 1, 
          borderRadius: 5,
          marginBottom: 10,
          paddingLeft: 10
          
        }}
        value = {email}
        onChangeText={setEmail}
        placeholder="Enter your email"
      />
      
      <Text>Password</Text>
      <TextInput 
        style={{ 
          height: 40, 
          borderColor: 'gray', 
          borderWidth: 1, 
          borderRadius: 5,
          marginBottom: 20,
          paddingLeft: 10
        }}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
      />
      
      <Button 
        title="Login"
        color="#FF0000"
        onPress={() => {
          validateUser(email, password,{ navigation });
        }}
      />

      <Button 
        title="Register"
        color="#8B0000"
        onPress={() => {
          navigation.navigate('RegistrationScreen');
        }}
           />
    </View>
  );
};

export default LoginScreen;
