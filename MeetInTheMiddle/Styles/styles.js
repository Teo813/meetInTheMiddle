import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  loginIconView:{
    width:'50%',
    marginBottom:15,
    opacity:.8,
  },
  loginIcon: {
    resizeMode: 'contain',
    height: 160,
    width: 160,
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
pBlue:{
  padding: 20,
  paddingVertical:8,
  marginVertical: 5,
  borderWidth: 5,
  borderColor: '#0088cb',
  backgroundColor: '#0088cb',
  borderRadius:5,
},
tiP: {
  color:'white',
  fontSize:15,
  letterSpacing:2,
},
ti1: {
  height: 40,
  minWidth: 300,
  borderColor: 'gray',
  borderWidth: 1,
  borderRadius: 5,
  marginBottom: 10,
  paddingLeft: 10,
//  outlineColor:'lightgray',
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

h2: {
  paddingBottom: 10,
  textAlign: 'center',
  fontSize:25,
},

p:{
    paddingBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    display:'flex',
},
p2:{
  paddingBottom: 5,
  paddingTop: 15,
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
  dashView: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' ,
    rowGap:10
  },
  dashWelcomeView: {
    flex: 1,  
    justifyContent: 'center' , 
    padding:10
  },
  dashWelcomeIcon: {
    flex: 1,
    resizeMode: 'contain',
    height: 100,
    width: 100,
    padding: 5,
    alignSelf:'center'
  },

  dashContainer: {
    margin:'auto',
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius:5,
    backgroundColor: "#fff",
    flexDirection:'row',
    width:'100vw',
    padding:18,
    marginBottom:15,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowColor:'#00728f',
    shadowRadius:5,
    shadowOpacity:.3,
  },
  dashFloat:{
    display: 'inline-block',
    width:'0%',
    justifyContent:'space-evenly',
    height: 160,
    paddingLeft:5,
    
  },
  dashLeft:{
    display: 'inline-block',
    width:'87%',
  },
  dashIcon:{
    resizeMode: 'contain',
    height: 38,
    width: 38,
  },
  dashContainerText: {
    fontSize: 16,
    marginVertical: 8, 
    textIndent: '20%',
    paddingLeft: 15,
  },
  eventTitle: {
    fontWeight:'bold',
    fontSize: 24, 
    color:'#0088cb',
    marginBottom:2,
    textAlign:'center',
    paddingRight:8,
  },
  eventh2:{
    fontWeight:'bold',
    fontSize: 20, 
    color:'#439aef',
    marginBottom:0,
    textAlign:'center',
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
  width: '100vw',
  backgroundColor: '#f2f2f2', 
  display: 'flex',
  justifyContent: 'space-around',
  padding: '1% 0',
  paddingBottom: 30,
  height: 60,
  flexDirection: 'row', // Aligns items in a row
  alignItems: 'center', // Centers items vertically
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
},
navIcon: {
  flex:1,
  resizeMode: 'contain',
  height: 40 ,
  width: 40,

},
profile: {
  backgroundColor: 'blue',
  paddingBottom: 5,
},
profileButtons: {
  backgroundColor:'#0088cb',
  color: 'white',
  height: 20,
  paddingTop: 3,
}
})
export { styles };