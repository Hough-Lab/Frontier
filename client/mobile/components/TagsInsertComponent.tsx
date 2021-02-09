import React, { useState } from 'react';
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

const TagsInsertComponent = ({
  getTags,
}: {
  getTags: (tags: string[]) => void;
}) => {
  const [tag, setTag] = useState('');
  const [tags, setTags]: any = useState([]);
  const [input, setInput] = useState('');

  function addTag(tag: string) {
    setTags(() => [...tags, tag]);
  }

  function deleteTag(tag: string) {
    tags.splice(tags.indexOf(tag), 1);
    setTags(() => [...tags]);
  }

  return (
    <View>
      <View style={styles.tagsContainer}>
        <View style={styles.labelView}>
          <Text style={styles.labelText}>Tags:</Text>
        </View>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Create tag..."
            returnKeyType="done"
            value={input}
            onSubmitEditing={() => {
              addTag(tag);
              setInput('');
              getTags(tags);
            }}
            onChangeText={(tag) => {
              setTag(tag);
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
              addTag(tag);
              setInput('');
              getTags(tags);
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.tagContainer}>
        <FlatList
          horizontal={true}
          data={tags}
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
                  onPress={() => deleteTag(item)}
                />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.key}
        />
      </View>
    </View>
  );
};

export default TagsInsertComponent;

const styles = StyleSheet.create({
  tagsContainer: {
    flexDirection: 'row',
  },
  labelView: {},
  labelText: {
    fontSize: 16,
  },
  inputView: {
    width: 200,
    borderBottomWidth: 1,
    paddingLeft: 10,
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
