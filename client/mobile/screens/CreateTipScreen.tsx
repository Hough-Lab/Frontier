import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { AirbnbRating, Rating } from 'react-native-ratings';
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome5,
} from '@expo/vector-icons';
import { connect, useDispatch } from 'react-redux';

import { createReview } from '../store/actions';
import Colors from '../assets/colors';
import { Navigation } from '../interfaces/interfaces';
import UploadImageComponent from '../components/UploadImageComponent';
import TagsInsertComponent from '../components/TagsInsertComponent';
import GooglePlacesInput from '../components/GooglePlacesInput';
import { Review } from '../interfaces/reducerInterfaces';

// LogBox.ignoreLogs([
//   'VirtualizedLists should never be nested', // TODO: Remove when fixed
// ]);

const CreateTipScreen = ({ navigation }: { navigation: Navigation }) => {
  const [inputValues, setInputValues] = useState({
    title: '',
    description: '',
    rating: 3,
    budgetLevel: 10,
    safetyRating: 2,
    safetyComment: '',
    formattedAddress: '',
    picture: 'Placeholder Image',
    latitude: 0,
    longitude: 0,
  });

  const dispatch = useDispatch();

  const handleSubmit = useCallback(() => {
    console.log(inputValues);
    dispatch(
      createReview(
        inputValues.title,
        inputValues.description,
        inputValues.rating,
        inputValues.budgetLevel,
        inputValues.safetyRating,
        inputValues.safetyComment,
        inputValues.formattedAddress,
        inputValues.picture,
        inputValues.latitude,
        inputValues.longitude,
        navigation,
      ),
    );
  }, [inputValues]);

  const getLocation = (
    formattedAddress: string,
    latitude: number,
    longitude: number,
  ) => {
    setInputValues({
      ...inputValues,
      formattedAddress: formattedAddress,
      latitude: latitude,
      longitude: longitude,
    });
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
      <UploadImageComponent />
      <TagsInsertComponent />

      {/* Tip title and location*/}
      <View style={styles.tipTitleView}>
        <MaterialCommunityIcons
          name="page-layout-header"
          size={24}
          color="black"
        />
        <View style={styles.inputView}>
          <TextInput
            placeholder="Title"
            value={inputValues.title}
            onChangeText={(text) =>
              setInputValues({ ...inputValues, title: text })
            }
          />
        </View>
      </View>
      <View style={styles.tipTitleView}>
        <Ionicons name="location-sharp" size={24} color="black" />
        <GooglePlacesInput getLocation={getLocation} />
      </View>

      {/* Star Rating section */}
      <View style={styles.starsView}>
        <AirbnbRating
          count={5}
          reviews={['Terrible', 'Bad', 'OK', 'Good', 'Excellent']}
          defaultRating={5}
          size={20}
          isDisabled={false}
          onFinishRating={(text) => {
            setInputValues({ ...inputValues, rating: text });
          }}
        />
      </View>

      {/* Description section */}
      <View style={styles.descriptionView}>
        <TextInput
          placeholder="Add description..."
          defaultValue={''}
          multiline={true}
          value={inputValues.description}
          onChangeText={(text) => {
            setInputValues({ ...inputValues, description: text });
          }}
        />
      </View>

      {/* Safety Ratings */}
      <View style={styles.starsView}>
        <Text style={{ textAlign: 'center' }}>Safety Ratings</Text>
        <AirbnbRating
          count={3}
          reviews={['Not Safe', 'Fairly Safe', 'Super Safe']}
          defaultRating={2}
          size={20}
          isDisabled={false}
          onFinishRating={(text) => {
            setInputValues({ ...inputValues, safetyRating: text });
          }}
        />
      </View>

      {/* Safety Comment section */}
      <View style={styles.descriptionView}>
        <TextInput
          placeholder="Comment on safety..."
          defaultValue={''}
          multiline={true}
          value={inputValues.safetyComment}
          onChangeText={(text) =>
            setInputValues({ ...inputValues, safetyComment: text })
          }
        />
      </View>

      {/* Budget Level section */}
      <View style={styles.budgetView}>
        <FontAwesome5 name="money-bill-wave" size={24} color="black" />
        <View style={styles.inputView}>
          <TextInput
            placeholder="Budget"
            keyboardType="numeric"
            onChangeText={(text) => {
              setInputValues({ ...inputValues, budgetLevel: parseInt(text) });
            }}
          />
        </View>
      </View>

      {/* SHARE button */}
      <TouchableOpacity
        style={styles.shareBtn}
        activeOpacity={0.7}
        onPress={handleSubmit}
      >
        <Text style={styles.shareBtnText}>SHARE</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const mapStateToProps = ({ review }: { review: Review }) => {
  return { review };
};

const mapDispatchToProps = { createReview };

export default connect(mapStateToProps, mapDispatchToProps)(CreateTipScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  inputView: {
    width: 200,
    borderBottomWidth: 1,
    paddingLeft: 10,
  },
  tipTitleView: {
    paddingTop: 30,
    flexDirection: 'row',
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
  budgetView: {
    flexDirection: 'row',
    paddingTop: 30,
  },
  shareBtnText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
});
