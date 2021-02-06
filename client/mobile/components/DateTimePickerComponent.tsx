import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, LogBox } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import Colors from '../assets/colors';

LogBox.ignoreAllLogs();

const DateTimePickerComponent = ({ setDate }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date: Date) => {
    setDate(date.toString());
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };

  return (
    <View>
      <TouchableOpacity activeOpacity={0.7}>
        <MaterialIcons
          name="event"
          size={24}
          color={Colors.blue}
          onPress={showDatePicker}
        />
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default DateTimePickerComponent;

const styles = StyleSheet.create({});