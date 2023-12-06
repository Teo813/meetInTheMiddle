import React, { useState, useEffect } from 'react';
import { Image, Pressable, TouchableOpacity, View, Text, TextInput, Button, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { styles } from "./Styles/styles.js";
import RNPickerSelect from 'react-native-picker-select';
//import {GOOGLE_API_KEY} from "@env";

const GOOGLE_API_KEY = 'AIzaSyBaPcbrFg7clbcDU8LLnmzZd3vBU89S0CM'; // Replace 'YOUR_API_KEY' with your actual API key
const fetchEventData = async (eventId) => {
  const SERVER_URL = `http://18.116.60.22:3000/getEvent`; // Adjust the URL based on your API endpoint for fetching event data
  const eventID = { eventId };
  try {
    const response = await fetch(SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventID)
    });
    if (response.ok) {
      const result = await response.json();
      console.log('Event data:', result);
      return result; // Return the event data
    } else {
      console.error('Server returned an error:', response.status, response.statusText);
      return null; // Handle error as needed
    }
  } catch (error) {
    console.error('Error fetching event data:', error);
    return null; // Handle error as needed
  }
};

function determineRadius(lat1, lon1, lat2, lon2) {
  // Haversine formula to calculate distance
  function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceInKm = R * c;
    return distanceInKm * 0.621371;  // Convert km to miles
  }
  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  const distance = haversineDistance(lat1, lon1, lat2, lon2);
  console.log(distance)
  // Determine radius based on the distance
  if (distance < 1) {
    return 500;
  } else if (distance < 5) {
    return 1000;
  } else if (distance < 15) {
    return 5000;
  } else {
    return 10000;
  }
}
async function getLatLngFromAddress(address) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}`
  );
  const data = await response.json();
  console.log(data);
  if (data.status !== 'OK' || !data.results || data.results.length === 0) {
    throw new Error('Failed to geocode address');
  }

  const location = data.results[0].geometry.location;
  return {
    lat: location.lat,
    lng: location.lng
  };
}
async function getPlacesNearby(midLat, midLon, radius, types) {
  const response = await fetch(`http://18.116.60.22:3000/getNearbyPlaces?lat=${midLat}&lng=${midLon}&radius=${radius}&types=${types}`);
  //const response = await fetch(`http://localhost:3000/getNearbyPlaces?lat=${midLat}&lng=${midLon}&radius=${radius}&types=${types}`);
  const data = await response.json();
  console.log(data);

  if (data.status !== 'OK') {
    throw new Error('Failed to fetch nearby places');
  }

  return data.results;
}
async function addEventToDatabase(userID, eventName, address1, address2, selectedPlace) {

  const SERVER_URL = 'http://18.116.60.22:3000/addEvent';  // Replace 'your_server_ip' with the actual IP of your server  
  //const SERVER_URL = 'http://localhost:3000/addEvent';  // Replace 'your_server_ip' with the actual IP of your server
  console.log(selectedPlace);
  const eventDetails = {
    userID,
    eventName,
    address1,
    address2,
    meetingPoint: `${selectedPlace.name} - ${selectedPlace.vicinity}`  // Assuming selectedPlace contains a 'name' property for the meeting point
  };

  try {
    const response = await fetch(SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventDetails)
    });

    const result = await response.json();
    if (result.success) {
      console.log(`Event added with ID: ${result.insertedId}`);
    } else {
      console.error('Failed to add event:', result.error);
    }
  } catch (error) {
    console.error('Error adding event:', error);
  }
}
async function updateEvent(eventId, userID, eventName, address1, address2, selectedPlace) {
  const SERVER_URL = 'http://18.116.60.22:3000/editEvent';  // Replace 'your_server_ip' with the actual IP of your server  
  //const SERVER_URL = 'http://localhost:3000/addEvent';  // Replace 'your_server_ip' with the actual IP of your server
  console.log(selectedPlace);
  const eventDetails = {
    eventId,
    userID,
    eventName,
    address1,
    address2,
    meetingPoint: `${selectedPlace.name} - ${selectedPlace.vicinity}`  // Assuming selectedPlace contains a 'name' property for the meeting point
  };

  try {
    const response = await fetch(SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventDetails)
    });

    const result = await response.json();
    if (result.success) {
      console.log(`Event added with ID: ${result.insertedId}`);
    } else {
      console.error('Failed to add event:', result.error);
    }
  } catch (error) {
    console.error('Error adding event:', error);
  }
}





