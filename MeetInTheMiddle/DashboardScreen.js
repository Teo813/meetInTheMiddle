
import { styles } from './Styles/styles';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, Linking,ScrollView, Platform  } from 'react-native';
const DashboardScreen = ({route, navigation }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const editEvent = (eventId) => {
    // Navigate to the NewEventScreen with the event ID
    const { userID } = route.params;
    navigation.navigate('NewEventScreen', {userID: userID, eventId: eventId, isEdit: true });
  };
  const deleteEvent = async (userID,eventId) => {
    const SERVER_URL = 'http://18.116.60.22:3000/delEvent';
    const userDetails = { userID,eventId };
    console.log(userDetails);
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
                console.log(`Event deleted`);
            } else {
                console.error('Failed to delete event:', result.error);
            }
        } else {
            console.error('Server returned an error:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error deleting event:', error);
    }
    refreshEvents();
  };
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
    <ScrollView>
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
        color="#0088CB"
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
          <TouchableOpacity onPress={() => openMaps(item.meetingPoint)}>
            <Text style={styles.dashContainerText}>Meeting Point: {item.meetingPoint}</Text>
        </TouchableOpacity>
          <Button
            title="Edit"
            onPress={() => editEvent(item._id)}
          />
          <Button
            title="Delete"
            color="#f24738"
            onPress={() => {
              const { userID } = route.params
              deleteEvent(userID,item._id)
              
            }}
          />
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
        color="#0088FE"
        onPress={refreshEvents}
      />
    </View>


    </View>
    </ScrollView>
  );
};

const openMaps = (address) => {
  const formattedAddress = encodeURIComponent(address);
  console.log(formattedAddress);

  let mapsUrl;

  if (Platform && Platform.select) {
    // For React Native (iOS and Android)
    mapsUrl = Platform.select({
      web: `https://www.google.com/maps/search/?api=1&query=${formattedAddress}`,
      ios: `maps://app?daddr=${formattedAddress}`,
      android: `google.navigation:q=${formattedAddress}`,
    });
  } else {
    // Fallback for web environments
    mapsUrl = `https://www.google.com/maps/search/?api=1&query=${formattedAddress}`;
  }

  Linking.openURL(mapsUrl);
};

export default DashboardScreen;
