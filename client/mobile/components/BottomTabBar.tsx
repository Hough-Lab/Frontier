import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { AntDesign, MaterialIcons, Ionicons } from '@expo/vector-icons'; 
import { Colors } from 'react-native/Libraries/NewAppScreen';

const BottomTabBar = () => {
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity>
          <MaterialIcons name="home-filled" size={35} color="black" />
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity style={styles.plusBtn}>
          <AntDesign name="pluscircle" size={50} color="black" />
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity>
          <Ionicons name="person-circle" size={35} color="black" />
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default BottomTabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    padding: 10,
    height: 50, 
  },
  plusBtn: {
    position: 'relative',
    top: -30,
    backgroundColor: Colors.white,
    borderRadius: 50,
  },
});
