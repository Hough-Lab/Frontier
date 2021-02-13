import React, { useState, Dispatch, SetStateAction } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import Colors from '../assets/colors';
import { AntDesign, Entypo } from '@expo/vector-icons';

interface IProps {
  setTags: Dispatch<SetStateAction<string[]>>;
  tags: string[];
}

const TagsInsertComponent = ({ setTags, tags }: IProps) => {
  const [input, setInput] = useState('');

  function addTag(tag: string) {
    if (tags.indexOf(tag) === -1 && tag !== '') setTags(() => [...tags, tag]);
  }

  function deleteTag(tag: string) {
    tags.splice(tags.indexOf(tag), 1);
    setTags(() => [...tags]);
  }

  return (
    <View>
      <View style={styles.tagsContainer}>
        <View>
          <Text style={styles.labelText}>Tags:</Text>
        </View>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Create tags..."
            returnKeyType="done"
            value={input}
            onSubmitEditing={() => {
              addTag(input);
              setInput('');
            }}
            onChangeText={(tag) => {
              setInput(tag);
            }}
          />
        </View>
        <TouchableOpacity>
          <AntDesign
            name="pluscircleo"
            size={24}
            color="black"
            onPress={() => {
              addTag(input);
              setInput('');
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.tagContainer}>
        <FlatList
          horizontal={true}
          data={tags}
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
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
};

export default TagsInsertComponent;

const styles = StyleSheet.create({
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    paddingBottom: 5,
    fontWeight: 'bold',
  },
  inputView: {
    width: 200,
    borderWidth: 1,
    paddingLeft: 10,
    marginLeft: 10,
    marginRight: 5,
    borderRadius: 8,
  },
  tagContainer: {
    paddingVertical: 10,
  },
  tag: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    backgroundColor: Colors.pink,
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
