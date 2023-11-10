
import {StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
},
scrollView: {
    marginBottom: 20, // Add some space at the bottom
},
placeContainer: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#f8f8f8',
},
selectedPlace: {
    backgroundColor: '#e8e8e8',
    borderColor: '#c0c0c0',
},
placeName: {
    fontWeight: 'bold',
    fontSize: 16,
},
placeVicinity: {
    fontSize: 14,
    color: '#555',
},
});

export default styles;
