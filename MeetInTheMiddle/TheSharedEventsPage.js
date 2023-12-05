
import {Pressable, Image, TouchableOpacity, View, Text, TextInput, Modal, StyleSheet  } from 'react-native';
import { styles } from "./Styles/styles.js";
import React, { useState, useEffect } from 'react';


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
      setEvents(result.events);
    } else {
      console.error('Failed to retrieve shared events:', result.error);
    }
  } catch (error) {
    console.error('Error retrieving shared events:', error);
  } finally {
    setLoading(false);
  }
};

const SharedEventsPage = ({route, navigation }) => {

return (

    <View style={styles.w}>
      <Text style = {styles.h2}>Shared Events</Text>




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