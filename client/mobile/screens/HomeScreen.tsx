import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  LogBox,
  Dimensions,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';

import { FontAwesome5 } from '@expo/vector-icons';
import Colors from '../assets/colors';
import { Navigation } from '../interfaces/interfaces';
import SearchBtnComponent from '../components/SearchBtnComponent';

LogBox.ignoreLogs([/MapView/g]);

export interface ISeenOnMap {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const HomeScreen = ({ navigation }: { navigation: Navigation }) => {
  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [seenOnMap, setSeenOnMap] = useState<ISeenOnMap>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0122,
    longitudeDelta:
      (Dimensions.get('window').width / Dimensions.get('window').height) *
      0.0122,
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setLoading] = useState<boolean>(true);

  const recenter = () => {
    setSeenOnMap({
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      latitudeDelta: 0.0122,
      longitudeDelta:
        (Dimensions.get('window').width / Dimensions.get('window').height) *
        0.0122,
    });
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      Location.getCurrentPositionAsync({})
        .then((location) => {
          setSeenOnMap((seenOnMap: ISeenOnMap) => {
            return {
              ...seenOnMap,
              latitude: location?.coords.latitude,
              longitude: location?.coords.longitude,
            };
          });
          setUserLocation((userLocation) => {
            return {
              ...userLocation,
              latitude: location?.coords.latitude,
              longitude: location?.coords.longitude,
            };
          });
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    })();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={Colors.pink} size="large" />
        </View>
      ) : (
        <MapView
          style={{ flex: 1 }}
          showsMyLocationButton={false}
          showsUserLocation={true}
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.0122,
            longitudeDelta:
              (Dimensions.get('window').width /
                Dimensions.get('window').height) *
              0.0122,
          }}
          region={seenOnMap}
        >
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title={'PostgreSQL Party'}
            // description={'Descriptions go here'}
            onPress={() =>
              navigation.navigate('MainStackNavigator', {
                screen: 'DisplayPOIScreen',
              })
            }
          />
          <Marker
            coordinate={{
              latitude: userLocation.latitude + 0.005,
              longitude: userLocation.longitude + 0.002,
            }}
            title={'Event'}
            // description={'Descriptions go here'}
            pinColor={Colors.blue}
            onPress={() =>
              navigation.navigate('EventNavigator', {
                screen: 'DisplayEventScreen',
              })
            }
          />
          <Marker
            coordinate={{
              latitude: userLocation.latitude - 0.003,
              longitude: userLocation.longitude - 0.002,
            }}
            title={'Tip'}
            // description={'Descriptions go here'}
            pinColor="wheat"
            onPress={() =>
              navigation.navigate('TipNavigator', {
                screen: 'DisplayTipScreen',
              })
            }
          />
        </MapView>
      )}

      <View style={styles.recenterBtn}>
        <TouchableOpacity onPress={recenter}>
          <FontAwesome5 name="location-arrow" size={24} color={Colors.blue} />
        </TouchableOpacity>
      </View>

      <SearchBtnComponent setSeenOnMap={setSeenOnMap} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
