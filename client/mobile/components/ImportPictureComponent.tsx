import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import Colors from '../assets/colors';
import { Iimage } from '../interfaces/interfaces';

interface IProps {
  setImage: Dispatch<SetStateAction<string>>;
}

const ImportPictureComponent = ({ setImage }: IProps) => {
  const [preUploaded, setPreUploaded] = useState<string>();
  const [requestSuccessful, setRequestSuccessful] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled && typeof result.type !== 'undefined') {
      setPreUploaded(result.uri);
      let base64Img = `data:image/jpg;base64,${result.base64}`;
      let data = {
        file: base64Img,
        upload_preset: 'frontier',
      };

      fetch('https://api.cloudinary.com/v1_1/dcbacnafu/upload', {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json',
        },
        method: 'POST',
      })
        .then((res) => res.json())
        .then((data) => {
          setImage(data.secure_url);
          setRequestSuccessful(true);
        })
        .catch((err) => {
          Alert.alert('An error ocurred while uploading.');
        });
    }
  };

  return (
    <View style={{ flexDirection: 'column' }}>
      <View style={styles.inputContainer}>
        <Entypo name="image" size={50} color="black" />
        <TouchableOpacity style={styles.plusBtn} onPress={pickImage}>
          <AntDesign name="pluscircle" size={24} color="black" />
        </TouchableOpacity>
        {requestSuccessful && (
          <Image source={{ uri: preUploaded }} style={styles.image} />
        )}
      </View>

      <View></View>
    </View>
  );
};

export default ImportPictureComponent;

const styles = StyleSheet.create({
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
    justifyContent: 'center',
    borderRadius: 30,
    width: '70%',
    marginBottom: 20,
    padding: 5,
    paddingLeft: 15,
  },
  plusBtn: {
    position: 'relative',
    backgroundColor: Colors.white,
    width: 24,
    height: 24,
    borderRadius: 12,
    left: -15,
    bottom: -25,
  },
  bottomBtnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
});
