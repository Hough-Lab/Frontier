import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';

import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import Colors from '../assets/colors';
import ImportPictureComponent from './ImportPictureComponent';

interface IProps {
  setImage: Dispatch<SetStateAction<string>>;
  image: string;
}

const UploadImageComponent = ({ setImage, image }: IProps) => {
  return (
    <View style={styles.uploadImageArea}>
      <ImportPictureComponent setImage={setImage} />
    </View>
  );
};

export default UploadImageComponent;

const styles = StyleSheet.create({
  uploadImageArea: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.grey,
    padding: 20,
    marginVertical: 20,
  },
  uploadImageBtn: {
    flex: 1,
  },
  plusSign: {
    position: 'absolute',
    top: 25,
    left: 35,
    backgroundColor: Colors.white,
    borderRadius: 50,
  },
});
