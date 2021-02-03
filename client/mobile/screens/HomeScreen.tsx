import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';

import { FontAwesome5, Entypo } from '@expo/vector-icons';
import Colors from '../assets/colors';
import { Navigation } from '../interfaces/interfaces';

const HomeScreen = ({ navigation }: { navigation: Navigation }) => {
  const [searchBar, setSearchBar] = useState(false);

  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  function applyAnimation() {
    LayoutAnimation.configureNext({
      duration: 700,
      create: { type: 'easeOut', property: 'scaleXY' },
      update: { type: 'spring', springDamping: 10 },
      delete: { type: 'easeOut', property: 'scaleXY' },
    });
  }

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

      <View style={searchBar ? styles.searchBarView : styles.searchBtn}>
        {!searchBar ? (
          <TouchableOpacity
            onPress={() => {
              setSearchBar(true);
              applyAnimation();
            }}
          >
            <Ionicons name="search" size={30} color={Colors.green} />
          </TouchableOpacity>
        ) : (
          <>
            <TextInput placeholder="Search..." />
            <TouchableOpacity
              onPress={() => {
                setSearchBar(false);
                applyAnimation();
              }}
            >
              <Entypo name="cross" size={24} color="black" />
            </TouchableOpacity>
          </>
        )}
      </View>
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
  searchBtn: {
    position: 'absolute',
    right: 10,
    top: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: Colors.white,
    width: 45,
    height: 45,
    elevation: 5,
  },
  searchBarView: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 10,
    right: 40,
    top: 30,
    borderRadius: 50,
    backgroundColor: Colors.white,
    width: '80%',
    height: 45,
    elevation: 5,
  },
});
