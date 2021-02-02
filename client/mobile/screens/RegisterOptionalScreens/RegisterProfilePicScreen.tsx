import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Touchable } from 'react-native';
import { AntDesign, Entypo  } from '@expo/vector-icons';

import Colors from '../../assets/colors';
import { Navigation } from '../../interfaces/interfaces';

const RegisterProfilePicScreen = ({ navigation }:{ navigation : Navigation }) => {

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>About Me</Text>
      </View>

      <View style={styles.midContent}>
        <View style={styles.label}>
          <Text style={styles.labelText}>Upload your profile picture</Text>
        </View>
        <View style={styles.inputContainer}>
          <Entypo name="image" size={50} color="black" />
          <TouchableOpacity style={styles.plusBtn}onPress={()=>{}}>
            <AntDesign name="pluscircle" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomBtnsContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="leftcircle" size={40} color={Colors.pink} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MainStackNavigator', { screen: 'HomeScreen'})} activeOpacity={0.7}>
          <Text>SKIP</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MainStackNavigator', { screen: 'HomeScreen'})} activeOpacity={0.7}>
          <AntDesign name="rightcircle" size={40} color={Colors.pink} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default RegisterProfilePicScreen;

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
    width: '100%'
  },
  label: {
    paddingBottom: 20,
  },
  labelText: {
    fontSize: 25,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 30,
    width: '70%',
    marginBottom: 20,
    padding: 5,
    paddingLeft: 15,
  },
  plusBtn: {
    position: 'relative',
    backgroundColor: Colors.white,
    width: 24,
    height: 24,
    borderRadius: 12,
    left: -15,
    bottom: -25,
  },
  bottomBtnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center'
  }
})
