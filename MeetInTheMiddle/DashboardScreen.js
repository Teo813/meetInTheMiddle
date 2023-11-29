
import { styles } from './Styles/styles';
import React, { useState, useEffect } from 'react';
import { Image, View, Text, FlatList, Button, StyleSheet, TouchableOpacity, Linking,ScrollView, Platform, Pressable  } from 'react-native';
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
    <View style = {styles.dashView}>
      <View style={styles.p2}>
      <Button 
        title="Refresh"
        color="#0088FE"
        onPress={refreshEvents}
      />
    </View>
      
      {loading ? (
        <Text>Loading events...</Text>
      ) : events.length > 0 ? (
        <FlatList
      data={events}
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
            onPress={() => {}}>
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
      ) : (
        <Text>No saved events found.</Text>
        )}
    <View style={styles.nav}>
      <Pressable onPress={() => {
          const { userID } = route.params;
          navigation.navigate('DashboardScreen', {userID: userID});
        }}>
      <Image source={require('./assets/dashIconPressed.png')} alt="Dashboard Icon" style={styles.navIcon}/>
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
    <Image source= {require("./assets/profileIcon.png")} alt="Profile Icon" style={styles.navIcon}/>
    </Pressable>
    </View>
    </View>

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
