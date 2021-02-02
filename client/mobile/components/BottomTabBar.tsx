import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { AntDesign, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Navigation } from '../interfaces/interfaces';

const BottomTabBar = ({ navigation }: { navigation: Navigation }) => {
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('MainStackNavigator', {
              screen: 'HomeScreen',
            })
          }
        >
          <MaterialIcons name="home-filled" size={35} color="black" />
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          style={styles.plusBtn}
          onPress={() =>
            navigation.navigate('TipNavigator', {
              screen: 'CreateTipScreen',
            })
          }
        >
          <AntDesign name="pluscircle" size={50} color="black" />
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('MainStackNavigator', {
              screen: 'EventNavigator',
            })
          }
        >
          <Ionicons name="person-circle" size={35} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
