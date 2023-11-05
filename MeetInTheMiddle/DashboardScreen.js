import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
const DashboardScreen = ({navigation}) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to the Dashboard!</Text>
      <Button 
        title="New Event"
        color="#FF0000"
        onPress={() => {
          navigation.navigate('NewEventScreen')
        }}
      />

    </View>
  );
};

export default DashboardScreen;
