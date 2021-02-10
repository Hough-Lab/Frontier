import React, { useState, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  LogBox,
  Dimensions,
  Animated,
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import LottieView from 'lottie-react-native';

import Colors from '../assets/colors';
import { Navigation } from '../interfaces/interfaces';
import SearchBtnComponent from '../components/SearchBtnComponent';
import EventPopupComponent from '../components/EventPopupComponent';
import { POI, POIArray, SystemState } from '../interfaces/reducerInterfaces';
import SearchTagComponent from '../components/SearchTagComponent';
import { filterPOIByTag } from '../utils/generalFunctions';
import { getPOIById } from '../store/actions';
import { applyAnimation } from '../utils/generalFunctions';

LogBox.ignoreLogs([/MapView/g]);

export interface ISeenOnMap {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const HomeScreen = ({ navigation }: { navigation: Navigation }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [filteredPOI, setFilteredPOI] = useState<POI[]>([]);

  const allPOI: POI[] = useSelector((state: SystemState) => state.allPOI);
    
  const dispatch = useDispatch();

  const [userLocation, setUserLocation] = useState({
    latitude: 51.507351,
    longitude: -0.127758,
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
      await setFilteredPOI(filterPOIByTag(allPOI, tags));

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
          <LottieView
            style={{ width: '100%' }}
            source={require('../assets/JSON/spinner.json')}
            autoPlay
            loop
          />
          {/* <ActivityIndicator color={Colors.pink} size="large" /> */}
        </View>
      ) : (
        <>
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
            {allPOI?.length > 0 &&
              allPOI?.map((POI: POI) => {
                return (
                  <Marker
                    key={POI.pointOfInterestId}
                    coordinate={{
                      latitude: +POI?.latitude,
                      longitude: +POI?.longitude,
                    }}
                    title={'PostgreSQL Party'}
                    // description={'Descriptions go here'}
                    onPress={() => {
                      dispatch(getPOIById(POI.pointOfInterestId));
                    }}
                  >
                    <Callout
                      tooltip={true}
                      onPress={() => {
                        navigation.navigate('DisplayPOIScreen', {
                          POIId: POI.pointOfInterestId,
                        });
                      }}
                    >
                      <EventPopupComponent POI={POI} />
                    </Callout>
                  </Marker>
                );
              })}
          </MapView>
        </>
      )}

      <View style={styles.recenterBtn}>
        <TouchableOpacity onPress={recenter}>
          <FontAwesome5 name="location-arrow" size={24} color={Colors.blue} />
        </TouchableOpacity>
      </View>

      <SearchBtnComponent setSeenOnMap={setSeenOnMap} />
      <SearchTagComponent setTags={setTags} tags={tags} />
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
    backgroundColor: Colors.white,
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
