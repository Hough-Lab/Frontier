import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  LogBox,
  Switch,
  Platform,
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { connect, useDispatch } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';

import { createEvent } from '../store/actions';
import { Navigation } from '../interfaces/interfaces';
import Colors from '../assets/colors';
import UploadImageComponent from '../components/UploadImageComponent';
import TagsInsertComponent from '../components/TagsInsertComponent';
import GooglePlacesInput from '../components/GooglePlacesInput';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

const CreateEventScreen = ({ navigation }: { navigation: Navigation }) => {
  const [inputValues, setInputValues] = useState({
    title: '',
    location: {},
    dateFrom: new Date(Date.now()),
    dateTo: new Date(Date.now()),
    description: 'This is a temporary description.',
    maxCapacity: 10,
    isPrivate: false,
  });

  const [selectedLoc, setSelectedLoc] = useState({});

  // function to toggle the switch button
  const toggleSwitch = () => {
    setInputValues({
      ...inputValues,
      location: selectedLoc,
      isPrivate: !inputValues.isPrivate,
    });
    console.log(inputValues);
  };

  const [date, setDate] = useState<Date>(new Date());
  const [mode, setMode] = useState<string>('date');
  const [show, setShow] = useState<boolean>(false);

  const onChange = (selectedDate: Date) => {
    console.log(date);
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode: string) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const dispatch = useDispatch();

  const handleSubmit = useCallback(() => {
    setInputValues({ ...inputValues, location: selectedLoc });
    dispatch(
      createEvent(
        inputValues.title,
        inputValues.location,
        inputValues.dateFrom,
        inputValues.dateTo,
        inputValues.description,
        inputValues.maxCapacity,
        inputValues.isPrivate,
        navigation,
      ),
    );
  }, [inputValues]);

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
      <UploadImageComponent />
      <TagsInsertComponent />

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

      <TouchableOpacity activeOpacity={0.7} onPress={showDatepicker}>
        <View style={styles.eventTitleView}>
          <MaterialIcons name="event" size={24} color="black" />
          <View style={styles.inputView}>
            <Text>Date of event</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.7} onPress={showTimepicker}>
        <View style={styles.eventTitleView}>
          <MaterialIcons name="event" size={24} color="black" />
          <View style={styles.inputView}>
            <Text>Time of event</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Event date */}

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}

      <View style={styles.eventTitleView}>
        <Ionicons name="location-sharp" size={24} color="black" />
        <GooglePlacesInput setSelectedLoc={setSelectedLoc} />
      </View>

      <View style={styles.isPrivate}>
        <Text>Private event</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={inputValues.isPrivate ? Colors.blue : '#f4f3f4'}
          onValueChange={toggleSwitch}
          value={!inputValues.isPrivate}
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
