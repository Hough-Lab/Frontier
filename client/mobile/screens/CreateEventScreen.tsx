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
  Dimensions,
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { Picker } from '@react-native-picker/picker';

import { createEvent, getAllPOI } from '../store/actions';
import { Navigation } from '../interfaces/interfaces';
import Colors from '../assets/colors';
import UploadImageComponent from '../components/UploadImageComponent';
import TagsInsertComponent from '../components/TagsInsertComponent';
import GooglePlacesInput from '../components/GooglePlacesInput';
import dayjs from 'dayjs';
import DateTimePickerComponent from '../components/DateTimePickerComponent';
import { applyAnimation } from '../utils/generalFunctions';

import { numbers } from '../assets/numbers';

const CreateEventScreen = ({ navigation }: { navigation: Navigation }) => {
  const [image, setImage] = useState('');
  const [inputValues, setInputValues] = useState({
    title: '',
    formattedAddress: '',
    latitude: 0,
    longitude: 0,
    dateFrom: new Date(Date.now()).toString(),
    dateTo: new Date(Date.now()).toString(),
    description: '',
    maxCapacity: 1,
    isPrivate: false,
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

  const [capacity, setCapacity] = useState<number>();
  const [tags, setTags] = useState<string[]>([]);

  const dispatch = useDispatch();

  const handleSubmit = useCallback(async () => {
    await dispatch(
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
        image,
        tags,
        navigation,
      ),
    );
    dispatch(getAllPOI());
  }, [inputValues, tags, image]);

  console.log(tags);

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
      <UploadImageComponent
        setImage={setImage}
        image={image}
        pictureStyle={{
          width: Dimensions.get('window').width - 20,
          height: 190,
          borderRadius: 30,
          alignSelf: 'center',
        }}
      />
      <TagsInsertComponent setTags={setTags} tags={tags} />

      {/* Event title and location*/}
      <View style={styles.eventTitleView}>
        <Text style={styles.labelText}>Event title:</Text>
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
        <Text style={styles.datePickerLabel}>From: </Text>
        <Text style={styles.datePickerText}>
          {moment(inputValues.dateFrom).format('Do MMMM, YYYY [at] HH:mm')}
        </Text>
        <DateTimePickerComponent
          mode="datetime"
          setDate={(selectedDate: string) =>
            setInputValues({ ...inputValues, dateFrom: selectedDate })
          }
        />
      </View>

      {/* Date To section */}
      <View style={styles.datePicker}>
        <Text style={styles.datePickerLabel}>To: </Text>
        <Text style={styles.datePickerText}>
          {moment(inputValues.dateTo).format('Do MMMM, YYYY [at] HH:mm')}
        </Text>
        <DateTimePickerComponent
          mode="datetime"
          setDate={(selectedDate: string) =>
            setInputValues({ ...inputValues, dateTo: selectedDate })
          }
        />
      </View>

      <View style={styles.eventTitleView}>
        <Ionicons name="location-sharp" size={24} color="black" />
        <GooglePlacesInput getLocation={getLocation} />
      </View>

      {/* Description section */}
      <View style={{ paddingTop: 10 }}>
        <Text style={styles.descriptionTitle}>Event description:</Text>
        <View style={styles.descriptionView}>
          <TextInput
            placeholder="Add a description for the event..."
            defaultValue={''}
            multiline={true}
            value={inputValues.description}
            onChangeText={(text) => {
              setInputValues({ ...inputValues, description: text });
            }}
          />
        </View>
      </View>

      {/* capacity of event */}

      <View style={styles.eventCapacity}>
        <Text style={{ fontWeight: 'bold' }}>Maximum capacity of event:</Text>
        <Picker
          selectedValue={capacity}
          style={{ marginLeft: 10, width: '30%' }}
          onValueChange={(value: number, itemIndex: number) => {
            setCapacity(value);
            setInputValues({ ...inputValues, maxCapacity: value });
          }}
        >
          {numbers.map((number: number, index: number) => (
            <Picker.Item label={number.toString()} value={number} key={index} />
          ))}
        </Picker>
      </View>

      {/* privacy of event */}
      <View style={styles.isPrivate}>
        <Text style={styles.privateEvent}>Private event</Text>
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

export default CreateEventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: 'white',
  },
  tagsContainer: {
    flexDirection: 'row',
  },
  labelText: {
    paddingBottom: 5,
    fontWeight: 'bold',
  },
  inputView: {
    width: 200,
    marginLeft: 10,
    borderBottomWidth: 0.5,
    paddingLeft: 10,
  },
  descriptionTitle: {
    paddingBottom: 5,
    fontWeight: 'bold',
  },
  eventTitleView: {
    paddingTop: 30,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  datePicker: {
    flexDirection: 'row',
    paddingTop: 20,
    alignItems: 'center',
  },
  datePickerLabel: {
    color: 'black',
    fontWeight: 'bold',
  },
  datePickerText: {
    color: 'black',
    paddingHorizontal: 15,
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
    paddingTop: 20,
  },
  privateEvent: {
    fontWeight: 'bold',
    paddingRight: 10,
  },
  descriptionView: {
    borderWidth: 1,
    height: 100,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  eventCapacity: {
    flexDirection: 'row',
    paddingTop: 20,
    width: '70%',
    alignItems: 'center',
  },
});
