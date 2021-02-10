import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Platform,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { upload_preset, cloudinary_name } from '../config';
import Colors from '../assets/colors';

interface IProps {
  setImage: Dispatch<SetStateAction<string>>;
  image: string;
  pictureStyle: {
    width: number;
    height: number;
    borderRadius: number;
    alignSelf: string;
  };
}

const UploadImageComponent = ({ setImage, image, pictureStyle }: IProps) => {
  const [preUploaded, setPreUploaded] = useState<string>();
  const [requestSuccessful, setRequestSuccessful] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isBeingPicked, setIsBeingPicked] = useState<boolean>(false);

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
    setIsBeingPicked(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled && typeof result.type !== 'undefined') {
      setPreUploaded(result.uri);
      let base64Img = `data:image/jpg;base64,${result.base64}`;
      let data = {
        file: base64Img,
        upload_preset: upload_preset,
      };

      fetch(`https://api.cloudinary.com/v1_1/${cloudinary_name}/upload`, {
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
          console.log(err);

          Alert.alert('An error ocurred while uploading.');
        })
        .finally(() => setIsLoaded(true));
    }
  };

  return (
    <View>
      <TouchableOpacity style={styles.uploadImageArea} onPress={pickImage}>
        {isLoaded ? (
          <View style={styles.image}>
            <Image
              style={pictureStyle ? pictureStyle : styles.roundedPicture}
              source={{ uri: preUploaded }}
            />
          </View>
        ) : isBeingPicked ? (
          <ActivityIndicator size="large" color={Colors.pink} />
        ) : (
          <View>
            <Entypo name="image" size={50} color={Colors.green} />
            <AntDesign
              name="pluscircle"
              size={24}
              color={Colors.green}
              style={styles.plusSign}
            />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default UploadImageComponent;

const styles = StyleSheet.create({
  uploadImageArea: {
    width: '100%',
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    backgroundColor: 'white',
    elevation: 1,
    borderRadius: 8,
    borderWidth: 1,
    padding: 20,
    marginBottom: 30,
  },
  plusSign: {
    position: 'absolute',
    top: 30,
    left: 35,
    backgroundColor: Colors.white,
    borderRadius: 50,
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
  image: {
    width: 330,
    height: 200,
    zIndex: -1,
  },

  roundedPicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
  },
});
