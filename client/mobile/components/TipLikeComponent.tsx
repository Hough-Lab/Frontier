import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

import { Event, Review, User } from '../interfaces/reducerInterfaces';
import Colors from '../assets/colors';
import {
  likeReview,
  undoLikeReview,
  dislikeReview,
  undoDislikeReview,
} from '../store/actions';

interface IProps {
  review: Review;
  user: User;
}

function TipLike({ review, user }: IProps) {
  const dispatch = useDispatch();

  const iconLikeColor = () => {
    if (review?.likedBy?.indexOf(user.userId) !== -1) {
      return Colors.pink;
    } else {
      return Colors.grey;
    }
  };

  const iconDislikeColor = () => {
    if (review?.likedBy?.indexOf(user.userId) !== -1) {
      return Colors.blue;
    } else {
      return Colors.grey;
    }
  };

  const pressLikeReview = async () => {
    if (review?.likedBy?.indexOf(user.userId) === -1) {
      if (review?.dislikedBy?.indexOf(user.userId) !== -1) {
        await dispatch(undoDislikeReview(review.reviewId));
      }
      dispatch(likeReview(review.reviewId));
    } else {
      dispatch(undoLikeReview(review.reviewId));
    }
  };

  const pressDislikeReview = async () => {
    if (review?.dislikedBy?.indexOf(user.userId) === -1) {
      if (review?.likedBy?.indexOf(user.userId) !== -1) {
        await dispatch(undoLikeReview(review.reviewId));
      }
      dispatch(dislikeReview(review.reviewId));
    } else {
      dispatch(undoDislikeReview(review.reviewId));
    }
  };

  return (
    <View style={{ paddingTop: 15 }}>
      {/* //TODO update the below when possible */}
      <Text>xx other travellers found this tip helpful</Text>
      <View style={styles.helpfulTip}>
        <TouchableOpacity onPress={pressLikeReview}>
          <AntDesign name="like2" size={30} color={iconLikeColor()} />
        </TouchableOpacity>
        <TouchableOpacity onPress={pressDislikeReview}>
          <AntDesign name="dislike2" size={30} color={iconDislikeColor()} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  helpfulTip: {
    flexDirection: 'row',
    paddingTop: 20,
  },
});

export default TipLike;
