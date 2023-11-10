import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
//import { initDB, insertUser, emailExists } from './userDatabase';
import styles from './styles'


const RegistrationScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleCreateAccount = () => {
    // TODO: Add logic to handle account creation with SQLite database
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // If passwords match, proceed to save the user in the SQLite database
    // For now, just a placeholder
    console.log('Account created for:', email);
  };

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
        onPress={handleCreateAccount}
        color="#FF0000"
      />
    </View>
  );
};

export default RegistrationScreen;
