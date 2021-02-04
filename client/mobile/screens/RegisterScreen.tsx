import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { connect, useDispatch } from 'react-redux';

import { registerUser } from '../store/actions/registerActions';
import { User } from '../interfaces/reducerInterfaces';
import Colors from '../assets/colors';
import { Navigation } from '../interfaces/interfaces';

const RegisterScreen = ({ navigation }: { navigation: Navigation }) => {
  const [inputValues, setInputValues] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const dispatch = useDispatch();

  const handleSubmit = useCallback(() => {
    dispatch(
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
  }, [inputValues]);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Frontier</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
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
          onChangeText={(text) =>
            setInputValues({ ...inputValues, firstName: text })
          }
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Last Name"
          value={inputValues.lastName}
          onChangeText={(text) =>
            setInputValues({ ...inputValues, lastName: text })
          }
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
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

const mapStateToProps = ({ user }: { user: User }) => {
  return { user };
};

const mapDispatchToProps = { registerUser };

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);

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
  },
});
