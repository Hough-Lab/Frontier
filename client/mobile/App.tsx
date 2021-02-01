import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import RegisterDOBScreen from './screens/RegisterOptionalScreens/RegisterDOBScreen';
import RegisterLanguageScreen from './screens/RegisterOptionalScreens/RegisterLanguageScreen';
import RegisterTagsScreen from './screens/RegisterOptionalScreens/RegisterTagsScreen';
import RegisterProfilePicScreen from './screens/RegisterOptionalScreens/RegisterProfilePicScreen';
import HomeScreen from './screens/HomeScreen';
import BottomTabBar from './components/BottomTabBar';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const LoginStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerShown: false}}/>
      <Stack.Screen name="RegisterDOBScreen" component={RegisterDOBScreen} options={{headerShown: false}}/>
      <Stack.Screen name="RegisterLanguageScreen" component={RegisterLanguageScreen} options={{headerShown: false}}/>
      <Stack.Screen name="RegisterTagsScreen" component={RegisterTagsScreen} options={{headerShown: false}}/>
      <Stack.Screen name="RegisterProfilePicScreen" component={RegisterProfilePicScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

const MainStackNavigator = () => {
  return (
    <Tab.Navigator tabBar={() => <BottomTabBar />}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
    </Tab.Navigator>
  )
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginStackNavigator" component={LoginStackNavigator} options={{headerShown: false}}/>
        <Stack.Screen name="MainStackNavigator" component={MainStackNavigator} options={{headerShown: false}}/>
      </Stack.Navigator>
        <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});

export default App;
