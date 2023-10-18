import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const LoginScreen = ({ navigation }) => {
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
        placeholder="Enter your password"
        secureTextEntry
      />
      
      <Button 
        title="Login"
        color="#FF0000"
        onPress={() => {
          navigation.navigate('DashboardScreen')
        }}
      />

      <Button 
        title="Register"
        color="#8B0000"
        onPress={() => navigation.navigate('RegistrationScreen')}
      />
    </View>
  );
};

export default LoginScreen;
