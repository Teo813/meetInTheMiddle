import React, { useState } from 'react';
import {Pressable, Image, TouchableOpacity, View, Text, TextInput, Button, Modal, StyleSheet  } from 'react-native';
import { styles } from "./Styles/styles.js";

const ProfilePage = ({route, navigation }) => {
    const [addressName, setAddressName] = useState('');
    const [address, setAddress] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false); // New state for the modal
    
    const deleteSavedWithConfirmation = () => {
      // Show the confirmation modal
      setShowConfirmationModal(true);
    };
    const confirmDeleteSaved = () => {
      // Perform the deleteSaved operation here
      const { userID, email } = route.params;
      console.log('SavedEvents Deleted', userID);
      deleteSaved(userID);
  
      // Close the confirmation modal
      setShowConfirmationModal(false);
    };
    const cancelDeleteSaved = () => {
      // Close the confirmation modal
      setShowConfirmationModal(false);
    };
    const openModal = () => {
        setModalVisible(true);
      };
      const closeModal = () => {
        setModalVisible(false);
      };

return (
    
    <View style={styles.dashView}>
      <Text style = {styles.h2}>Profile</Text>
      <View style = {styles.break}></View>

      <View style = {styles.p}>
        <Pressable style={styles.pBlue} title="Create Saved Address" onPress={openModal}>
        <Text style = {styles.tiP}>Create Saved Address</Text>
          </Pressable>
      </View>
      <View style = {styles.p}>
      <Pressable style={styles.pBlue} onPress={deleteSavedWithConfirmation}>
          <Text style={styles.tiP}>Delete Saved Events</Text>
        </Pressable>
      </View>

      <View style = {styles.p}>
      <Pressable style={styles.pBlue}  onPress={() => {
          const { userID, email } = route.params
          console.log(email)
          navigation.navigate('SharedEventsPage', {userID, email})
        }} ><Text style = {styles.tiP}> Shared Events</Text></Pressable>
      </View>

           <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <Text style={styles.h3}>Enter Address Details</Text>
            <View style={styles.break}/>
            <Text style={styles.h4}>Name:</Text>
            <TextInput 
              style={styles.input}
              value={addressName}
              onChangeText={setAddressName}
              placeholder="Address Name"
            />
            <Text style={styles.h4}>Location:</Text>
            <TextInput 
              style={styles.input}
              value={address}
              onChangeText={setAddress}
              placeholder="Enter your address"
            />
            <View style={styles.break}/>
            <Pressable style={styles.pBlue2} onPress={() => {
            const { userID } = route.params;
            addSavedLocation(userID, addressName, address);
            closeModal();
             }}>
              <Text style={styles.tiP}>Save Address</Text>
             </Pressable>
            <Pressable style={styles.pRed} color="#FF0000" title="Close" onPress={closeModal}>
             <Text style={styles.tiP2}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      
      <View style={styles.nav}>
      <Pressable onPress={() => {
          const { userID, email } = route.params;
          navigation.navigate('DashboardScreen', {userID: userID, email: email});
        }}>
      <Image source={require('./assets/dashIcon.png')} alt="Dashboard Icon" style={styles.navIcon}/>
      </Pressable>
      <Pressable onPress={() => {
          const { userID, email } = route.params;
          navigation.navigate('NewEventScreen', {userID: userID, email: email});
        }}>
        <Image source={require('./assets/eventIcon.png')} alt="New Event Icon" style={styles.navIcon} />
        </Pressable>
        <Pressable onPress={() => {
          const { userID, email } = route.params;
          navigation.navigate('ProfilePage', {userID: userID, email: email});
        }}>
    <Image source= {require("./assets/profileIconPressed.png")} alt="Profile Icon" style={styles.navIcon}/>
    </Pressable>
    </View>
   
    {/* Confirmation Modal */}
    <Modal
        animationType="slide"
        transparent={true}
        visible={showConfirmationModal}
        onRequestClose={() => {
          // Close the modal when the back button is pressed
          setShowConfirmationModal(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, modalStyles.modalView]}>
            <Text style={styles.h1}>Are you sure you want to delete all saved events?</Text>
            <View style={styles.buttonContainer}>
              <View style={styles.in}>
              <Pressable style={[styles.confirmButton, modalStyles.confirmButton]} onPress={confirmDeleteSaved}>
                <Text style={styles.tiP2}>Yes</Text>
              </Pressable>
              <Pressable style={[styles.cancelButton, modalStyles.cancelButton]} onPress={cancelDeleteSaved}>
                <Text style={styles.tiP2}>No</Text>
              </Pressable>
            </View></View>
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
      margin: 'auto',
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
      width: '80%'
    },
  });

  async function addSavedLocation(userID, addressName, address) {
    //const SERVER_URL = 'http://18.116.60.22:3000/saveLocation';  // Replace 'your_server_ip' with the actual IP of your server  
      const SERVER_URL = 'http://18.116.60.22:3000/saveLocation';  // Replace 'your_server_ip' with the actual IP of your server
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
      const SERVER_URL = 'http://18.116.60.22:3000/delALLEvents';
    
      const userDetails = { userID };
  
      try {
          const response = await fetch(SERVER_URL, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(userDetails),
          });

  
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
