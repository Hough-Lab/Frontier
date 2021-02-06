import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Navigation } from '../interfaces/interfaces';
import { POI } from '../interfaces/reducerInterfaces';
import MapView, { Marker } from 'react-native-maps';

interface IProps {
  pointOfInterest: any;
  navigation: Navigation;
}

function POIPinpointComponent({ pointOfInterest, navigation }: IProps) {
  console.log(typeof +pointOfInterest.longitude);

  return (
    <Marker
      coordinate={{
        latitude: pointOfInterest.latitude,
        longitude: pointOfInterest.longitude,
      }}
      title={'PostgreSQL Party'}
      // description={'Descriptions go here'}
      onPress={() =>
        navigation.navigate('MainStackNavigator', {
          screen: 'DisplayPOIScreen',
        })
      }
    />
    // <Marker
    //   coordinate={{
    //     latitude: +pointOfInterest.latitude,
    //     longitude: +pointOfInterest.longitude,
    //   }}
    //   title={'PostgreSQL Party'}
    //   // description={'Descriptions go here'}
    //   onPress={() =>
    //     navigation.navigate('MainStackNavigator', {
    //       screen: 'DisplayPOIScreen',
    //     })
    //   }
    // />
  );
}

export default POIPinpointComponent;
