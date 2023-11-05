import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const NewEventScreen = ({ navigation }) => {
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  const findMeetingLocations = () => {

    console.log('Midpoints found!');
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>First Address</Text>
      <TextInput 
        style={{ 
          height: 40, 
          borderColor: 'gray', 
          borderWidth: 1, 
          borderRadius: 5,
          marginBottom: 10,
          paddingLeft: 10
          
        }}
        placeholder="Enter your First Address"
        value={address1}
        onChangeText={text => setAddress1(text)}
      />
      
      <Text>Second Address</Text>
      <TextInput 
        style={{ 
          height: 40, 
          borderColor: 'gray', 
          borderWidth: 1, 
          borderRadius: 5,
          marginBottom: 20,
          paddingLeft: 10
        }}
        placeholder="Enter your Second Address"
        value={address2}
        onChangeText={text => setAddress2(text)}
      />
      <Button 
        title="Meet in the Middle!"
        color="#FF0000"
        onPress={findMeetingLocations}
      />
    </View>
  );
};

export default NewEventScreen;
