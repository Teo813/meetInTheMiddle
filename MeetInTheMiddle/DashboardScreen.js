
import { styles } from './Styles/styles';
import React, { useState, useEffect } from 'react';
import { Image, View, Text, FlatList, Button, StyleSheet, TouchableOpacity, Linking,ScrollView, Platform, Pressable, Modal, TextInput } from 'react-native';
const DashboardScreen = ({route, navigation }) => {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [sharedEventID, setModalData] = useState('');
  const [sharedEventName, setSharedEventName] = useState('');
  const [sharedEmail, setSharedEmail] = useState('');

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

  const shareEvent = async (userID, email, modalData) => {

    if (!email) return;
    const SERVER_URL = 'http://localhost:3000/shareEvent';

    try {
      const response = await fetch(SERVER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID, email, modalData }),
      });

      const result = await response.json();
      if (result.success) {
        console.log('successfully shared event')
      } else {
        console.error('Failed to sharing event:', result.error);
      }
    } catch (error) {
      console.error('Error sharing event:', error);
    } finally {
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

  const openModal = (eventID, eventName) => {
    setModalData(eventID)
    setSharedEventName(eventName)
    setModalVisible(true)
    console.log(eventID)
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  return (

    <View style = {styles.dashView}>
      <View style={styles.p2}>
      <Button 
        title="Refresh"
        color="#0088FE"
        onPress={refreshEvents}
      />
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
      ) : (
        <Text>No saved events found.</Text>
        )}
        <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            
          <Text>Event Name: {sharedEventName}</Text> 
        
            <TextInput 
              style={styles.input}
              value={sharedEmail}
              onChangeText={setSharedEmail}
              placeholder="Enter User's Email"
            />
            <Button color="#FF0000" title="Share Event"   onPress={() => {
            const { userID } = route.params;
            shareEvent(userID, sharedEmail, sharedEventID);
            closeModal();
             }} />
            <Button color="#FF0000" title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </View>
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
          const { userID, email } = route.params;
          navigation.navigate('ProfilePage', {userID: userID, email: email});
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

export default DashboardScreen;
