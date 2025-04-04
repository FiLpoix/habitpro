import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import AddHabitScreen from './screens/AddHabitScreen';
import RegisterScreen from './screens/RegisterScreen';
import UpdateHabitScreen from './screens/UpdateHabitScreen';
import AchievementsScreen from './screens/AchievementsScreen';
import HabitDetailScreen from './screens/HabitDetailScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    const prepare = async () => {
      try {
        // Manter o Splash visível enquanto carrega
        await SplashScreen.preventAutoHideAsync();
        // Simula carregamento (ex: carregar recursos)
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } finally {
        // Esconde o Splash Screen
        await SplashScreen.hideAsync();
      }
    };
    prepare();
  }, []);
  
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false}} />
          <Stack.Screen name="Achievements" component={AchievementsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="HabitDetail" component={HabitDetailScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Update" component={UpdateHabitScreen} options={{ headerShown: false}} />
          <Stack.Screen name="Add" component={AddHabitScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}