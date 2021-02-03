import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { FontAwesome5 } from '@expo/vector-icons';
import Colors from '../assets/colors';
import { Navigation } from '../interfaces/interfaces';
import SearchBtnComponent from '../components/SearchBtnComponent';

const HomeScreen = ({ navigation }: { navigation: Navigation }) => {
  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title={'A place'}
          description={'Descriptions go here'}
          onPress={() =>
            navigation.navigate('MainStackNavigator', {
              screen: 'DisplayPOIScreen',
            })
          }
        />
      </MapView>

      <View style={styles.recenterBtn}>
        <TouchableOpacity>
          <FontAwesome5 name="location-arrow" size={24} color={Colors.blue} />
        </TouchableOpacity>
      </View>

      <SearchBtnComponent />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  recenterBtn: {
    position: 'absolute',
    right: 10,
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 50,
    width: 45,
    height: 45,
    elevation: 5,
  },
});
