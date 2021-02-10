import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

import { Event, User } from '../interfaces/reducerInterfaces';
import Colors from '../assets/colors';
import {
  markAsInterested,
  undoMarkAsInterested,
  markAsGoing,
  undoMarkAsGoing,
  getEventsInterested,
  getEventsAttending,
} from '../store/actions';

interface IProps {
  event: Event;
  user: User;
}

function EventAttendance({ event, user }: IProps) {
  const dispatch = useDispatch();

  const iconAttendeesColor = () => {
    if (event?.attendees.indexOf(user.userId) !== -1) {
      return Colors.pink;
    } else {
      return Colors.grey;
    }
  };

  const iconInterestedColor = () => {
    if (event?.possibleAttendees?.indexOf(user.userId) !== -1) {
      return Colors.pink;
    } else {
      return Colors.grey;
    }
  };

  const attendEvent = async () => {
    if (event.attendees.indexOf(user.userId) === -1) {
      if (event.possibleAttendees.indexOf(user.userId) !== -1) {
        await dispatch(undoMarkAsInterested(event.eventId));
      }
      await dispatch(markAsGoing(event.eventId));
      dispatch(getEventsAttending());
    } else {
      await dispatch(undoMarkAsGoing(event.eventId));
      dispatch(getEventsAttending());
    }
  };

  const pressMarkAsInterested = async () => {
    if (event.possibleAttendees.indexOf(user.userId) === -1) {
      if (event.attendees.indexOf(user.userId) !== -1) {
        await dispatch(undoMarkAsGoing(event.eventId));
      }
      await dispatch(markAsInterested(event.eventId));
      dispatch(getEventsInterested());
    } else {
      await dispatch(undoMarkAsInterested(event.eventId));
      dispatch(getEventsInterested());
    }
  };

  return (
    <View>
      <ScrollView>
        <View>
          <Text>Going: {event?.attendees?.length}</Text>
        </View>
        <View>
          <Text>Interested: {event?.possibleAttendees?.length}</Text>
        </View>
      </ScrollView>
      <View style={styles.userStatusContainer}>
        <TouchableOpacity
          style={styles.userStatus}
          activeOpacity={0.7}
          onPress={attendEvent}
        >
          <AntDesign name="check" size={24} color={iconAttendeesColor()} />
          {event?.attendees?.indexOf(user.userId) === -1 ? (
            <Text>Sign me up!</Text>
          ) : (
            <Text>I'm going!</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.userStatus}
          activeOpacity={0.7}
          onPress={pressMarkAsInterested}
        >
          <FontAwesome name="star-o" size={24} color={iconInterestedColor()} />

          {event?.possibleAttendees?.indexOf(user.userId) === -1 ? (
            <Text>Mark as interested</Text>
          ) : (
            <Text>I might go...</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userStatus: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  userStatusContainer: {
    marginTop: 20,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
  },
});

export default EventAttendance;
