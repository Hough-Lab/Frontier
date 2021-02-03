import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

import { Navigation } from '../interfaces/interfaces';
import Colors from '../assets/colors';
import UploadImageComponent from '../components/UploadImageComponent';
import TagsInsertComponent from '../components/TagsInsertComponent';

const CreateEventScreen = ({ navigation }: { navigation: Navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <UploadImageComponent />
      <TagsInsertComponent />

      {/* Event title and location*/}
      <View style={styles.eventTitleView}>
        <MaterialIcons name="event" size={24} color="black" />
        <View style={styles.inputView}>
          <TextInput placeholder="Title" />
        </View>
      </View>
      <View style={styles.eventTitleView}>
        <Ionicons name="location-sharp" size={24} color="black" />
        <View style={styles.inputView}>
          <TextInput placeholder="Location" />
        </View>
      </View>

      {/* Create button */}
      <TouchableOpacity
        style={styles.createBtn}
        activeOpacity={0.7}
        onPress={() =>
          navigation.navigate('EventNavigator', {
            screen: 'DisplayEventScreen',
          })
        }
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
