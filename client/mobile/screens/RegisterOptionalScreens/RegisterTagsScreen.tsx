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

import { editUserProfile, getAllPOI } from '../../store/actions';
import Colors from '../../assets/colors';
import { Navigation } from '../../interfaces/interfaces';
import TagsInsertComponent from '../../components/TagsInsertComponent';

const RegisterTagsScreen = ({ navigation }: { navigation: Navigation }) => {
  const tags = ['aa'];

  const dispatch = useDispatch();

  const handleSubmit = useCallback(async () => {
    if (tags !== []) {
      // await dispatch(editUserProfile({ userTags: tags }));
      // dispatch(getAllPOI());
      navigation.navigate('RegisterProfilePicScreen');
    }
  }, [tags]);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>About Me</Text>
      </View>

      <View style={styles.midContent}>
        <View style={styles.label}>
          <Text style={styles.labelText}>Create tags that describe you?</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput placeholder="Tag name" />
          <TouchableOpacity onPress={() => {}}>
            <AntDesign name="pluscircleo" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* add the below once  have the action "edit user" */}
        {/* <TagsInsertComponent getTags={getTags} /> */}
      </View>

      <View style={styles.bottomBtnsContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
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

export default RegisterTagsScreen;

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
