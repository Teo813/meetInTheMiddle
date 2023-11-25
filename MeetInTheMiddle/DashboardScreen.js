
import { styles } from './Styles/styles';
import React, { useState, useEffect, Platform } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, Linking  } from 'react-native';
const DashboardScreen = ({route, navigation }) => {
  
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const retrieveEventsFunction = async (userID) => {
    const SERVER_URL = 'http://18.116.60.22:3000/retrieveEvent';

    try {
      const response = await fetch(SERVER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID }),
      });

      const result = await response.json();
      if (result.success) {
        setEvents(result.events);
      } else {
        console.error('Failed to retrieve events:', result.error);
      }
    } catch (error) {
      console.error('Error retrieving events:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshEvents = () => {
    setLoading(true); // Set loading to true before fetching data
    const { userID } = route.params
    retrieveEventsFunction(userID);
    setLoading(false);
  };

  useEffect(() => {
    // Call the retrieval function when the component mounts.
    // For example, retrieve events for 'user123'.
    const { userID } = route.params
    retrieveEventsFunction(userID);
  }, []);

  return (
    <View style = {styles.dashView}>
      
      <View style={styles.dashWelcomeView }>
        <Text style={ styles.dashWelcomeText}>Welcome to your dashboard!</Text>
      </View>
      <View >
      <Button 
        title="Create New Event!"
        color="#43CFEF"
        onPress={() => {
          const { userID } = route.params;
          navigation.navigate('NewEventScreen', {userID: userID});
        }}
      />
      </View>
      <View >
      <Button 
        title="My Profile"
        color="#FF0000"
        onPress={() => {
          const { userID } = route.params;
          navigation.navigate('ProfilePage', {userID: userID});
        }}
      />
      {loading ? (
        <Text>Loading events...</Text>
      ) : events.length > 0 ? (
        <FlatList
          data={events}
          keyExtractor={(item) => item._id.toString()} 
          renderItem={({ item }) => (
            <View style={styles.dashContainer}>
              <Text style={styles.dashContainerText}>Event Name: {item.eventName}</Text>
              <Text style={styles.dashContainerText}>Address 1: {item.address1}</Text>
              <Text style={styles.dashContainerText}>Address 2: {item.address2}</Text>
              <Text style={styles.dashContainerText}>Meeting Point: {item.meetingPoint}</Text>
            </View>
          )}
        />
      ) : (
        <Text>No saved events found.</Text>
        )}
    </View>
    <View>
      <Button 
        title="Refresh"
        color="#0088CB"
        onPress={refreshEvents}
      />
    </View>


    </View>
  );
};

const openMaps = (address) => {
  const formattedAddress = encodeURIComponent(address);
  const mapsUrl = Platform.select({
    ios: `maps://app?daddr=${formattedAddress}`,
    android: `google.navigation:q=${formattedAddress}`,
  });

  Linking.openURL(mapsUrl);
};

export default DashboardScreen;
