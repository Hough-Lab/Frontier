import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

import Colors from '../assets/colors';
import { Navigation } from '../interfaces/interfaces';

const LoginScreen = ({ navigation }:{ navigation : Navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Frontier</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput placeholder="Email" />
      </View>

      <View style={styles.inputContainer}>
        <TextInput placeholder="Password" />
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('MainStackNavigator', { screen: 'HomeScreen'})}>
        <Text style={styles.loginBtnText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.msgAndRegister}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.registerBtnText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    width: '100%',
  },
  title: {
    paddingBottom: 20,
  },
  titleText: {
    fontSize: 25,
  },
  inputContainer: {
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: Colors.grey,
    height: 45,
    width: '70%',
    marginBottom: 20,
    padding: 5,
    paddingLeft: 15,
  },
  loginBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: Colors.blue,
    height: 45,
    width: 100,
  },
  loginBtnText: {
    color: Colors.white,
  },
  msgAndRegister: {
    flexDirection: 'row',
    paddingTop: 25,
  },
  registerBtnText: {
    color: Colors.blue,
    fontWeight: 'bold',
    paddingLeft: 5,
  }
});

