import React, { useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import LottieView from 'lottie-react-native';

import { getAllPOI, loginUser } from '../store/actions';
import Colors from '../assets/colors';
import { Navigation } from '../interfaces/interfaces';
import { User } from '../interfaces/reducerInterfaces';
import { validateLogin } from '../utils/generalFunctions';
import { SystemState } from '../interfaces/reducerInterfaces';

const LoginScreen = ({ navigation }: { navigation: Navigation }) => {
  const [inputValues, setInputValues] = useState({
    email: '',
    password: '',
  });
  const [errMsg, setErrMsg] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = useCallback(async () => {
    setErrMsg('');
    setErrMsg(validateLogin(inputValues));
    try {
      await dispatch(
        loginUser(inputValues.email, inputValues.password, navigation),
      );
      dispatch(getAllPOI());
    } catch (e) {
      setErrMsg('Invalid username or password.');
    }
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
          value={inputValues.password}
          autoCompleteType="password"
          secureTextEntry={true}
          onChangeText={(text) =>
            setInputValues({ ...inputValues, password: text })
          }
        />
      </View>

      {errMsg.length > 1 && (
        <View style={styles.errMsgView}>
          <Text style={styles.errMsgText}>{errMsg}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
        <Text style={styles.loginBtnText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.msgAndRegister}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.registerBtnText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    width: '100%',
  },
  errMsgView: {
    paddingBottom: 20,
  },
  errMsgText: {
    color: 'red',
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
  },
});
