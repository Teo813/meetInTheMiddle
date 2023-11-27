import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  loginIconView:{width:'50%'},
  loginIcon: {flex: 1,
    resizeMode: 'contain',
    height: 200,
    width: 200,
    padding: 5,
    alignSelf:'center'},
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
  minWidth: 300,
  borderColor: 'gray',
  borderWidth: 1,
  borderRadius: 5,
  marginBottom: 10,
  paddingLeft: 10,
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
  dashView: {flex: 1, justifyContent: 'center', alignItems: 'center' ,rowGap:10},
  dashWelcomeView: {flex: 1,  justifyContent: 'center' , padding:10},
  dashWelcomeChild: {},
  dashWelcomeText: {
    padding: 20,
    textAlign: 'center',
    fontSize: 20,
  },
  dashWelcomeIcon: {
    flex: 1,
    resizeMode: 'contain',
    height: 100,
    width: 100,
    padding: 5,
    alignSelf:'center'
  },
  dashContainer: {margin: 10, 
    padding: 20, 
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius:10,

  },
  dashContainerButtons:{flex:1, gap:10},
  dashContainerText: {
    fontSize: 16,
    padding:10,
  },
  registrationContainer: {
    paddingVertical:15,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
},
registrationInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    paddingVertical:10,
},
nav: {
  position: 'fixed',
  bottom: 0,
  width: '100%',
  left: 0,
  backgroundColor: '#f2f2f2', 
  display: 'flex',
  justifyContent: 'space-around',
  padding: '10px 0',
  boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.2)',
  flexWrap: 'nowrap',
  height: '5%',
},
navIcon: {
  flex:1,
  resizeMode: 'contain',
  height: null,
  width: null,
  paddingTop: 5,
},
profileButtons: {

}
})
export { styles };