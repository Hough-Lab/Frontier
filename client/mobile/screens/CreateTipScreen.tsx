import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import {
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
} from '@expo/vector-icons';

import Colors from '../assets/colors';
import { Navigation } from '../interfaces/interfaces';

const CreateTipScreen = ({ navigation }: { navigation: Navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Upload Image section */}
      <View style={styles.uploadImageArea}>
        <TouchableOpacity style={styles.uploadImageBtn} onPress={() => {}}>
          <Entypo name="image" size={50} color="black" />
          <View style={styles.plusSign}>
            <AntDesign name="pluscircle" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Insert Tags section */}
      <View style={styles.tagsContainer}>
        <View style={styles.labelView}>
          <Text style={styles.labelText}>Tags:</Text>
        </View>
        <View style={styles.inputView}>
          <TextInput placeholder="Tag name" />
        </View>
        <TouchableOpacity>
          <AntDesign name="pluscircleo" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Tip title and location*/}
      <View style={styles.tipTitleView}>
        <MaterialCommunityIcons
          name="page-layout-header"
          size={24}
          color="black"
        />
        <View style={styles.inputView}>
          <TextInput placeholder="Title" />
        </View>
      </View>
      <View style={styles.tipTitleView}>
        <Ionicons name="location-sharp" size={24} color="black" />
        <View style={styles.inputView}>
          <TextInput placeholder="Location" />
        </View>
      </View>

      {/* Star Rating section */}
      <View style={styles.starsView}>
        <AirbnbRating
          count={5}
          reviews={['Terrible', 'Bad', 'OK', 'Good', 'Excellent']}
          defaultRating={5}
          size={20}
          isDisabled={false}
        />
      </View>

      {/* Description section */}
      <View style={styles.descriptionView}>
        <TextInput
          onChangeText={() => {}}
          placeholder="Add description..."
          defaultValue={''}
          multiline={true}
        />
      </View>

      {/* SHARE button */}
      <TouchableOpacity
        style={styles.shareBtn}
        activeOpacity={0.7}
        onPress={() =>
          navigation.navigate('TipNavigator', {
            screen: 'DisplayTipScreen',
          })
        }
      >
        <Text style={styles.shareBtnText}>SHARE</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreateTipScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
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
  tipTitleView: {
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  starsView: {
    paddingVertical: 20,
  },
  descriptionView: {
    borderWidth: 1,
    height: 100,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  shareBtn: {
    width: 150,
    height: 40,
    backgroundColor: Colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 20,
    elevation: 5,
    marginBottom: 70,
  },
  shareBtnText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
});
