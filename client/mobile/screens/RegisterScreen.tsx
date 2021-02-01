import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

import Colors from '../assets/colors';
import { Navigation } from '../interfaces/interfaces';

const RegisterScreen = ({ navigation }:{ navigation : Navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Frontier</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput placeholder="First Name" />
      </View>

      <View style={styles.inputContainer}>
        <TextInput placeholder="Last Name" />
      </View>

      <View style={styles.inputContainer}>
        <TextInput placeholder="Email" />
      </View>

      <View style={styles.inputContainer}>
        <TextInput placeholder="Password" secureTextEntry={true} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput placeholder="Confirm Password" secureTextEntry={true} />
      </View>

      <TouchableOpacity style={styles.registerBtn}>
        <Text style={styles.registerBtnText} onPress={() => navigation.navigate('RegisterDOBScreen')}>Register</Text>
      </TouchableOpacity>

      <View style={styles.msgAndRegister}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.loginBtnText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default RegisterScreen;

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
  registerBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: Colors.blue,
    height: 45,
    width: 100,
  },
  registerBtnText: {
    color: Colors.white,
  },
  msgAndRegister: {
    flexDirection: 'row',
    paddingTop: 25,
  },
  loginBtnText: {
    color: Colors.blue,
    fontWeight: 'bold',
    paddingLeft: 5,
  }
})
