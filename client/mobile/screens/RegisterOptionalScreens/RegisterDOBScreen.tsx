import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Touchable,
} from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import Colors from '../../assets/colors';
import { Navigation } from '../../interfaces/interfaces';
import { editUserProfile, getAllPOI } from '../../store/actions';
import DateTimePickerComponent from '../../components/DateTimePickerComponent';
import dayjs from 'dayjs';

var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const RegisterDOBScreen = ({ navigation }: { navigation: Navigation }) => {
  const [date, setDate] = useState();
  const dispatch = useDispatch();

  const handleSubmit = useCallback(async () => {
    if (typeof date !== 'undefined') {
      await dispatch(editUserProfile({ dateOfBirth: date }));
    }
    dispatch(getAllPOI());
    navigation.navigate('RegisterLanguageScreen');
  }, [date]);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>About Me</Text>
      </View>

      <View style={styles.midContent}>
        <View style={styles.label}>
          <Text style={styles.labelText}>What's your date of birth?</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text>
            {date && dayjs().from(dayjs(date), true)}
            {date ? ' old' : 'Please enter your date of birth'}
          </Text>
          <DateTimePickerComponent setDate={setDate} mode="date" />
        </View>
      </View>

      <View style={styles.bottomBtnsContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <AntDesign name="leftcircle" size={40} color={Colors.pink} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('MainStackNavigator', { screen: 'HomeScreen' })
          }
          activeOpacity={0.7}
        >
          <Text>SKIP</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubmit} activeOpacity={0.7}>
          <AntDesign name="rightcircle" size={40} color={Colors.pink} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterDOBScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    width: '100%',
  },
  title: {
    paddingBottom: 20,
    alignSelf: 'flex-start',
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  midContent: {
    alignItems: 'center',
    width: '100%',
  },
  label: {
    paddingBottom: 20,
  },
  labelText: {
    fontSize: 25,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 45,
    width: '70%',
    marginBottom: 20,
    padding: 5,
    paddingLeft: 15,
  },
  bottomBtnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
});