const NewEventScreen = ({ route, navigation }) => {
  const [eventName, setEventName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [locationType, setLocationType] = useState('restaurant');
  const [places, setPlaces] = useState([]);
  const [savedLocations, setSavedLocations] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [eventId, setEventId] = useState(null);

  useEffect(() => {
    const loadEventData = async () => {
      if (route.params?.eventId) {
        setIsEdit(true);
        const eventData = await fetchEventData(route.params.eventId);
        if (eventData) {
          setEventName(eventData.event.eventName);
          setAddress1(eventData.event.address1 || '');
          setAddress2(eventData.event.address2 || '');
          setSelectedPlace(eventData.event.selectedPlace || {});
          setEventId(eventData.event._id);
        }
      }
    };
    //const { userID } = route.params
    // retrieveSavedLocation(userID);
    loadEventData();
  }, [route.params?.eventId]); // Depend on eventId to trigger useEffect


  const submitEvent = async (isEdit, eventId, userID, eventName, address1, address2, selectedPlace) => {

    if (isEdit) {
      console.log("Is Edit is true")
      console.log(`Current eventId is ${eventId}`)
      updateEvent(eventId, userID, eventName, address1, address2, selectedPlace);
    }
    else {
      addEventToDatabase(userID, eventName, address1, address2, selectedPlace);
    }
  };


  const findMeetingLocations = async () => {
    try {
      console.log(address1)
      console.log(address2)

      const location1 = await getLatLngFromAddress(address1);
      const location2 = await getLatLngFromAddress(address2);
      // Calculate midpoint
      const midLat = (location1.lat + location2.lat) / 2;
      const midLon = (location1.lng + location2.lng) / 2;
      //Find good radius
      const radius = determineRadius(location1.lat, location1.lng, location2.lat, location2.lng);


      // Fetch nearby places using Google Places API
      const places = await getPlacesNearby(midLat, midLon, radius, locationType);
      setPlaces(places);
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  const handlePickerChange = (itemValue) => {
    setAddress1(itemValue); // Update TextInput value based on Picker selection
  };

  const retrieveSavedLocation = async (userID) => {
    const SERVER_URL = 'http://18.116.60.22:3000/retrieveSavedLocation';
    try {
      const response = await fetch(SERVER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID }),
      });

      const result = await response.json();
      //console.log('API Response:', result);
      if (result.success) {
        setSavedLocations(result.retrievedLocations);
        console.log('Saved locations:', result.retrievedLocations);
      } else {
        console.error('Failed to retrieve saved locations:', result.error);
      }
    } catch (error) {
      console.error('Error retrieving saved locations:', error);
    } finally {
      // Any cleanup code if needed
    }
  };

  useEffect(() => {
    // Call the retrieval function when the component mounts.
    // For example, retrieve events for 'user123'.
    const { userID } = route.params
    retrieveSavedLocation(userID);
  }, []);

  return (
    //HEEHHEEHHE
    <View style={styles.container}>
      <View style={styles.w}>
        <View style={styles.newp}>

          <Text style={{ fontWeight: "bold" }}>Event Name</Text>
          <View style={styles.newp}>
            <TextInput
              style={styles.ti1}
              value={eventName}
              onChangeText={setEventName}
              placeholder="Event Name"
            />
          </View>
          <Text style={{ fontWeight: "bold" }}>Address 1 Information</Text>
        </View>

        <View style={styles.newp}>
          <View style={styles.picker}>
            <RNPickerSelect
              style={{ inputIOS: styles.pick, inputAndroid: styles.pick }}
              value={address1}
              onValueChange={handlePickerChange}
              items={savedLocations.map((location) => ({
                label: location.addressName,
                value: location.address,
              }))}
            />
          </View>
          <TextInput
            style={styles.ti1}
            value={address1}
            onChangeText={setAddress1}
            editable={true}
            placeholder="Enter your address 1"
          />
          <Text style={{ fontWeight: "bold" }}>Address 2 Information</Text>
        </View>



        <View style={styles.newp}>
          <TextInput
            style={styles.ti1}
            value={address2}
            onChangeText={setAddress2}
            placeholder="Enter your address 2"
          />
        </View>
        <View style={styles.p}>
          <Text style={{ fontWeight: "bold" }}>Location Type</Text>
          <View style={styles.picker}>
            <RNPickerSelect
              style={{ inputIOS: styles.pick, inputAndroid: styles.pick }}
              value={locationType}
              onValueChange={(itemValue) => setLocationType(itemValue)}
              items={[
                { label: 'Restaurant', value: 'restaurant' },
                { label: 'Cafe', value: 'cafe' },
                { label: 'Park', value: 'park' },
                { label: 'Shopping Mall', value: 'shopping_mall' },
                { label: 'Movie Theater', value: 'movie_theater' },
              ]}
            />

          </View>
        </View>
        <View style={styles.p}>
          <Button
            title="Meet in the Middle!"
            color="#43CFEF"
            onPress={findMeetingLocations}
          />
        </View>
        {places.length > 0 && (
          <ScrollView>
            <Text>Select a Meeting Point:</Text>
            <Text>
              {places.map(place => (
                <TouchableOpacity key={place.id} onPress={() => setSelectedPlace(place)}>
                  <Text style={selectedPlace?.id === place.id ? { fontWeight: 'bold' } : null}>
                    {place.name} - {place.vicinity}
                  </Text>
                </TouchableOpacity>
              ))}
            </Text>
          </ScrollView>
        )}
        <View style={styles.p}>
          <Button
            title="Create Event"
            color="#0088CB"
            onPress={() => {
              const { userID, email } = route.params
              //SUBMIT EVENT BUTTON INTAKES CURRENT PARAMS BASED ON IF IS EDIT
              submitEvent(isEdit, eventId, userID, eventName, address1, address2, selectedPlace)
              //addEventToDatabase(userID,eventName,address1,address2,selectedPlace)
              navigation.navigate('DashboardScreen', { userID: userID, email: email })
            }}
          />
        </View>
        <View style={styles.p}>
          <Button
            title="Send Event Link"
            color="#0088CB"
            onPress={() => {
              const { userID, email } = route.params
              alert(`http://18.116.60.22/addressSubmission.html?userID=${userID}`)
              navigation.navigate('DashboardScreen', { userID: userID , email: email})
            }}
          />
        </View>
        <View style={styles.nav}>
          <Pressable onPress={() => {
            const { userID, email } = route.params;
            navigation.navigate('DashboardScreen', { userID: userID , email: email});
          }}>
            <Image source={require('./assets/dashIcon.png')} alt="Dashboard Icon" style={styles.navIcon} />
          </Pressable>
          <Pressable onPress={() => {
            const { userID, email } = route.params;
            navigation.navigate('NewEventScreen', { userID: userID, email: email });
          }}>
            <Image source={require('./assets/eventIconPressed.png')} alt="New Event Icon" style={styles.navIcon} />

          </Pressable>
          <Pressable onPress={() => {
            const { userID , email} = route.params;
            navigation.navigate('ProfilePage', { userID: userID, email: email });
          }}>
            <Image source={require("./assets/profileIcon.png")} alt="Profile Icon" style={styles.navIcon} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default NewEventScreen;
