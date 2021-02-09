import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import ViewMoreText from 'react-native-view-more-text';
import { AirbnbRating } from 'react-native-ratings';
import { RouteProp } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import Colors from '../assets/colors';
import { Navigation } from '../interfaces/interfaces';
import { getReviewById, getPOIById } from '../store/actions';
import { Review, SystemState, POI } from '../interfaces/reducerInterfaces';
import StarRating from 'react-native-star-rating';

type RootStackParamList = {
  DisplayTipScreen: { reviewId: string; pointOfInterestId: string };
};

type DisplayTipScreenRouteProp = RouteProp<
  RootStackParamList,
  'DisplayTipScreen'
>;

interface IProps {
  route: DisplayTipScreenRouteProp;
  navigation: Navigation;
}

const DisplayTipScreen = ({ route, navigation }: IProps) => {
  const { reviewId, pointOfInterestId } = route.params;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReviewById(reviewId));
  }, [reviewId]);

  useEffect(() => {
    dispatch(getPOIById(pointOfInterestId));
  }, [pointOfInterestId]);

  const review: Review = useSelector((state: SystemState) => state.review);
  const POI: POI = useSelector((state: SystemState) => state.POI);

  console.log('pointOfInterestId', pointOfInterestId);
  console.log('review', review);
  console.log('POI', POI);

  return (
    <View style={{ flex: 1 }}>
      {review.title !== '' ? (
        <ScrollView style={styles.container}>
          <View style={styles.uploadImageArea}>
            <TouchableOpacity style={styles.uploadImageBtn} onPress={() => {}}>
              <Entypo name="image" size={50} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.tipIntro}>
            <Ionicons name="location-sharp" size={24} color="black" />
            <Text>{POI.formattedAddress}</Text>
          </View>
          <View style={styles.starsView}>
            <AirbnbRating
              count={5}
              defaultRating={review.rating}
              size={20}
              isDisabled={true}
              showRating={false}
            />
          </View>

          <View>
            <View style={{ flexDirection: 'row' }}>
              <Text>Tip name: </Text>
              <Text style={styles.tipTitle}>{review && review.title}</Text>
            </View>
            <Text>Description: </Text>
            <ViewMoreText numberOfLines={3} textStyle={styles.tipText}>
              <Text>{review && review.description}</Text>
            </ViewMoreText>
            <View style={styles.dollarView}>
              <Text style={{ paddingRight: 90 }}>Safety:</Text>
              <View style={styles.starsView}>
                <StarRating
                  disabled={false}
                  starSize={35}
                  starStyle={{ paddingHorizontal: 5 }}
                  emptyStar={'shield-checkmark-outline'}
                  fullStar={'shield-checkmark-sharp'}
                  iconSet={'Ionicons'}
                  maxStars={3}
                  rating={review.safetyRating}
                  fullStarColor={Colors.blue}
                />
              </View>
            </View>

            <View style={styles.dollarView}>
              <Text style={{ paddingRight: 50 }}>Budget Level: </Text>

              <StarRating
                disabled={true}
                starSize={30}
                starStyle={{ paddingHorizontal: 5 }}
                emptyStar={'dollar'}
                fullStar={'dollar'}
                iconSet={'FontAwesome'}
                maxStars={3}
                rating={review.budgetLevel}
                fullStarColor={Colors.green}
              />
            </View>

            <Text style={{ paddingTop: 10 }}>
              xx other travellers found this tip helpful
            </Text>
            <View style={styles.helpfulTip}>
              <TouchableOpacity onPress={() => {}} style={styles.icon}>
                <AntDesign name="like2" size={30} color={Colors.blue} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}} style={styles.icon}>
                <AntDesign name="dislike2" size={30} color={Colors.pink} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={Colors.pink} />
        </View>
      )}
    </View>
  );
};

export default DisplayTipScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
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
    borderRadius: 8,
  },
  tipIntro: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipTitle: {
    fontWeight: 'bold',
  },
  uploadImageBtn: {
    flex: 1,
  },
  helpfulTip: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  starsView: {
    paddingVertical: 20,
    paddingLeft: 5,
  },
  moreTipsBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: Colors.green,
    height: 45,
    width: 100,
  },
  icon: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  tipText: {
    padding: 10,
    textAlign: 'justify',
    // width: '100%',
  },
  dollarView: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
