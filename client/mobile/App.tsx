import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  HeaderBackButton,
} from '@react-navigation/stack';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  BottomTabBarOptions,
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import reducers from './store/reducers';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import RegisterDOBScreen from './screens/RegisterOptionalScreens/RegisterDOBScreen';
import RegisterLanguageScreen from './screens/RegisterOptionalScreens/RegisterLanguageScreen';
import RegisterTagsScreen from './screens/RegisterOptionalScreens/RegisterTagsScreen';
import RegisterProfilePicScreen from './screens/RegisterOptionalScreens/RegisterProfilePicScreen';
import CreateTipScreen from './screens/CreateTipScreen';
import DisplayTipScreen from './screens/DisplayTipScreen';
import CreateEventScreen from './screens/CreateEventScreen';
import DisplayEventScreen from './screens/DisplayEventScreen';
import HomeScreen from './screens/HomeScreen';
import DisplayPOIScreen from './screens/DisplayPOIScreen';
import BottomTabBar from './components/BottomTabBar';
import UserProfileScreen from './screens/UserProfileScreen';
import { Navigation } from './interfaces/interfaces';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

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
      <Stack.Screen
        name="CreateTipScreen"
        component={CreateTipScreen}
        options={({ navigation }) => ({
          title: 'Create a Travel Tip',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <AntDesign
              style={{ paddingLeft: 15 }}
              name="arrowleft"
              size={24}
              color="black"
              onPress={() => navigation.navigate('HomeScreen')}
            />
          ),
        })}
      />
      <Stack.Screen
        name="DisplayTipScreen"
        component={DisplayTipScreen}
        options={{
          title: 'Travel Tip',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

const EventNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CreateEventScreen"
        component={CreateEventScreen}
        options={({ navigation }) => ({
          title: 'Create an Event',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <AntDesign
              style={{ paddingLeft: 15 }}
              name="arrowleft"
              size={24}
              color="black"
              onPress={() => navigation.navigate('HomeScreen')}
            />
          ),
        })}
      />
      <Stack.Screen
        name="DisplayEventScreen"
        component={DisplayEventScreen}
        options={{
          title: 'Event',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

// const POINavigator = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="DisplayPOIScreen"
//         component={DisplayPOIScreen}
//         options={{
//           title: 'Travel Tip',
//           headerTitleAlign: 'center',
//         }}
//       />
//       <Stack.Screen
//         name="DisplayEventScreen"
//         component={DisplayEventScreen}
//         options={{
//           title: 'Travel Tip',
//           headerTitleAlign: 'center',
//         }}
//       />
//       <Stack.Screen
//         name="DisplayTipScreen"
//         component={DisplayTipScreen}
//         options={{
//           title: 'Travel Tip',
//           headerTitleAlign: 'center',
//         }}
//       />
//     </Stack.Navigator>
//   );
// };

const MainStackNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="TipNavigator" component={TipNavigator} />
      <Tab.Screen name="EventNavigator" component={EventNavigator} />
      <Tab.Screen name="DisplayPOIScreen" component={DisplayPOIScreen} />
      <Tab.Screen name="DisplayEventScreen" component={DisplayEventScreen} />
      <Tab.Screen name="DisplayTipScreen" component={DisplayTipScreen} />
      <Tab.Screen name="UserProfileScreen" component={UserProfileScreen} />
    </Tab.Navigator>
  );
};

function App() {
  return (
    <Provider store={store}>
      {/* <SafeAreaView style={styles.safeArea}> */}
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
        <StatusBar style="dark" backgroundColor="white" />
      </NavigationContainer>
      {/* </SafeAreaView> */}
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default App;
