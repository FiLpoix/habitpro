import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import AddHabitScreen from './screens/AddHabitScreen';
import RegisterScreen from './screens/RegisterScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import UpdateHabitScreen from './screens/UpdateHabitScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Update" component={UpdateHabitScreen} options={{ headerShown: false}} />
          <Stack.Screen name="Add" component={AddHabitScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}