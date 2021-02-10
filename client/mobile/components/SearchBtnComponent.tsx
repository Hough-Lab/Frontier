import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  UIManager,
  Platform,
  Text,
} from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';

import Colors from '../assets/colors';
import { applyAnimation } from '../utils/generalFunctions';
import GooglePlacesInput from './GooglePlacesInput';
import { ISeenOnMap } from '../screens/HomeScreen';

interface IProps {
  setSeenOnMap: Dispatch<SetStateAction<ISeenOnMap>>;
}

const SearchBtnComponent = ({ setSeenOnMap }: IProps) => {
  const [searchBar, setSearchBar] = useState(false);

  const getLocation = (_: string, latitude: number, longitude: number) => {
    setSeenOnMap((seenOnMap) => {
      return {
        ...seenOnMap,
        latitude: latitude,
        longitude: longitude,
      };
    });
  };

  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  return (
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
          <GooglePlacesInput getLocation={getLocation} />
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
  );
};

export default SearchBtnComponent;

const styles = StyleSheet.create({
  searchBtn: {
    position: 'absolute',
    right: 10,
    top: 45,
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
    top: 45,
    borderRadius: 30,
    backgroundColor: Colors.white,
    width: '80%',
    elevation: 5,
  },
});
