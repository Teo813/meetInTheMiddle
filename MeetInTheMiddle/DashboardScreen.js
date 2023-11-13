import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

const DashboardScreen = ({route, navigation }) => {
  
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const retrieveEventsFunction = async (userID) => {
    const SERVER_URL = 'http://localhost:3000/retrieveEvent';

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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to Dashboard!</Text>
      <Button 
        title="New Event"
        color="#FF0000"
        onPress={() => {
          const { userID } = route.params
          navigation.navigate('NewEventScreen', {userID: userID});
        }}
      />
      {loading ? (
        <Text>Loading events...</Text>
      ) : events.length > 0 ? (
        <FlatList
          data={events}
          keyExtractor={(item) => item._id.toString()} 
          renderItem={({ item }) => (
            <View style={styles.eventContainer}>
              <Text style={styles.eventText}>Event Name: {item.eventName}</Text>
              <Text style={styles.eventText}>Address 1: {item.address1}</Text>
              <Text style={styles.eventText}>Address 2: {item.address2}</Text>
              <Text style={styles.eventText}>Meeting Point: {item.meetingPoint}</Text>
            </View>
          )}
        />
      ) : (
        <Text>No saved events found.</Text>
      )}
 <Button 
        title="Refresh"
        color="#FF0000"
        onPress={refreshEvents}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  eventContainer: {
    margin: 10, 
    padding: 10, 
    borderColor: '#CCCCCC',
    borderWidth: 1,
  },
  eventText: {
    fontSize: 16,
  },
});

export default DashboardScreen;
