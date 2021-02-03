import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const TagsInsertComponent = () => {
  return (
    <View style={styles.tagsContainer}>
      <View style={styles.labelView}>
        <Text style={styles.labelText}>Tags:</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput placeholder="Tag name" />
      </View>
      <TouchableOpacity>
        <AntDesign name="pluscircleo" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default TagsInsertComponent;

const styles = StyleSheet.create({
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
});
