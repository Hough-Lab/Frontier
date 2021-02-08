import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Entypo, Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';

import Colors from '../assets/colors';

const EventPopupComponent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleBarView}>
        <Text style={styles.title}>Event Title</Text>
        <TouchableOpacity>
          <Entypo name="cross" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Image
        style={styles.image}
        resizeMode="cover"
        source={require('../assets/images/placeholderProfile.jpeg')}
      />

      <View style={styles.locationView}>
        <Entypo name="location-pin" size={24} color="black" />
        <Text style={styles.locationText}>1 Holborn, London, UK</Text>
      </View>

      {/* Boxes Section */}
      <View style={styles.contentArea}>
        <View style={styles.box}>
          <Ionicons name="md-people-sharp" size={24} color="black" />
          <Text>40</Text>
        </View>
        <View style={styles.box}>
          <MaterialIcons name="date-range" size={24} color="black" />
          <Text>19/02/2021</Text>
        </View>
        <View style={styles.box}>
          <AntDesign name="clockcircleo" size={24} color="black" />
          <Text>9:00 AM</Text>
        </View>
        <View style={styles.box}>
          <Ionicons name="md-people-sharp" size={24} color="black" />
          <Text>40</Text>
        </View>
      </View>
    </View>
  );
};

export default EventPopupComponent;

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 'auto',
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 5,
  },
  titleBarView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  image: {
    flex: 1,
    height: 100,
  },
  locationView: {
    flexDirection: 'row',
  },
  locationText: {
    fontWeight: 'bold',
  },
  contentArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    width: 60,
    height: 60,
    // borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.grey,
  },
});
