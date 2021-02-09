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

  const calculateTipLikes = () => {
    return review.likedBy.length - review.dislikedBy.length;
  };

  const iconLikeColor = () => {
    if (review?.likedBy?.indexOf(user.userId) !== -1) {
      return Colors.blue;
    } else {
      return Colors.grey;
    }
  };

  const iconDislikeColor = () => {
    if (review?.dislikedBy?.indexOf(user.userId) !== -1) {
      return Colors.pink;
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

    <View style={styles.likeButtonsContainer}>
      <Text style={{ paddingTop: 10 }}>
        {calculateTipLikes()} travellers found this tip helpful
      </Text>

      <View style={styles.helpfulTip}>
        <TouchableOpacity onPress={pressLikeReview}>
          <AntDesign
            name="like2"
            style={styles.icon}
            size={35}
            color={iconLikeColor()}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={pressDislikeReview}>
          <AntDesign
            name="dislike2"
            style={styles.icon}
            size={35}
            color={iconDislikeColor()}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    padding: 20,
  },
  helpfulTip: {
    flexDirection: 'row',
    paddingTop: 20,
  },
  likeButtonsContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TipLike;
