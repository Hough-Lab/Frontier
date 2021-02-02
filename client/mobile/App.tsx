import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  BottomTabBarOptions,
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import reducers from './reducers';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import RegisterDOBScreen from './screens/RegisterOptionalScreens/RegisterDOBScreen';
import RegisterLanguageScreen from './screens/RegisterOptionalScreens/RegisterLanguageScreen';
import RegisterTagsScreen from './screens/RegisterOptionalScreens/RegisterTagsScreen';
import RegisterProfilePicScreen from './screens/RegisterOptionalScreens/RegisterProfilePicScreen';
import CreateTipScreen from './screens/CreateTipScreen';
import DisplayTipScreen from './screens/DisplayTipScreen';
import HomeScreen from './screens/HomeScreen';
import BottomTabBar from './components/BottomTabBar';
import UserProfileScreen from './screens/UserProfileScreen';
import { Navigation } from './interfaces/interfaces';

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(reduxThunk)),
);

export type AppDispatch = typeof store.dispatch;

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const LoginStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterDOBScreen"
        component={RegisterDOBScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterLanguageScreen"
        component={RegisterLanguageScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterTagsScreen"
        component={RegisterTagsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterProfilePicScreen"
        component={RegisterProfilePicScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const TipNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CreateTipScreen" component={CreateTipScreen} />
      <Stack.Screen name="DisplayTipScreen" component={DisplayTipScreen} />
    </Stack.Navigator>
  );
};

const MainStackNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="TipNavigator" component={TipNavigator} />
      <Tab.Screen name="UserProfileScreen" component={UserProfileScreen} />
    </Tab.Navigator>
  );
};

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="LoginStackNavigator"
            component={LoginStackNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MainStackNavigator"
            component={MainStackNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});

export default App;
