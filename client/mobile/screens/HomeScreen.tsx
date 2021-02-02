import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

import { FontAwesome5 } from '@expo/vector-icons'; 
import Colors from '../assets/colors';

const HomeScreen = () => {
  return (
    <View style={styles.container}>

      <View style={styles.recenterBtn}>
        <TouchableOpacity>
          <FontAwesome5 name="location-arrow" size={24} color={Colors.blue} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBtn}>
        <TouchableOpacity>
        <Ionicons name="search" size={30} color={Colors.green} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey'
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
  },
  searchBtn: {
    position: 'absolute',
    right: 10,
    top: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: Colors.white,
    width: 45,
    height: 45,
  },
});
