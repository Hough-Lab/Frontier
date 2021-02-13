import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Image,
  TouchableOpacity,
  Platform,
  UIManager,
  FlatList,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useDispatch } from 'react-redux';

import { User, SystemState, Event } from '../interfaces/reducerInterfaces';
import { Navigation } from '../interfaces/interfaces';
import { applyAnimation } from '../utils/generalFunctions';
import Colors from '../assets/colors';
import { countriesList, languagesList } from '../assets/countries';
import DateTimePickerComponent from '../components/DateTimePickerComponent';
import EventCardCarouselComponent from '../components/EventCardCarouselComponent';
import {
  getEventsAttending,
  getEventsInterested,
  logoutUser,
} from '../store/actions';
import dayjs from 'dayjs';

var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const UserProfileScreen = ({ navigation }: { navigation: Navigation }) => {
  useEffect(() => {
    dispatch(getEventsAttending());
    dispatch(getEventsInterested());
  }, [navigation]);

  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  applyAnimation('scaleY');

  const user: User = useSelector((state: SystemState) => state.user);
  const eventsAttending: Event[] = useSelector(
    (state: SystemState) => state.eventsAttending,
  );
  const eventInterested: Event[] = useSelector(
    (state: SystemState) => state.eventsInterested,
  );

  if (eventsAttending.length > 0) {
    eventsAttending.sort((a: Event, b: Event) => {
      return +new Date(a.dateFrom) - +new Date(b.dateFrom);
    });
  }

  if (eventsAttending.length > 0) {
    eventInterested.sort((a: Event, b: Event) => {
      return +new Date(a.dateFrom) - +new Date(b.dateFrom);
    });
  }

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [country, setCountry] = useState<string>(user.from);
  const [inputValues, setInputValues] = useState({
    userId: user.userId,
    isBusiness: user.isBusiness,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    dateOfBirth: user.dateOfBirth,
    language: user.language,
    from: user.from,
    lastSeen: user.lastSeen,
    profilePicture: user.profilePicture,
    email: user.email,
    verifications: user.verifications,
    certified: user.certified,
  });
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => {
          dispatch(logoutUser(navigation));
        }}
      >
        <AntDesign name="logout" size={24} color={Colors.pink} />
        <Text style={{ fontSize: 10, color: Colors.pink }}>logout</Text>
      </TouchableOpacity>

      {!isEditMode ? (
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => setIsEditMode(true)}
        >
          <FontAwesome5 name="user-edit" size={22} color={Colors.blue} />
          <Text style={{ fontSize: 10, color: Colors.blue }}>edit</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.editView}>
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              style={{ ...styles.textInput, marginRight: 20 }}
              placeholder="First Name"
              value={user.firstName}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Last Name"
              value={user.lastName}
            />
          </View>
          <View style={{ flexDirection: 'row', paddingTop: 15 }}>
            <Text
              style={{
                ...styles.textInput,
                borderBottomWidth: 0,
                fontWeight: 'bold',
                color: 'black',
                paddingRight: 10,
              }}
            >
              DOB:
            </Text>
            <Text
              style={{
                ...styles.textInput,
                borderBottomWidth: 0,
                color: 'black',
              }}
            >
              {dayjs(inputValues.dateOfBirth).format('DD.MM.YYYY ')}
            </Text>
            <DateTimePickerComponent
              setDate={(selectedDate: string) =>
                setInputValues({ ...inputValues, dateOfBirth: selectedDate })
              }
            />
          </View>
          <Picker
            selectedValue={user.from}
            style={{ height: 50, width: '70%' }}
            onValueChange={(itemValue: string | number, itemIndex: number) =>
              setCountry(itemValue)
            }
          >
            {countriesList.map((country: string, index: number) => (
              <Picker.Item label={country} value={country} key={index} />
            ))}
          </Picker>

          <TouchableOpacity
            style={styles.changesBtn}
            onPress={() => setIsEditMode(false)}
          >
            <Text style={{ color: 'white', paddingHorizontal: 10 }}>
              Apply changes
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.profilePicContainer}>
        <Image
          style={styles.profilePic}
          source={{ uri: user && user.profilePicture }}
        />
      </View>
      <ScrollView>
        <View style={styles.nameView}>
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.name}>{user.firstName}</Text>
              <Text style={styles.name}> {user.lastName}</Text>
            </View>

            <Text style={{ color: 'black', fontSize: 12 }}>
              {'joined ' +
                dayjs(user.createdAt).month(0).from(dayjs().month(0))}
            </Text>
          </View>
          <Text>
            {user.from && (
              <View style={styles.languages}>
                <Image
                  style={{ width: 20, height: 20, zIndex: 100 }}
                  source={require('../assets/images/MarkerBlue1.png')}
                />
                <Text style={{ color: 'black', paddingTop: 5 }}>
                  {'From ' + user.from}
                </Text>
              </View>
            )}
          </Text>

          <Text>
            {user.dateOfBirth && (
              <View style={styles.languages}>
                <Text
                  style={{
                    fontWeight: 'normal',
                    fontSize: 15,
                  }}
                >
                  {user.dateOfBirth &&
                    dayjs().from(dayjs(user.dateOfBirth), true)}{' '}
                  old
                </Text>
              </View>
            )}
          </Text>
          <Text>
            {user.userTags && (
              <View style={styles.languages}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    paddingRight: 10,
                    paddingVertical: 5,
                  }}
                >
                  bio:
                </Text>
                <FlatList
                  horizontal={true}
                  data={user.userTags}
                  renderItem={({ item, index }) => (
                    <View
                      key={index}
                      style={{ ...styles.tag, backgroundColor: Colors.pink }}
                    >
                      <Text style={styles.tagText}>{item}</Text>
                    </View>
                  )}
                  keyExtractor={(item) => item}
                />
              </View>
            )}

            {user.language && (
              <View style={styles.languages}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    paddingRight: 10,
                    paddingVertical: 5,
                  }}
                >
                  languages spoken:
                </Text>
                <FlatList
                  horizontal={true}
                  data={user.language}
                  renderItem={({ item, index }) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>{item}</Text>
                    </View>
                  )}
                  keyExtractor={(item) => item}
                />
              </View>
            )}
          </Text>
        </View>

        {/* Upcoming events section */}
        <View style={styles.eventsContainer}>
          {eventsAttending && (
            <View>
              <Text style={styles.eventTitle}>Upcoming events: </Text>
              <EventCardCarouselComponent
                navigation={navigation}
                eventsAttending={eventsAttending}
              />
            </View>
          )}
          {eventInterested && (
            <View>
              <Text style={styles.eventTitle}>
                Events you are interested in:
              </Text>
              <EventCardCarouselComponent
                navigation={navigation}
                eventsAttending={eventInterested}
              />
            </View>
          )}
        </View>

        {/* Log out Button */}
        {/* <Button
        title="Log out"
        color={Colors.pink}
        onPress={() => {
          dispatch(logoutUser(navigation));
        }}
      /> */}
      </ScrollView>
    </View>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  eventsContainer: {
    paddingTop: 30,
  },
  profilePicContainer: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 75,
    paddingBottom: 15,
  },
  profilePic: {
    height: 150,
    width: 150,
    borderRadius: 75,
    borderWidth: 10,
    borderColor: Colors.lightBlue,
  },
  nameView: {
    backgroundColor: Colors.grey,
    elevation: 3,
    borderColor: Colors.green,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.green,
    paddingBottom: 5,
  },
  regularText: {
    fontSize: 16,
    color: 'black',
    paddingTop: 5,
  },
  editView: {
    padding: 20,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    elevation: 10,
  },
  textInput: {
    borderBottomWidth: 1,
    fontSize: 20,
    textAlign: 'center',
    color: Colors.blue,
    marginBottom: 10,
  },
  datePicker: {
    flexDirection: 'row',
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePickerLabel: {
    color: Colors.blue,
    fontWeight: 'bold',
  },
  datePickerText: {
    color: 'black',
    paddingHorizontal: 5,
  },
  logoutBtn: {
    position: 'absolute',
    top: 50,
    right: 30,
    alignItems: 'center',
  },
  editBtn: {
    position: 'absolute',
    top: 180,
    right: 115,
    alignItems: 'center',
  },
  changesBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: Colors.blue,
    height: 30,
    width: 'auto',
  },
  tag: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    backgroundColor: Colors.blue,
    height: 20,
    width: 'auto',
    marginRight: 5,
  },
  tagText: {
    color: Colors.white,
    padding: 10,
    fontSize: 10,
  },
  languages: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 10,
  },
  eventTitle: {
    paddingVertical: 10,
    fontWeight: 'bold',
  },
});
