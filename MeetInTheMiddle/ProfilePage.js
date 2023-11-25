import React, { useState } from 'react';
import {TouchableOpacity, View, Text, TextInput, Button, Modal, StyleSheet  } from 'react-native';
import styles from './RegistrationScreen'

const ProfilePage = ({route, navigation }) => {
    const [addressName, setAddressName] = useState('');
    const [address, setAddress] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
  
    
    const openModal = () => {
        setModalVisible(true);
      };
      const closeModal = () => {
        setModalVisible(false);
      };

return (
    
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

           <Button title="Create Saved Address" color="#FF0000" onPress={openModal} />
           <Button title="Delete all Saved Events" color="#FF0000" onPress={() => {
            const { userID } = route.params;
            console.log('test one' , userID);
            deleteSaved(userID);
             }} />
           <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <Text>Enter Address Details</Text>
            <TextInput 
              style={styles.input}
              value={addressName}
              onChangeText={setAddressName}
              placeholder="Address Name"
            />
            <TextInput 
              style={styles.input}
              value={address}
              onChangeText={setAddress}
              placeholder="Enter your address"
            />
            <Button color="#FF0000" title="Save Address"   onPress={() => {
            const { userID } = route.params;
            addSavedLocation(userID, addressName, address);
            closeModal();
             }} />
            <Button color="#FF0000" title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>
      </View>
)
}
const modalStyles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
  });

  async function addSavedLocation(userID, addressName, address) {
    //const SERVER_URL = 'http://18.116.60.22:3000/saveLocation';  // Replace 'your_server_ip' with the actual IP of your server  
      const SERVER_URL = 'http://localhost:3000/saveLocation';  // Replace 'your_server_ip' with the actual IP of your server
      const locationDetails = {
          userID,
          addressName,
          address,
      };
    
      try {
          const response = await fetch(SERVER_URL, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(locationDetails)
          });
    
          const result = await response.json();
          if (result.success) {
              console.log(`Location added with ID: ${result.insertedId}`);
          } else {
              console.error('Failed to save location:', result.error);
          }
      } catch (error) {
          console.error('Error saving event: ', error);
      }
    }
    async function deleteSaved(userID) {
      const SERVER_URL = 'http://localhost:3000/delALLEvents';
      console.log('test two', userID);
      const userDetails = { userID };
  
      try {
          const response = await fetch(SERVER_URL, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(userDetails),
          });
  
          console.log('test three', userID);
  
          if (response.ok) {
              const result = await response.json();
              console.log('Result from the server:', result);
  
              if (result.success) {
                  console.log(`All events deleted successfully. Deleted count: ${result.deletedCount.deletedCount}`);
              } else {
                  console.error('Failed to delete all events:', result.error);
              }
          } else {
              console.error('Server returned an error:', response.status, response.statusText);
          }
      } catch (error) {
          console.error('Error deleting all events:', error);
      }
  }
  
  
  
  

    
    
  
export default ProfilePage;
