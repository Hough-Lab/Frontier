import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Switch,
  Platform,
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { connect, useDispatch } from 'react-redux';
import moment from 'moment';

import { createEvent } from '../store/actions';
import { Navigation } from '../interfaces/interfaces';
import Colors from '../assets/colors';
import UploadImageComponent from '../components/UploadImageComponent';
import TagsInsertComponent from '../components/TagsInsertComponent';
import GooglePlacesInput from '../components/GooglePlacesInput';
import dayjs from 'dayjs';
import DateTimePickerComponent from '../components/DateTimePickerComponent';

const CreateEventScreen = ({ navigation }: { navigation: Navigation }) => {
  const [inputValues, setInputValues] = useState({
    title: '',
    formattedAddress: '',
    latitude: 0,
    longitude: 0,
    dateFrom: new Date(Date.now()).toString(),
    dateTo: new Date(Date.now()).toString(),
    description: 'This is a temporary description.',
    maxCapacity: 10,
    isPrivate: false,
    picture: "new File(['foo'], 'foo.jpg')",
    tags: [''],
  });

  const getLocation = (
    formattedAddress: string,
    latitude: number,
    longitude: number,
  ) => {
    setInputValues({
      ...inputValues,
      formattedAddress: formattedAddress,
      latitude: latitude,
      longitude: longitude,
    });
  };

  const getTags = (tags: string[]) => {
    setInputValues({
      ...inputValues,
      tags: tags,
    });
  };

  const [isDatePickerShow, setIsDatePickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const [isDateSelected, setIsDateSelected] = useState(false);

  const [time, setTime] = useState(new Date(Date.now()));
  const [isTimeSelected, setIsTimeSelected] = useState(false);
  const [isTimePickerShow, setIsTimePickerShow] = useState(false);

  const showDatePicker = () => {
    setIsDatePickerShow(true);
  };

  const showTimePicker = () => {
    setIsTimePickerShow(true);
  };

  const onChangeDate = (selectedDate: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    if (Platform.OS === 'android') {
      setIsDatePickerShow(false);
    }
    setIsDateSelected(true);
  };

  const onChangeTime = (selectedTime: any) => {
    const currentTime = selectedTime || time;
    setTime(currentTime);
    if (Platform.OS === 'android') {
      setIsTimePickerShow(false);
    }
    setIsTimeSelected(true);
  };

  const dispatch = useDispatch();

  const handleSubmit = useCallback(() => {
    console.log(inputValues);
    dispatch(
      createEvent(
        inputValues.title,
        inputValues.formattedAddress,
        inputValues.latitude,
        inputValues.longitude,
        inputValues.dateFrom,
        inputValues.dateTo,
        inputValues.description,
        inputValues.maxCapacity,
        inputValues.isPrivate,
        inputValues.picture,
        inputValues.tags,
        navigation,
      ),
    );
  }, [inputValues]);

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
      <UploadImageComponent />
      <TagsInsertComponent getTags={getTags} />

      {/* Event title and location*/}
      <View style={styles.eventTitleView}>
        {/* <MaterialIcons name="event" size={24} color="black" /> */}
        <View style={styles.inputView}>
          <TextInput
            placeholder="Title"
            value={inputValues.title}
            onChangeText={(text) =>
              setInputValues({ ...inputValues, title: text })
            }
          />
        </View>
      </View>

      {/* Date From section */}
      <View style={styles.datePicker}>
        <Text style={styles.datePickerLabel}>FROM: </Text>
        <Text style={styles.datePickerText}>
          {moment(inputValues.dateFrom).format('Do MMMM, YYYY [at] HH:mm')}
        </Text>
        <DateTimePickerComponent
          setDate={(selectedDate: string) =>
            setInputValues({ ...inputValues, dateFrom: selectedDate })
          }
        />
      </View>

      {/* Date To section */}
      <View style={styles.datePicker}>
        <Text style={styles.datePickerLabel}>TO: </Text>
        <Text style={styles.datePickerText}>
          {moment(inputValues.dateTo).format('Do MMMM, YYYY [at] HH:mm')}
        </Text>
        <DateTimePickerComponent
          setDate={(selectedDate: string) =>
            setInputValues({ ...inputValues, dateTo: selectedDate })
          }
        />
      </View>

      <View style={styles.eventTitleView}>
        <Ionicons name="location-sharp" size={24} color="black" />
        <GooglePlacesInput getLocation={getLocation} />
      </View>

      <View style={styles.isPrivate}>
        <Text>Private event</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={inputValues.isPrivate ? Colors.blue : '#f4f3f4'}
          value={inputValues.isPrivate}
          onValueChange={(newValue) =>
            setInputValues({ ...inputValues, isPrivate: newValue })
          }
        />
      </View>

      {/* Create button */}
      <TouchableOpacity
        style={styles.createBtn}
        activeOpacity={0.7}
        onPress={handleSubmit}
      >
        <Text style={styles.createBtnText}>CREATE</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const mapStateToProps = ({ event }: { event: Event }) => {
  return { event };
};

export default connect(mapStateToProps, { createEvent })(CreateEventScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  tagsContainer: {
    flexDirection: 'row',
  },
  labelView: {},
  labelText: {
    fontSize: 16,
  },
  inputView: {
    width: 200,
    borderBottomWidth: 1,
    paddingLeft: 10,
  },
  eventTitleView: {
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
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
  createBtn: {
    width: 150,
    height: 40,
    backgroundColor: Colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 50,
    borderRadius: 20,
    elevation: 5,
    marginBottom: 70,
  },
  createBtnText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  isPrivate: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
