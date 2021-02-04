import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  UIManager,
  Platform,
} from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';

import Colors from '../assets/colors';
import { applyAnimation } from '../utils/generalFunctions';
import GooglePlacesInput from './GooglePlacesInput';

const SearchBtnComponent = () => {
  const [searchBar, setSearchBar] = useState(false);
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
          {/* <TextInput placeholder="Search..." /> */}
          <GooglePlacesInput />
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
    borderRadius: 30,
    backgroundColor: Colors.white,
    width: '80%',
  },
});
