import React, { useState } from 'react';
import {Pressable, Image, TouchableOpacity, View, Text, TextInput, Modal, StyleSheet  } from 'react-native';
import { styles } from "./Styles/styles.js";


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