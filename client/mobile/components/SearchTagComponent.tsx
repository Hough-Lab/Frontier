import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  UIManager,
  Platform,
  Text,
  FlatList,
} from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';

import Colors from '../assets/colors';
import { applyAnimation } from '../utils/generalFunctions';
import GooglePlacesInput from './GooglePlacesInput';
import { ISeenOnMap } from '../screens/HomeScreen';

interface IProps {
  setTags: Dispatch<SetStateAction<string[]>>;
  tags: string[];
}

const SearchTagComponent = ({ setTags, tags }: IProps) => {
  const [input, setInput] = useState('');

  const [searchBar, setSearchBar] = useState(false);

  function addTag(tag: string) {
    if (tags.indexOf(tag) === -1) setTags(() => [...tags, tag]);
  }

  function deleteTag(tag: string) {
    tags.splice(tags.indexOf(tag), 1);
    setTags(() => [...tags]);
  }

  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  return (
    <>
      <View style={searchBar ? styles.searchBarView : styles.searchBtn}>
        {!searchBar ? (
          <TouchableOpacity
            onPress={() => {
              setSearchBar(true);
              applyAnimation();
            }}
          >
            <Ionicons name="pricetag-outline" size={30} color={Colors.green} />
          </TouchableOpacity>
        ) : (
          <>
            <TextInput
              placeholder="Search tags..."
              returnKeyType="done"
              value={input}
              onSubmitEditing={() => {
                addTag(input);
                setInput('');
              }}
              onChangeText={(tag) => {
                setInput(tag);
              }}
              style={styles.searchByTagBar}
            ></TextInput>
            <View style={styles.iconsContainer}>
              <Entypo
                name="plus"
                style={styles.plusButton}
                size={24}
                color="green"
                onPress={() => {
                  addTag(input);
                  setInput('');
                }}
              />
              <Entypo
                name="cross"
                size={24}
                color="black"
                onPress={() => {
                  setSearchBar(false);
                  applyAnimation();
                }}
              />
            </View>
          </>
        )}
      </View>
      {searchBar && (
        <View style={styles.tagContainer}>
          <FlatList
            contentContainerStyle={styles.flatlistContainer}
            horizontal={true}
            data={tags}
            showsHorizontalScrollIndicator={false}
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
                    onPress={() => deleteTag(item)}
                  />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.index}
          />
        </View>
      )}
    </>
  );
};

export default SearchTagComponent;

const styles = StyleSheet.create({
  searchBtn: {
    position: 'absolute',
    right: 10,
    top: 105,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: Colors.white,
    width: 45,
    height: 45,
    elevation: 5,
  },
  searchBarView: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 10,
    right: 40,
    top: 105,
    borderRadius: 30,
    backgroundColor: Colors.white,
    width: '80%',
    elevation: 5,
  },
  searchByTagBar: {
    height: 50,
  },
  plusButton: {
    marginRight: 20,
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  tagContainer: {
    paddingVertical: 10,
    position: 'absolute',
    top: 155,
  },
  flatlistContainer: {
    paddingHorizontal: 35,
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
  tag: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    backgroundColor: Colors.pink,
    height: 20,
    width: 'auto',
    marginLeft: 5,
  },
});
