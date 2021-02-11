import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { countriesList, languagesList } from '../../assets/countries';
import { useDispatch } from 'react-redux';

import { editUserProfile, getAllPOI } from '../../store/actions';
import Colors from '../../assets/colors';
import { Navigation } from '../../interfaces/interfaces';

const RegisterLanguageScreen = ({ navigation }: { navigation: Navigation }) => {
  const [country, setCountry] = useState<string>();
  const [language, setLanguage] = useState<string>();
  const [languagesSpoken, setLanguagesSpoken] = useState<string[]>([]);
  console.log(languagesSpoken);

  function addLanguageSpoken(languageSpoken: string) {
    if (
      languagesSpoken.indexOf(languageSpoken) === -1 &&
      languageSpoken.trim() !== ''
    ) {
      setLanguagesSpoken(() => [...languagesSpoken, languageSpoken]);
    }
  }

  function deleteLanguageSpoken(languageSpoken: string) {
    languagesSpoken.splice(languagesSpoken.indexOf(languageSpoken), 1);
    setLanguagesSpoken(() => [...languagesSpoken]);
  }

  const dispatch = useDispatch();

  const handleSubmit = useCallback(async () => {
    if (country?.trim() !== '' && languagesSpoken !== []) {
      await dispatch(
        editUserProfile({ language: languagesSpoken, from: country }),
      );
    }
    dispatch(getAllPOI());
    navigation.navigate('RegisterTagsScreen');
  }, [languagesSpoken, country]);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>About you</Text>
      </View>

      <View style={styles.midContent}>
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
          <Picker.Item value="" label="Please select a country" />
          {countriesList.map((country: string, index: number) => (
            <Picker.Item label={country} value={country} key={index} />
          ))}
        </Picker>

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
          <Picker.Item value="" label="Please select a language" />

          {languagesList.map((country: string, index: number) => (
            <Picker.Item label={country} value={country} key={index} />
          ))}
        </Picker>
        {languagesSpoken && (
          <View style={styles.tagContainer}>
            <FlatList
              horizontal={true}
              data={languagesSpoken}
              renderItem={({ item, index }) => (
                <View key={index} style={styles.tag}>
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
              keyExtractor={(item) => item}
            />
          </View>
        )}
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
        <TouchableOpacity onPress={handleSubmit} activeOpacity={0.7}>
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
    paddingTop: 30,
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    width: '100%',
  },
  title: {
    paddingBottom: 20,
    alignSelf: 'flex-start',
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.green,
  },
  midContent: {
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
    backgroundColor: Colors.blue,
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
