import React, { useState } from 'react';
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
} from 'react-native';
import { useSelector } from 'react-redux';
import moment from 'moment';
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

import { User, SystemState } from '../interfaces/reducerInterfaces';
import { Navigation } from '../interfaces/interfaces';
import { applyAnimation } from '../utils/generalFunctions';
import Colors from '../assets/colors';
import { countriesList, languagesList } from '../assets/countries';
import DateTimePickerComponent from '../components/DateTimePickerComponent';

const UserProfileScreen = ({ navigation }: { navigation: Navigation }) => {
  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  applyAnimation('scaleY');

  const user: User = useSelector((state: SystemState) => state.user);
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

  return (
    <View style={styles.container}>
      {/* User Profile section */}
      <TouchableOpacity style={styles.profilePicContainer} activeOpacity={0.7}>
        <Image
          style={styles.profilePic}
          source={require('../assets/images/placeholderProfile.jpeg')}
        />
      </TouchableOpacity>
      <View style={styles.nameView}>
        <Text style={styles.name}>
          {user.firstName} {user.lastName}
          {user.dateOfBirth && ', ' + moment().diff(user.dateOfBirth, 'years')}
        </Text>
        <Text>
          <Text style={{ ...styles.regularText, fontWeight: 'bold' }}>
            {user.username}
          </Text>
          <Text style={styles.regularText}>
            {', joined ' +
              moment(user.createdAt).month(0).from(moment().month(0))}
          </Text>
        </Text>
        <Text style={styles.regularText}>{'From ' + user.from}</Text>
      </View>

      {/* Edit User Profile section */}
      {!isEditMode ? (
        <Button
          title="Edit Profile"
          color={Colors.blue}
          onPress={() => setIsEditMode(true)}
        />
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
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                ...styles.textInput,
                borderBottomWidth: 0,
                fontWeight: 'bold',
              }}
            >
              DOB:{' '}
            </Text>
            <Text style={{ ...styles.textInput, borderBottomWidth: 0 }}>
              {moment(inputValues.dateOfBirth).format('DD.MM.YYYY ')}
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
            onValueChange={(itemValue: string, itemIndex: number) =>
              setCountry(itemValue)
            }
          >
            {countriesList.map((country: string, index: number) => (
              <Picker.Item label={country} value={country} key={index} />
            ))}
          </Picker>
          <Button
            title="Apply Changes"
            color={Colors.blue}
            onPress={() => setIsEditMode(false)}
          />
        </View>
      )}

      {/* Log out Button */}
      <Button
        title="Log out"
        color={Colors.pink}
        onPress={() =>
          navigation.navigate('LoginStackNavigator', {
            screen: 'LoginScreen',
          })
        }
      />
    </View>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profilePicContainer: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 75,
  },
  profilePic: {
    height: 150,
    width: 150,
    borderRadius: 75,
    borderWidth: 10,
    borderColor: Colors.lightBlue,
  },
  nameView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.blue,
  },
  regularText: {
    fontSize: 16,
    color: Colors.blue,
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
});
