import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Entypo, MaterialIcons, Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import StarRating from 'react-native-star-rating';
import { AirbnbRating } from 'react-native-ratings';

import Colors from '../assets/colors';
import { POI, SystemState } from '../interfaces/reducerInterfaces';
import { getPOIById } from '../store/actions';
import {
  getAverageRating,
  getAverageSafetyRating,
} from '../utils/generalFunctions';

const EventPopupComponent = ({ POI }: { POI: POI }) => {
  const dispatch = useDispatch();
  const eventsCount: number = POI.events ? POI.events.length : 0;
  const reviewsCount: number = POI.reviews ? POI.reviews.length : 0;

  useEffect(() => {
    dispatch(getPOIById(POI.pointOfInterestId));
  }, [POI.pointOfInterestId]);

  const selectedImage = require('../assets/images/placeholderImage2.jpg');
  const averageRating = POI?.reviews && getAverageRating(POI?.reviews);
  const averageSafetyRating =
    POI?.reviews && getAverageSafetyRating(POI?.reviews);

  return (
    <View style={styles.container}>
      <Text>
        <Image
          style={styles.image}
          resizeMode={'cover'}
          source={selectedImage}
        />
      </Text>

      <View style={styles.midContentContainer}>
        <View style={styles.locationView}>
          <Entypo name="location-pin" size={24} color="black" />
          <Text style={styles.locationText}>{POI.formattedAddress}</Text>
        </View>

        <View style={styles.ratingsView}>
          <AirbnbRating
            count={5}
            defaultRating={averageRating}
            size={20}
            isDisabled={true}
            showRating={false}
          />
          <StarRating
            disabled={false}
            starSize={30}
            starStyle={{ paddingHorizontal: 3 }}
            emptyStar={'shield-checkmark-outline'}
            fullStar={'shield-checkmark-sharp'}
            iconSet={'Ionicons'}
            maxStars={3}
            rating={averageSafetyRating}
            fullStarColor={Colors.blue}
          />
        </View>

        {/* Boxes Section */}
        <View style={styles.contentArea}>
          <View style={styles.box}>
            <MaterialIcons name="date-range" size={24} color="white" />
            <Text style={{ color: Colors.white }}>
              {`${eventsCount} Event${eventsCount > 1 ? 's' : ''}`}
            </Text>
          </View>
          <View style={styles.box}>
            <Feather name="star" size={24} color="white" />
            <Text style={{ color: Colors.white }}>
              {`${reviewsCount} Review${reviewsCount > 1 ? 's' : ''}`}
            </Text>
          </View>
        </View>
      </View>

      {/* Bottom pointer pointing to marker */}
      <View style={styles.pointer}></View>
    </View>
  );
};

export default EventPopupComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 300,
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
  },
  midContentContainer: {
    padding: 10,
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
    height: 100,
    width: 300,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  ratingsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    backgroundColor: Colors.blue,
    elevation: 5,
  },
  pointer: {
    position: 'absolute',
    bottom: -10,
    left: 140,
    width: 20,
    height: 20,
    backgroundColor: Colors.white,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
    transform: [{ rotateZ: '45deg' }],
  },
});
