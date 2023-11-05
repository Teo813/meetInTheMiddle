import React, { useState } from 'react';
import { Picker, TouchableOpacity, View, Text, TextInput, Button } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import styles from './RegistrationScreen'
const GOOGLE_MAPS_API_KEY = 'AIzaSyBaPcbrFg7clbcDU8LLnmzZd3vBU89S0CM'; // Replace 'YOUR_API_KEY' with your actual API key

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
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`
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
async function getPlacesNearby(midLat, midLon, radius,types) {
  const response = await fetch(`http://localhost:3000/getNearbyPlaces?lat=${midLat}&lng=${midLon}&radius=${radius}&types=${types}`);
  const data = await response.json();
  

  if (data.status !== 'OK') {
      throw new Error('Failed to fetch nearby places');
  }

  return data.results;
}
async function addEventToDatabase() {

}

const NewEventScreen = ({ navigation }) => {
  const [eventName, setEventName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [locationType, setLocationType] = useState('restaurant');  // Default to "restaurant"
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const findMeetingLocations = async () => {
    try{
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
      const places = await getPlacesNearby(midLat, midLon,radius,locationType);  
      setPlaces(places);    
    }catch (error) {
    console.log('ERROR',error);
    }
  };
  return (
    <View style={styles.container}>
      <Text>Event Name</Text>
      <TextInput 
        style={styles.input}
        value={eventName}
        onChangeText={setEventName}
        placeholder="Event Name"
      />
      <Text>First Address</Text>
      <TextInput 
        style={styles.input}
        value={address1}
        onChangeText={setAddress1}
        placeholder="Enter your address1"
      />

      <Text>Second Address</Text>
      <TextInput 
        style={styles.input}
        value={address2}
        onChangeText={setAddress2}
        placeholder="Enter your address2"
      />
            <Text>Location Type</Text>
      <Picker
        selectedValue={locationType}
        onValueChange={(itemValue) => setLocationType(itemValue)}
      >
        <Picker.Item label="Restaurant" value="restaurant" />
        <Picker.Item label="Cafe" value="cafe" />
        <Picker.Item label="Park" value="park" />
        <Picker.Item label="Shopping Mall" value="shopping_mall" />
        <Picker.Item label="Movie Theater" value="movie_theater" />
      </Picker>
      <Button 
        title="Meet in the Middle!"
        color="#FF0000"
        onPress={findMeetingLocations}
      />
      {places.length > 0 && (
                <View>
                    <Text>Select a Meeting Point:</Text>
                    {places.map(place => (
                        <TouchableOpacity key={place.id} onPress={() => setSelectedPlace(place)}>
                            <Text style={selectedPlace?.id === place.id ? { fontWeight: 'bold' } : null}>
                                {place.name} - {place.vicinity}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
      <Button 
        title="Create Event"
        color="#FF0000"
        onPress={() => {
          addEventToDatabase('user123',eventName,address1,address2,selectedPlace)
          navigation.navigate('DashboardScreen')
        }}
      />
    </View>
  );
};

export default NewEventScreen;
