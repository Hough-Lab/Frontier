import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  LogBox,
  Dimensions,
} from 'react-native';
import { AirbnbRating, Rating } from 'react-native-ratings';
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
  AntDesign,
} from '@expo/vector-icons';
import { connect, useDispatch } from 'react-redux';
import StarRating from 'react-native-star-rating';

import { createReview, getAllPOI } from '../store/actions';
import Colors from '../assets/colors';
import { Navigation } from '../interfaces/interfaces';
import UploadImageComponent from '../components/UploadImageComponent';
import TagsInsertComponent from '../components/TagsInsertComponent';
import GooglePlacesInput from '../components/GooglePlacesInput';
import { Review } from '../interfaces/reducerInterfaces';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

const CreateTipScreen = ({ navigation }: { navigation: Navigation }) => {
  const [image, setImage] = useState('');
  const [inputValues, setInputValues] = useState({
    title: '',
    description: '',
    rating: 1,
    budgetLevel: 1,
    safetyRating: 1,
    safetyComment: '',
    formattedAddress: '',
    picture: 'Placeholder Image',
    latitude: 0,
    longitude: 0,
    tags: [''],
  });

  const getTags = (tags: string[]) => {
    setInputValues({
      ...inputValues,
      tags: tags,
    });
  };

  const dispatch = useDispatch();

  const handleSubmit = useCallback(async () => {
    await dispatch(
      createReview(
        inputValues.title,
        inputValues.description,
        inputValues.rating,
        inputValues.budgetLevel,
        inputValues.safetyRating,
        inputValues.safetyComment,
        inputValues.formattedAddress,
        image,
        inputValues.latitude,
        inputValues.longitude,
        inputValues.tags,
        navigation,
      ),
    );
    dispatch(getAllPOI());
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

  const [budgetCount, setBudgetCount] = useState<number>(1);
  const [safety, setSafety] = useState<number>(1);

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
      <UploadImageComponent
        setImage={setImage}
        image={image}
        pictureStyle={{
          width: Dimensions.get('window').width - 20,
          height: 150,
          borderRadius: 75,
          alignSelf: 'center',
        }}
      />
      <TagsInsertComponent getTags={getTags} />

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
          defaultRating={2}
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
      <View style={styles.dollarView}>
        <Text style={{ paddingRight: 25 }}>Safety Rating</Text>
        <StarRating
          disabled={false}
          starSize={30}
          starStyle={{ paddingHorizontal: 5 }}
          emptyStar={'shield-checkmark-outline'}
          fullStar={'shield-checkmark-sharp'}
          iconSet={'Ionicons'}
          maxStars={3}
          rating={safety}
          selectedStar={(rating: number) => {
            setSafety(rating);
            setInputValues({ ...inputValues, safetyRating: rating });
          }}
          fullStarColor={Colors.blue}
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

      <View style={styles.dollarView}>
        <Text style={{ paddingRight: 50 }}>Budget Level</Text>

        <StarRating
          disabled={false}
          starSize={35}
          starStyle={{ paddingHorizontal: 5 }}
          emptyStar={'dollar'}
          fullStar={'dollar'}
          iconSet={'FontAwesome'}
          maxStars={3}
          rating={budgetCount}
          selectedStar={(rating: number) => {
            setBudgetCount(rating);
            setInputValues({ ...inputValues, budgetLevel: rating });
          }}
          fullStarColor={Colors.green}
        />
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
    // backgroundColor: Colors.white,
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
  dollarView: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
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
