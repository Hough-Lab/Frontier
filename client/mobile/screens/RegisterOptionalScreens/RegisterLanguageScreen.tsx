import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Touchable,
} from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { countriesList, languagesList } from '../../assets/countries';

import Colors from '../../assets/colors';
import { Navigation } from '../../interfaces/interfaces';

const RegisterLanguageScreen = ({ navigation }: { navigation: Navigation }) => {
  const [country, setCountry] = useState<string>();
  const [language, setLanguage] = useState<string>();

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>About Me</Text>
      </View>

      <View style={styles.midContent}>
        <View style={styles.label}>
          <Text style={styles.labelText}>What languages do you speak?</Text>
        </View>
        <Picker
          selectedValue={language}
          style={{ height: 50, width: '70%' }}
          onValueChange={(itemValue: string, itemIndex: number) =>
            setLanguage(itemValue)
          }
        >
          {languagesList.map((country: string, index: number) => (
            <Picker.Item label={country} value={country} key={index} />
          ))}
        </Picker>
        {/* <View style={styles.inputContainer}>
          <TextInput placeholder="Language" />
          <TouchableOpacity onPress={() => {}}>
            <AntDesign name="pluscircleo" size={24} color="black" />
          </TouchableOpacity>
        </View> */}

        <View style={styles.label}>
          <Text style={styles.labelText}>What country are you from?</Text>
        </View>
        <Picker
          selectedValue={country}
          style={{ height: 50, width: '70%' }}
          onValueChange={(itemValue: string, itemIndex: number) =>
            setCountry(itemValue)
          }
        >
          {countriesList.map((country: string, index: number) => (
            <Picker.Item label={country} value={country} key={index} />
          ))}
        </Picker>
        {/* <View style={styles.inputContainer}>
          <TextInput placeholder="Country" />
          <TouchableOpacity onPress={() => {}}>
            <AntDesign name="pluscircleo" size={24} color="black" />
          </TouchableOpacity>
        </View> */}
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
        <TouchableOpacity
          onPress={() => navigation.navigate('RegisterTagsScreen')}
          activeOpacity={0.7}
        >
          <AntDesign name="rightcircle" size={40} color={Colors.pink} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterLanguageScreen;

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
