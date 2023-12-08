import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  loginIcon: {
    resizeMode: 'contain',
    height: 160,
    width: 160,
    padding: 5,
    alignSelf: 'center'
  },
  w: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    display: 'flex',
  },
  w2: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    display: 'flex',
    top: '10%'
  },
  break: {
    height: 20,
  },
  pBlue: {
    padding: 20,
    paddingVertical: 8,
    marginVertical: 5,
    borderWidth: 5,
    borderColor: '#0088cb',
    backgroundColor: '#0088cb',
    borderRadius: 7,
    paddingHorizontal: 50,
  },
  pBlue2: {
    padding: 10,
    paddingVertical: 8,
    marginVertical: 5,
    borderWidth: 2,
    borderColor: '#43b6ef',
    backgroundColor: '#43b6ef',
    borderRadius: 7,
    paddingHorizontal: 5,
  },
  pRed: {
    padding: 10,
    paddingVertical: 6,
    marginVertical: 5,
    borderWidth: 5,
    borderColor: '#eb534b',
    backgroundColor: '#eb534b',
    borderRadius: 7,
  },
  tiP: {
    color: 'white',
    fontSize: 16,
    letterSpacing: 2,
  },
  tiP2: {
    color: 'white',
    fontSize: 12,
    letterSpacing: 2,
  },
  ti1: {
    height: 40,
    minWidth: 300,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    textAlign: 'center',
    color: 'gray',
  },
  h1: {
    paddingBottom: 10,
    textAlign: 'center',
    fontSize: 16,
  },
  h3: {
    paddingBottom: 10,
    textAlign: 'center',
    fontSize: 17,
    fontWeight:'400',
  },
  h4: {
    paddingBottom: 10,
    textAlign: 'center',
    fontSize: 13,
    fontWeight:'400',
  },
  h2: {
    paddingBottom: 10,
    textAlign: 'center',
    fontSize: 25,
  },

  p: {
    paddingBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  p2: {
    paddingBottom: 5,
    paddingTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
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
    alignItems: 'center',
    rowGap: 10
  },
  dashWelcomeView: {
    flex: 1,
    justifyContent: 'center',
    padding: 10
  },
  dashWelcomeIcon: {
    flex: 1,
    resizeMode: 'contain',
    height: 100,
    width: 100,
    padding: 5,
    alignSelf: 'center'
  },

  dashContainer: {
    margin: 'auto',
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#fff",
    flexDirection: 'row',
    width: '100%',
    padding: 18,
    paddingLeft:22,
    marginBottom: 15,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowColor: '#00728f',
    shadowRadius: 5,
    shadowOpacity: .3,
  },
  dashFloat: {
    display: 'inline-block',
    width: '0%',
    justifyContent: 'space-evenly',
    height: 160,
    paddingLeft: 5,

  },
  dashLeft: {
    display: 'inline-block',
    width: '87%',
  },
  dashIcon: {
    resizeMode: 'contain',
    height: 38,
    width: 38,
  },
  dashContainerText: {
    fontSize: 16,
    marginVertical: 8,
    paddingLeft: 0,
  },
  eventTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#0088cb',
    marginBottom: 2,
    paddingVertical:5,
    textAlign: 'left',
    paddingRight: 8,
  },
  eventh2: {
    fontWeight: '500',
    fontSize: 20,
    color: '#439aef',
    marginBottom: 0,
    textAlign: 'left',
  },
  nav: {
    position: 'fixed',
    width: '100%',
    backgroundColor: '#f2f2f2',
    display: 'flex',
    justifyContent: 'space-around',
    paddingBottom: 30,
    height: 70,
    flexDirection: 'row', // Aligns items in a row
    alignItems: 'center', // Centers items vertically
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop:10,
  },
  navIcon: {
    flex: 1,
    resizeMode: 'contain',
    height: 40,
    width: 40,

  },
  profile: {
    backgroundColor: 'blue',
    paddingBottom: 5,
  },
  profileButtons: {
    backgroundColor: '#0088cb',
    color: 'white',
    height: 20,
    paddingTop: 3,
  },
  newp: {
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  picker: {

    width: 300,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  pick: {
    padding:10,
    borderRadius:10,
    borderWidth: 1,
    borderColor: 'gray',
    textAlign:'center',
    paddingHorizontal:3,
  },
  centeredView:{
top:'10%',
  },
  confirmButton: {
    backgroundColor:'green',
    padding:10,
    borderRadius:4,
    textAlign:'center',
    margin:10,

  },
  cancelButton:{
    backgroundColor:'red',
    padding:10,
    borderRadius:4,
    textAlign:'center',
    margin:10,

  },
  modalView:{
  },
  in:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  input: {
    height: 40,
    minWidth: 200,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    textAlign: 'center',
    color: 'gray',

  },
  close: {
    padding: 20,
    paddingVertical: 8,
    marginVertical: 5,
    borderWidth: 5,
    borderColor: '#0088cb',
    backgroundColor: '#0088cb',
    borderRadius: 7,
    paddingHorizontal: 50,
  }
})
export { styles };