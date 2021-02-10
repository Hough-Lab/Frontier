import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import moment from 'moment';
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

import Colors from '../assets/colors';
import { Event } from '../interfaces/reducerInterfaces';
import { Navigation } from '../interfaces/interfaces';

const EventCardCarouselComponent = ({
  eventsAttending,
  navigation,
}: {
  eventsAttending: Event;
  navigation: Navigation;
}) => {
  return (
    <View>
      <FlatList
        horizontal={true}
        data={eventsAttending}
        keyExtractor={({ eventId }, index) => eventId}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('DisplayEventScreen', {
                eventId: item.eventId,
                pointOfInterestId: item.pointOfInterestId,
              });
            }}
          >
            <View style={styles.listItemView}>
              {item.picture !== '' ? (
                <Image
                  style={styles.imageListItem}
                  source={{ uri: item.picture }}
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
                    size={15}
                    color="black"
                    style={{ paddingRight: 10 }}
                  />
                  <Text style={{ fontSize: 12 }}>
                    {moment(item.dateTo).format('Do MMMM, YYYY')}{' '}
                  </Text>
                </View>
                <View style={styles.eventTime}>
                  <AntDesign
                    name="clockcircleo"
                    size={15}
                    style={{ paddingRight: 10 }}
                    color="black"
                  />
                  <Text style={{ fontSize: 12 }}>
                    {moment(item.dateTo).format('HH:mm')}{' '}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default EventCardCarouselComponent;

const styles = StyleSheet.create({
  listItemView: {
    backgroundColor: Colors.white,
    elevation: 5,
    alignItems: 'center',
    padding: 10,
    borderColor: Colors.green,
    borderWidth: 1,
    marginVertical: 15,
    marginRight: 15,
    borderRadius: 8,
  },
  listItemText: {
    paddingHorizontal: 10,
    flexShrink: 1,
  },
  imageListItem: {
    height: 75,
    width: '100%',
    borderRadius: 3,
  },
  eventTime: {
    flexDirection: 'row',
    paddingTop: 5,
    alignItems: 'center',
  },
  eventTitle: {
    paddingTop: 5,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
