import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import ViewMoreText from 'react-native-view-more-text';
import { AirbnbRating } from 'react-native-ratings';
import { RouteProp } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import Colors from '../assets/colors';
import { Navigation } from '../interfaces/interfaces';
import { getReviewById, getPOIById } from '../store/actions';
import {
  Review,
  SystemState,
  POI,
  User,
} from '../interfaces/reducerInterfaces';
import StarRating from 'react-native-star-rating';
import TipLike from '../components/TipLikeComponent';

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
  const { reviewId } = route.params;

  const dispatch = useDispatch();

  useEffect(() => {
    const getReview = async () => {
      await dispatch(getReviewById(reviewId));
      dispatch(getPOIById(review.pointOfInterestId));
    };
    getReview();
  }, [reviewId]);

  const review: Review = useSelector((state: SystemState) => state.review);
  const POI: POI = useSelector((state: SystemState) => state.POI);
  const user: User = useSelector((state: SystemState) => state.user);

  return (
    <ScrollView style={{ flex: 1 }}>
      {review.title !== '' ? (
        <View style={styles.container}>
          <Text style={styles.tipTitle}>{review && review.title}</Text>
          <View style={styles.tipIntro}>
            <Ionicons name="location-sharp" size={24} color="black" />
            <Text>{POI.formattedAddress}</Text>
          </View>
          <View style={{ alignSelf: 'flex-start', paddingTop: 5 }}>
            <AirbnbRating
              count={5}
              defaultRating={review.rating}
              size={20}
              isDisabled={true}
              showRating={false}
            />
          </View>
          {review.tags.length > 1 && (
            <View style={styles.tagContainer}>
              {/* <Text>tags</Text> */}
              <FlatList
                horizontal={true}
                data={review.tags}
                renderItem={({ item, index }) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{item}</Text>
                  </View>
                )}
                keyExtractor={(item) => item}
              />
            </View>
          )}
          {review?.picture ? (
            <Image
              source={{ uri: `${review.picture}` }}
              style={styles.upLoadedPicture}
            />
          ) : (
            <View style={styles.uploadImageArea}>
              <TouchableOpacity
                style={styles.uploadImageBtn}
                onPress={() => {}}
              >
                <Entypo name="image" size={50} color="black" />
              </TouchableOpacity>
            </View>
          )}

          <View>
            <Text style={styles.descriptionTitle}>Tip details: </Text>
            <ViewMoreText numberOfLines={3} textStyle={styles.tipText}>
              <Text>{review && review.description}</Text>
            </ViewMoreText>

            <View style={styles.dollarView}>
              <Text style={{ paddingRight: 5, fontWeight: 'bold' }}>
                Safety rating:
              </Text>
              <View style={styles.starsView}>
                <StarRating
                  disabled={false}
                  starSize={30}
                  starStyle={{ paddingHorizontal: 3 }}
                  emptyStar={'shield-checkmark-outline'}
                  fullStar={'shield-checkmark-sharp'}
                  iconSet={'Ionicons'}
                  maxStars={3}
                  rating={review.safetyRating}
                  fullStarColor={Colors.blue}
                />
              </View>
            </View>

            <Text style={styles.descriptionTitle}>Safety comment: </Text>
            <ViewMoreText numberOfLines={3} textStyle={styles.tipText}>
              <Text>{review.safetyComment && review.safetyComment}</Text>
            </ViewMoreText>

            <View style={styles.dollarView}>
              <Text style={{ paddingRight: 5, fontWeight: 'bold' }}>
                Budget level:
              </Text>

              <StarRating
                disabled={true}
                starSize={30}
                starStyle={{ paddingHorizontal: 7 }}
                emptyStar={'dollar'}
                fullStar={'dollar'}
                iconSet={'FontAwesome'}
                maxStars={3}
                rating={review.budgetLevel}
                fullStarColor={Colors.green}
              />
            </View>
            <TipLike review={review} user={user} />
          </View>
        </View>
      ) : (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={Colors.pink} />
        </View>
      )}
    </ScrollView>
  );
};

export default DisplayTipScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: 'white',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  uploadImageArea: {
    width: Dimensions.get('window').width - 20,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.grey,
    padding: 20,
    marginVertical: 20,
    borderRadius: 8,
  },
  upLoadedPicture: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 20,
    marginVertical: 20,
    borderRadius: 8,
  },
  tipIntro: {
    flexDirection: 'row',
    // paddingLeft: 20,
    alignItems: 'center',
  },
  tipTitle: {
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 30,
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
    borderRadius: 8,
    borderColor: Colors.blue,
    borderWidth: 1,
    elevation: 1,
    backgroundColor: 'white',
    height: 'auto',
    width: '100%',
  },
  dollarView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
  },
  descriptionTitle: {
    paddingBottom: 5,
    fontWeight: 'bold',
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
});
