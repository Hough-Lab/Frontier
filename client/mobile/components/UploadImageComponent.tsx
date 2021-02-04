import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import Colors from '../assets/colors';

const UploadImageComponent = () => {
  return (
    <View style={styles.uploadImageArea}>
      <TouchableOpacity style={styles.uploadImageBtn} onPress={() => {}}>
        <Entypo name="image" size={50} color="black" />
        <View style={styles.plusSign}>
          <AntDesign name="pluscircle" size={24} color="black" />
        </View>
      </TouchableOpacity>
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
