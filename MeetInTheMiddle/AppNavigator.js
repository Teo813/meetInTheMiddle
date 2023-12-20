import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './LoginScreen';
import RegistrationScreen from './RegistrationScreen';
import DashboardScreen from './DashboardScreen';
import NewEventScreen from './NewEventScreen';
import ProfilePage from './ProfilePage';
import SharedEventsPage from './TheSharedEventsPage';


const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
        <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
        <Stack.Screen name="NewEventScreen" component={NewEventScreen} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} />
        <Stack.Screen name="SharedEventsPage" component={SharedEventsPage} />

        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
 