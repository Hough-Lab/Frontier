import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  FlatList,
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
    <ScrollView style={styles.container}>
      {event.title !== '' ? (
        <View style={{ flex: 1 }}>
          <Text style={styles.eventTitle}>{event && event.title}</Text>
          <View style={styles.eventTime}>
            <MaterialIcons name="date-range" size={20} color="black" />
            <Text style={{ paddingLeft: 10, fontWeight: 'bold' }}>
              From: {dayjs(event.dateFrom).format('DD MMMM, YYYY [at] HH:mm')}
            </Text>
          </View>
          <View style={styles.eventTime}>
            {/* <MaterialIcons name="date-range" size={20} color="black" /> */}
            <Text
              style={{ paddingLeft: 30, paddingBottom: 10, fontWeight: 'bold' }}
            >
              To: {dayjs(event.dateTo).format('DD MMMM, YYYY [at] HH:mm')}
            </Text>
          </View>

          {event.tags && (
            <View style={styles.tagContainer}>
              {/* <Text>tags</Text> */}
              <FlatList
                horizontal={true}
                data={event.tags}
                renderItem={({ item, index }) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{item}</Text>
                  </View>
                )}
                keyExtractor={(item) => item}
              />
            </View>
          )}

          {event?.picture ? (
            <Image
              source={{ uri: event.picture }}
              style={styles.upLoadedPicture}
            />
          ) : (
            <View style={styles.uploadImageArea}>
              <TouchableOpacity
                style={styles.uploadImageBtn}
                onPress={() => {}}
              >
                <Entypo name="image" size={50} color="black" />
              </TouchableOpacity>
            </View>
          )}

          <MapView
            style={styles.uploadImageArea}
            initialRegion={{
              latitude: +POI.latitude,
              longitude: +POI.longitude,
              latitudeDelta: 0.0122,
              longitudeDelta:
                (Dimensions.get('window').width /
                  Dimensions.get('window').height) *
                0.0122,
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

          <Text style={styles.descriptionTitle}>Event Description:</Text>
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
        </View>
      ) : (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={Colors.pink} />
        </View>
      )}
    </ScrollView>
  );
};

export default DisplayEventScreen;

const styles = StyleSheet.create({
  eventTitle: {
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 5,
    fontSize: 30,
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
  descriptionTitle: {
    paddingBottom: 5,
    fontWeight: 'bold',
  },
  tag: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    backgroundColor: Colors.pink,
    height: 20,
    width: 'auto',
    marginRight: 5,
  },
  tagText: {
    color: Colors.white,
    padding: 10,
    fontSize: 10,
  },
  tagLine: {
    color: Colors.white,
    fontSize: 10,
  },
  description: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderColor: Colors.blue,
    borderWidth: 1,
    elevation: 1,
    backgroundColor: 'white',
    height: 'auto',
    width: '100%',
  },
  descriptionText: {
    color: 'black',
    padding: 15,
    textAlign: 'justify',
  },
  capacity: {
    flexDirection: 'row',
    // alignItems: 'center',
    height: 'auto',
    width: '100%',
  },
  capacityText: {
    paddingVertical: 15,
    fontWeight: 'bold',
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
    // padding: 20,
    marginBottom: 20,
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
  upLoadedPicture: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 20,
    marginVertical: 20,
    borderRadius: 8,
  },
});
