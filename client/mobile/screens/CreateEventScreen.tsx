import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  LogBox,
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { connect, useDispatch } from 'react-redux';

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
  const [inputValues, setInputValues] = useState({ title: '', location: '' });

  const dispatch = useDispatch();

  const handleSubmit = useCallback(() => {
    dispatch(createEvent(inputValues.title, inputValues.location, navigation));
  }, [inputValues]);

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
      <UploadImageComponent />
      <TagsInsertComponent />

      {/* Event title and location*/}
      <View style={styles.eventTitleView}>
        <MaterialIcons name="event" size={24} color="black" />
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
      <View style={styles.eventTitleView}>
        <Ionicons name="location-sharp" size={24} color="black" />
        <GooglePlacesInput />
        {/* <View style={styles.inputView}>
          <TextInput
            placeholder="Location"
            value={inputValues.location}
            onChangeText={(text) =>
              setInputValues({ ...inputValues, location: text })
            }
          />
        </View> */}
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
});
