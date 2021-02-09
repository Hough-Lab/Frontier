import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Entypo, Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../assets/colors';
import { POI, SystemState } from '../interfaces/reducerInterfaces';
import { getPOIById } from '../store/actions';
import {
  getAverageRating,
  getAverageSafetyRating,
} from '../utils/generalFunctions';

const EventPopupComponent = ({ POI }: { POI: POI }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPOIById(POI.pointOfInterestId));
  }, [POI.pointOfInterestId]);

  const POIInfo = useSelector((state: SystemState) => state.POI);

  const eventsArr = POIInfo.events;
  const averageRating = getAverageRating(POIInfo?.reviews);
  const averageSafetyRating = getAverageSafetyRating(POIInfo?.reviews);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="cover"
        source={require('../assets/images/placeholderProfile.jpeg')}
      />

      <View style={styles.locationView}>
        <Entypo name="location-pin" size={24} color="black" />
        <Text style={styles.locationText}>{POI.formattedAddress}</Text>
      </View>

      {/* Boxes Section */}
      <View style={styles.contentArea}>
        <View style={styles.box}>
          <MaterialIcons name="date-range" size={24} color="black" />
          <Text>
            {console.log('POIInfo', POIInfo.events.length)}
            {POIInfo.events.length} Event
          </Text>
        </View>
        <View style={styles.box}>
          <AntDesign name="clockcircleo" size={24} color="black" />
          <Text>9:00 AM</Text>
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
    alignItems: 'center',
  },
  locationText: {
    fontWeight: 'bold',
  },
  contentArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    flex: 1,
    height: 60,
    margin: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.grey,
  },
});
