import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import dayjs from 'dayjs';

var calendar = require('dayjs/plugin/calendar');
dayjs.extend(calendar);

import EventAttendance from '../components/EventAttendanceComponent';
import Colors from '../assets/colors';

import { Event, POI, SystemState, User } from '../interfaces/reducerInterfaces';

import { Navigation } from '../interfaces/interfaces';
import { getEventById, getPOIById } from '../store/actions';

type RootStackParamList = {
  DisplayEventScreen: { eventId: string; pointOfInterestId: string };
};

type DisplayEventScreenRouteProp = RouteProp<
  RootStackParamList,
  'DisplayEventScreen'
>;

interface IProps {
  route: DisplayEventScreenRouteProp;
  navigation: Navigation;
}

const DisplayEventScreen = ({ route, navigation }: IProps) => {
  const { eventId } = route.params;

  const dispatch = useDispatch();

  useEffect(() => {
    const getEvent = async () => {
      await dispatch(getEventById(eventId));
      dispatch(getPOIById(event.pointOfInterestId));
    };
    getEvent();
  }, [eventId]);

  const event: Event = useSelector((state: SystemState) => state.event);
  const POI: POI = useSelector((state: SystemState) => state.POI);
  const user: User = useSelector((state: SystemState) => state.user);

  return (
    <View style={{ flex: 1 }}>
      {event.title !== '' ? (
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.eventTitle}>{event && event.title}</Text>
            <View style={styles.eventTime}>
              <MaterialIcons name="date-range" size={20} color="black" />
              <Text style={{ paddingLeft: 10 }}>
                From: {dayjs(event.dateFrom).format('DD MMMM, YYYY [at] HH:mm')}
              </Text>
            </View>
            <View style={styles.eventTime}>
              {/* <MaterialIcons name="date-range" size={20} color="black" /> */}
              <Text style={{ paddingLeft: 10 }}>
                To: {dayjs(event.dateTo).format('DD MMMM, YYYY [at] HH:mm')}
              </Text>
            </View>

            {/* {event.tags && (
              <View style={styles.tagsContainer}>
                <Text>tag</Text>
                to be replaced by the below once the tags are part of the event 
                 <View style={styles.tagContainer}>
        <FlatList
          horizontal={true}
          data={event.tags}
          renderItem={({ item }) => (
            <View style={styles.tag}>
              <Text style={styles.tagText}>{item}</Text>
            </View>
          )}
          keyExtractor={(item) => item.key}
        />
      </View>
              </View>
            )} */}

            <View style={styles.uploadImageArea}>
              <TouchableOpacity
                style={styles.uploadImageBtn}
                onPress={() => {}}
              >
                <Entypo name="image" size={50} color="black" />
              </TouchableOpacity>
            </View>

            <MapView
              style={styles.uploadImageArea}
              initialRegion={{
                latitude: +POI.latitude,
                longitude: +POI.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  latitude: +POI.latitude,
                  longitude: +POI.longitude,
                }}
                title={event.title}
                description={event.description}
              />
            </MapView>

            <View style={styles.description}>
              <Text style={styles.descriptionText}>{event.description}</Text>
            </View>

            {event.maxCapacity && (
              <View style={styles.capacity}>
                <Text style={styles.capacityText}>
                  Maximum capacity of event: {event.maxCapacity} people
                </Text>
              </View>
            )}

            <EventAttendance event={event} user={user} />
          </ScrollView>
        </View>
      ) : (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={Colors.pink} />
        </View>
      )}
    </View>
  );
};

export default DisplayEventScreen;

const styles = StyleSheet.create({
  eventTitle: {
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: Colors.white,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  tagContainer: {
    paddingVertical: 10,
  },
  tag: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: Colors.pink,
    height: 20,
    width: 'auto',
  },
  tagText: {
    color: Colors.white,
    padding: 10,
    fontSize: 10,
  },
  description: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: Colors.pink,
    height: 'auto',
    width: '100%',
  },
  descriptionText: {
    color: Colors.white,
    padding: 15,
    textAlign: 'justify',
  },
  capacity: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 8,
    // backgroundColor: Colors.pink,
    height: 'auto',
    width: '100%',
  },
  capacityText: {
    // color: Colors.white,
    padding: 15,
    textAlign: 'justify',
  },
  tagsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  uploadImageArea: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.grey,
    padding: 20,
    marginVertical: 20,
    borderRadius: 8,
  },
  uploadImageBtn: {
    flex: 1,
  },
  address: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userStatus: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  userStatusContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
  },
  eventTime: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 5,
    alignItems: 'center',
  },
});
