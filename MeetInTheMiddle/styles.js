import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
w: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    display:'flex',
},
break: {
    height:20,
},
ti1: {
    height: 40,
    maxWidth: 300,
    bordercolor: 'gray',
    borderwidth: 1,
    borderradius: 5,
    marginbottom: 10,
    paddingleft: 10,
    outlineColor:'lightgray',
    outlineStyle: 'solid',
    outlineWidth: 'thin',
    textAlign: 'center',
    color: 'gray',

},
h1: {
    paddingBottom: 10,
    textAlign: 'center',
    fontSize:16,
},

p:{
    paddingBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    display:'flex',
},
eventContainer: {
    margin: 10, 
    padding: 10, 
    borderColor: '#CCCCCC',
    borderWidth: 1,
  },
  eventText: {
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
})
export { styles };