import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useDispatch } from 'react-redux';
import LottieView from 'lottie-react-native';

import { registerUser, getAllPOI } from '../store/actions';
import { User } from '../interfaces/reducerInterfaces';
import Colors from '../assets/colors';
import { Navigation } from '../interfaces/interfaces';
import { validateRegister } from '../utils/generalFunctions';

const RegisterScreen = ({ navigation }: { navigation: Navigation }) => {
  const [inputValues, setInputValues] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errMsg, setErrMsg] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = useCallback(async () => {
    setErrMsg(validateRegister(inputValues));
    await dispatch(
      registerUser(
        inputValues.email,
        inputValues.password,
        inputValues.confirmPassword,
        inputValues.username,
        inputValues.firstName,
        inputValues.lastName,
        navigation,
      ),
    );
    dispatch(getAllPOI());
  }, [inputValues]);

  return (
    <View style={styles.container}>
      <LottieView
        style={{ width: '100%' }}
        source={require('../assets/JSON/logo.json')}
        autoPlay
        loop
      />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          autoCompleteType="username"
          value={inputValues.username}
          onChangeText={(text) =>
            setInputValues({ ...inputValues, username: text })
          }
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="First Name"
          value={inputValues.firstName}
          autoCompleteType="name"
          onChangeText={(text) =>
            setInputValues({ ...inputValues, firstName: text })
          }
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Last Name"
          autoCompleteType="name"
          value={inputValues.lastName}
          onChangeText={(text) =>
            setInputValues({ ...inputValues, lastName: text })
          }
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          autoCompleteType="email"
          keyboardType="email-address"
          value={inputValues.email}
          onChangeText={(text) =>
            setInputValues({ ...inputValues, email: text })
          }
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          value={inputValues.password}
          onChangeText={(text) =>
            setInputValues({ ...inputValues, password: text })
          }
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry={true}
          value={inputValues.confirmPassword}
          onChangeText={(text) =>
            setInputValues({ ...inputValues, confirmPassword: text })
          }
        />
      </View>

      {errMsg ? (
        <View style={styles.errMsgView}>
          <Text style={styles.errMsgText}>{errMsg}</Text>
        </View>
      ) : (
        <></>
      )}

      <TouchableOpacity style={styles.registerBtn} onPress={handleSubmit}>
        <Text style={styles.registerBtnText}>Register</Text>
      </TouchableOpacity>

      <View style={styles.msgAndRegister}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.loginBtnText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  errMsgView: {
    paddingBottom: 20,
  },
  errMsgText: {
    color: 'red',
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
  },
});
