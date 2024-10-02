// src/navigators/AuthNavigator.js
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { createStackNavigator } from '@react-navigation/stack';
import Loginscreen from '../screens/loginscreen';
import RootNavigator from '../RootNavigator'; // Your main app navigator

const Stack = createStackNavigator();

export default function AuthNavigator() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        // If authenticated, show the main app
        <Stack.Screen name="Root" component={RootNavigator} options={{ headerShown: false }} />
      ) : (
        // If not authenticated, show the login screen
        <Stack.Screen name="Login" component={Loginscreen} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
}
