import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { styles } from "./styles.js";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.w}>
      <View style = {styles.p}>
      <Text style = {styles.h1}>Email</Text>
      <TextInput style = {styles.ti1}
        value = {email}
        onChangeText={setEmail}
        placeholder="Enter your email"
      />
      </View>
      
      <View style = {styles.p}>
      <Text style = {styles.h1}>Password</Text>
      <TextInput 
        style = {styles.ti1}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
      />
      </View>

      <View style = {styles.break}></View>
      <View style = {styles.p}>
      <Button style = {styles.b1}
        title="Login"
        color="#43CFEF"
        onPress={() => {
          validateUser(email, password,{ navigation });
        }}
      />
      </View>
      <View style = {styles.p}>
      <Button
        title="Register"
        color="#0088CB"
        onPress={() => {
          navigation.navigate('RegistrationScreen');
        }}
           />
           </View>
    </View>
  );
};
const loginstyle = StyleSheet.create({
  loginViewStyle:{          height: 40, 
    borderColor: 'gray', 
    borderWidth: 1, 
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10
    },
});
export default LoginScreen;
