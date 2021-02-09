import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import { Navigation } from '../interfaces/interfaces';
import Colors from '../assets/colors';
import POIImageComponent from '../components/POIImageComponent';
import { getPOIById } from '../store/actions';
import { SystemState, Review } from '../interfaces/reducerInterfaces';
import {
  getAverageRating,
  getAverageSafetyRating,
  getFirstPicture,
} from '../utils/generalFunctions';
import moment from 'moment';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { AirbnbRating } from 'react-native-elements';
import StarRating from 'react-native-star-rating';

const placeHolder = require('../assets/images/camera_icon.jpg');

type RootStackParamList = {
  DisplayPOIScreen: { POIId: string };
};

type DisplayPOIScreenRouteProp = RouteProp<
  RootStackParamList,
  'DisplayPOIScreen'
>;

interface IProps {
  route: DisplayPOIScreenRouteProp;
  navigation: Navigation;
}

const DisplayPOIScreen = ({ route, navigation }: IProps) => {
  const [eventsTab, setEventsTab] = useState(true);
  const { POIId } = route.params;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPOIById(POIId));
  }, [POIId]);

  const POIInfo = useSelector((state: SystemState) => state.POI);

  let POIImage = '';
  if (POIInfo !== undefined) {
    POIImage = getFirstPicture(POIInfo);
  }
  const averageRating = getAverageRating(POIInfo?.reviews);
  const averageSafetyRating = getAverageSafetyRating(POIInfo?.reviews);

  return (
    <View style={styles.container}>
      <POIImageComponent
        formattedAddress={POIInfo.formattedAddress}
        averageRating={averageRating && averageRating}
        averageSafetyRating={averageSafetyRating && averageSafetyRating}
        // POIImage={POIImage ? POIImage : placeHolder}
        POIImage={POIImage}
      />

      {/* Events and Tips buttons */}
      <View style={styles.eventsTipsBtnsContainer}>
        <TouchableOpacity
          style={styles.eventsBtn}
          activeOpacity={0.7}
          onPress={() => setEventsTab(true)}
        >
          <Text style={styles.eventsBtnText}>Events</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tipsBtn}
          activeOpacity={0.7}
          onPress={() => setEventsTab(false)}
        >
          <Text style={styles.tipsBtnText}>Travel Tips</Text>
        </TouchableOpacity>
      </View>

      {/* Event or Tips LIST section */}
      <ScrollView
        style={
          eventsTab ? styles.eventsListContainer : styles.tipsListContainer
        }
      >
        {eventsTab
          ? POIInfo.events.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('DisplayEventScreen', {
                    eventId: POIInfo.events[index].eventId,
                    pointOfInterestId: POIInfo.pointOfInterestId,
                  });
                }}
              >
                <View key={index} style={styles.listItemView}>
                  {POIInfo.events[index].picture !== '' ? (
                    <Image
                      style={styles.imageListItem}
                      source={{ uri: POIInfo.events[index].picture }}
                    />
                  ) : (
                    <Image
                      style={styles.imageListItem}
                      source={require('../assets/images/camera_icon.jpg')}
                    />
                  )}

                  <View>
                    <Text style={styles.eventTitle}>{item.title}</Text>
                    <View style={styles.eventTime}>
                      <MaterialIcons
                        name="date-range"
                        size={20}
                        color="black"
                      />
                      <Text style={{ paddingLeft: 10 }}>
                        {moment(item.dateTo).format('Do MMMM, YYYY')}{' '}
                      </Text>
                    </View>
                    <View style={styles.eventTime}>
                      <AntDesign name="clockcircleo" size={20} color="black" />
                      <Text style={{ paddingLeft: 10 }}>
                        {moment(item.dateTo).format('HH:mm')}{' '}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          : POIInfo.reviews.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.listItemView}
                onPress={() =>
                  navigation.navigate('DisplayTipScreen', {
                    reviewId: POIInfo.reviews[index].reviewId,
                    pointOfInterestId: POIInfo.pointOfInterestId,
                  })
                }
              >
                {POIInfo.reviews[index].picture !== '' ? (
                  <Image
                    style={styles.imageListItem}
                    source={{ uri: POIInfo.reviews[index].picture }}
                  />
                ) : (
                  <Image
                    style={styles.imageListItem}
                    source={require('../assets/images/camera_icon.jpg')}
                  />
                )}
                <View>
                  <Text style={styles.eventTitle}>{item.title}</Text>
                  <View style={{ paddingLeft: 7 }}>
                    <AirbnbRating
                      count={5}
                      defaultRating={item.rating}
                      size={10}
                      isDisabled={true}
                      showRating={false}
                    />
                  </View>
                  <View style={{ paddingLeft: 7 }}>
                    <StarRating
                      disabled={false}
                      starSize={10}
                      starStyle={{ paddingHorizontal: 5 }}
                      emptyStar={'shield-checkmark-outline'}
                      fullStar={'shield-checkmark-sharp'}
                      iconSet={'Ionicons'}
                      maxStars={3}
                      rating={item.safetyRating}
                      fullStarColor={Colors.blue}
                    />
                  </View>
                  <Text numberOfLines={1} style={{ paddingLeft: 10 }}>
                    {item.description}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
      </ScrollView>
    </View>
  );
};

export default DisplayPOIScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 0,
  },

  eventsTipsBtnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  eventsBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.pink,
    height: 50,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  eventsBtnText: {
    fontSize: 20,
  },
  tipsBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blue,
    height: 50,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tipsBtnText: {
    fontSize: 20,
    color: Colors.white,
  },
  eventsListContainer: {
    flex: 1,
    backgroundColor: Colors.pink,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingTop: 10,
  },
  tipsListContainer: {
    flex: 1,
    backgroundColor: Colors.blue,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingTop: 10,
  },
  listItemView: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    padding: 10,
    margin: 15,
    marginTop: 0,
    borderRadius: 10,
  },
  listItemText: {
    paddingHorizontal: 10,
    flexShrink: 1,
  },
  imageListItem: {
    height: 75,
    width: 75,
  },
  eventTime: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 5,
    alignItems: 'center',
  },
  eventTitle: {
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
});
