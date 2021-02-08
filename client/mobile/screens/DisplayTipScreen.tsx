import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import ViewMoreText from 'react-native-view-more-text';
import { AirbnbRating } from 'react-native-ratings';
import { RouteProp } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import Colors from '../assets/colors';
import { Navigation } from '../interfaces/interfaces';
import { getReviewById } from '../store/actions';
import { Review, SystemState } from '../interfaces/reducerInterfaces';

type RootStackParamList = {
  DisplayTipScreen: { reviewId: string };
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
    dispatch(getReviewById(reviewId));
  }, [reviewId]);

  const review: Review = useSelector((state: SystemState) => state.review);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.uploadImageArea}>
        <TouchableOpacity style={styles.uploadImageBtn} onPress={() => {}}>
          <Entypo name="image" size={50} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.tipIntro}>
        <Ionicons name="location-sharp" size={24} color="black" />
        <Text>{review.reviewId}</Text>
      </View>
      <View style={styles.starsView}>
        <AirbnbRating
          count={5}
          defaultRating={5}
          size={20}
          isDisabled={true}
          showRating={false}
        />
      </View>

      <View>
        <Text style={styles.tipTitle}>Tip Title</Text>
        <ViewMoreText numberOfLines={3} textStyle={styles.tipText}>
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </Text>
        </ViewMoreText>

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
  );
};

export default DisplayTipScreen;

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
});
