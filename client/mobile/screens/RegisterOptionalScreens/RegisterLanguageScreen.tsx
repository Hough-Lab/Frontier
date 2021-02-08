import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { countriesList, languagesList } from '../../assets/countries';

import Colors from '../../assets/colors';
import { colors, randomColor } from '../../assets/colorFunction';
import { Navigation } from '../../interfaces/interfaces';

const RegisterLanguageScreen = ({ navigation }: { navigation: Navigation }) => {
  const [country, setCountry] = useState<string>();
  const [language, setLanguage] = useState<string>();
  const [languageSpoken, setLanguageSpoken] = useState('');
  const [languagesSpoken, setLanguagesSpoken]: any = useState([]);
  const [input, setInput] = useState('');

  function addLanguageSpoken(languageSpoken: string) {
    setLanguagesSpoken(() => [...languagesSpoken, languageSpoken]);
  }
  console.log('tags', languagesSpoken);

  function deleteLanguageSpoken(languageSpoken: string) {
    languagesSpoken.splice(languagesSpoken.indexOf(languageSpoken), 1);
    setLanguagesSpoken(() => [...languagesSpoken]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>About Me</Text>
      </View>

      <View style={styles.midContent}>
        {/* <View> */}
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
        {/* </View> */}

        {/* <View> */}
        <View style={styles.label}>
          <Text style={styles.labelText}>What language(s) do you speak?</Text>
        </View>
        <Picker
          selectedValue={language}
          style={{ height: 50, width: '70%' }}
          onValueChange={(itemValue: string, itemIndex: number) => {
            setLanguage(itemValue);
            addLanguageSpoken(itemValue);
          }}
        >
          {languagesList.map((country: string, index: number) => (
            <Picker.Item label={country} value={country} key={index} />
          ))}
        </Picker>
        {languagesSpoken && (
          <View style={styles.tagContainer}>
            <FlatList
              horizontal={true}
              data={languagesSpoken}
              renderItem={({ item }) => (
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{item}</Text>
                  <Text style={styles.tagLine}>|</Text>
                  <TouchableOpacity>
                    <Entypo
                      style={{ paddingRight: 4 }}
                      name="cross"
                      size={15}
                      color={Colors.white}
                      onPress={() => deleteLanguageSpoken(item)}
                    />
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item) => item.key}
            />
          </View>
        )}
      </View>
      {/* </View> */}

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
    // alignItems: 'center',
    width: '100%',
  },
  label: {
    paddingBottom: 20,
  },
  labelText: {
    fontSize: 25,
    paddingTop: 20,
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
  tagContainer: {
    paddingVertical: 10,
  },
  tag: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    backgroundColor: randomColor(colors),
    height: 20,
    width: 'auto',
    marginRight: 5,
  },
  tagText: {
    color: Colors.white,
    padding: 10,
    fontSize: 10,
  },
  tagLine: {
    color: Colors.white,
    fontSize: 10,
  },
});
