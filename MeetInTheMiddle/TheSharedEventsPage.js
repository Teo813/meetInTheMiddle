
import {Button, Pressable, Image, TouchableOpacity, View, Text, TextInput, Modal, StyleSheet, FlatList  } from 'react-native';
import { styles } from "./Styles/styles.js";
import React, { useState, useEffect } from 'react';
const SharedEventsPage = ({route, navigation }) => {
const [sharedEvents, setSharedEvents] = useState([]);
const [loading, setLoading] = useState(true);

const retrieveSharedEventsFunction = async (email) => {
  const SERVER_URL = 'http://localhost:3000/retrieveSharedEvent';
 
  try {
    const response = await fetch(SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();
    if (result.success) {
      console.log(result.sharedEvents)
      setSharedEvents(result.sharedEvents);
    } else {
      console.error('Failed to retrieve shared events:', result.error);
    }
  } catch (error) {
    console.error('Error retrieving shared events:', error);
  } finally {
    setLoading(false);
  }
};

const refreshEvents = () => {
  setLoading(true); // Set loading to true before fetching data
  const { email } = route.params
  console.log(email)
  retrieveSharedEventsFunction(email);
  setLoading(false);
};
useEffect(() => {
  // Call the retrieval function when the component mounts.
  // For example, retrieve events for 'user123'.
  const { email } = route.params
  retrieveSharedEventsFunction(email);
}, []);


return (

    <View style={styles.w}>
      <Text style = {styles.h2}>Shared Events</Text>
      <View style={styles.p2}>
      <Button 
        title="Refresh"
        color="#0088FE"
        onPress={refreshEvents}
      />
      {loading ? (
  <Text>Loading events...</Text>
) : sharedEvents && sharedEvents.length > 0 ? (
  <FlatList
      data={sharedEvents}
      keyExtractor={(item) => item._id.toString()}
      renderItem={({ item }) => (
        <View style={styles.dashContainer}>
            <View style={styles.dashLeft}>
          <Text style={styles.eventTitle}>{item.eventName}</Text>
          <Text style={styles.dashContainerText}>Address 1: {item.address1}</Text>
          <Text style={styles.dashContainerText}>Address 2: {item.address2}</Text>
          <TouchableOpacity onPress={() => openMaps(item.meetingPoint)}>
            <Text style={styles.eventh2}>Meeting at:</Text>
            <Text style={styles.dashContainerText}>{item.meetingPoint}</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.dashFloat}>
          <Pressable 
            title="Edit"
            onPress={() => editEvent(item._id)}>
            <Image source={require('./assets/editIcon.png')} alt="Edit Event" style={styles.dashIcon} />
          </Pressable>
          <Pressable
            onPress={ () => {
              openModal(item._id, item.eventName)}}>
               <Image source={require('./assets/shareIcon.png')} alt="Share Event" style={styles.dashIcon} />
            </Pressable>
          <Pressable
            onPress={() => {
              const { userID } = route.params
              deleteEvent(userID,item._id)
              
            }}>
               <Image source={require('./assets/deleteIcon.png')} alt="Delete Event" style={styles.dashIcon} />
            </Pressable>
            </View>
        </View>
          )}
        />
      ) : sharedEvents && sharedEvents.length === 0 ? (
        <Text>No saved events found.</Text>
      ) : (
        <Text>No events.</Text>
      )}
      
    </View>
        <View style={styles.nav}>
      <Pressable onPress={() => {
          const { userID } = route.params;
          navigation.navigate('DashboardScreen', {userID: userID});
        }}>
      <Image source={require('./assets/dashIcon.png')} alt="Dashboard Icon" style={styles.navIcon}/>
      </Pressable>
      <Pressable onPress={() => {
          const { userID } = route.params;
          navigation.navigate('NewEventScreen', {userID: userID});
        }}>
        <Image source={require('./assets/eventIcon.png')} alt="New Event Icon" style={styles.navIcon} />
        </Pressable>
        <Pressable onPress={() => {
          const { userID } = route.params;
          navigation.navigate('ProfilePage', {userID: userID});
        }}>
    <Image source= {require("./assets/profileIconPressed.png")} alt="Profile Icon" style={styles.navIcon}/>
    </Pressable>
    </View>
      </View>
    
)
}

   
export default SharedEventsPage;