import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { AntDesign, Entypo, Ionicons, FontAwesome } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import dayjs from 'dayjs';

import Colors from '../assets/colors';
import { Event, SystemState } from '../interfaces/reducerInterfaces';
import { Navigation } from '../interfaces/interfaces';
import { getEventById } from '../store/actions';

type RootStackParamList = {
  DisplayEventScreen: { eventId: string };
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
    dispatch(getEventById(eventId));
  }, [eventId]);

  const event: Event = useSelector((state: SystemState) => state.event);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text>{dayjs(event.dateFrom).format('DD-MM-YYYY HH:mm')}</Text>
        {event.tags && (
          <View style={styles.tagsContainer}>
            <Text>tag</Text>
            {/* to be replaced by the below once the tags are part of the event */}
            {/* <View style={styles.tagContainer}>
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
      </View> */}
          </View>
        )}

        <View style={styles.uploadImageArea}>
          <TouchableOpacity style={styles.uploadImageBtn} onPress={() => {}}>
            <Entypo name="image" size={50} color="black" />
          </TouchableOpacity>
        </View>

        <MapView
          style={styles.uploadImageArea}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: 37.78825,
              longitude: -122.4324,
            }}
            title={'A place'}
            description={'Descriptions go here'}
          />
        </MapView>

        <View style={styles.description}>
          <Text style={styles.descriptionText}>{event.description}</Text>
        </View>

        <View style={styles.capacity}>
          <Text style={styles.capacityText}>{event.eventId}</Text>
          <Text style={styles.capacityText}>{event.maxCapacity}</Text>
        </View>

        <View>
          <Text>Going</Text>
          <Text>Interested</Text>
        </View>
      </ScrollView>

      <View style={styles.userStatusContainer}>
        <TouchableOpacity style={styles.userStatus} activeOpacity={0.7}>
          <AntDesign name="check" size={24} color={Colors.pink} />
          <Text>I'm going!</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.userStatus} activeOpacity={0.7}>
          <FontAwesome name="star-o" size={24} color={Colors.grey} />
          <Text>I'm interested</Text>
        </TouchableOpacity>
      </View>
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
});
