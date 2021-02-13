import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import StarRating from 'react-native-star-rating';

import Colors from '../assets/colors';

interface IProps {
  formattedAddress: String;
  averageRating: number;
  averageSafetyRating: number;
  POIImage: string;
}

const POIImageComponent = ({
  formattedAddress,
  averageRating,
  averageSafetyRating,
  POIImage,
}: IProps) => {
  return (
    <View style={styles.imageArea}>
      {typeof POIImage !== 'undefined' ? (
        <Image style={styles.imageBackdrop} source={{ uri: POIImage }} />
      ) : (
        <Image
          style={styles.imageBackdrop}
          source={require('../assets/images/placeholder-image10.jpg')}
        />
      )}
      <View style={styles.titleView}>
        <Text style={styles.title}>{formattedAddress}</Text>
      </View>
      <View>
        <View style={styles.starsView}>
          <StarRating
            disabled={true}
            starSize={30}
            starStyle={{ paddingHorizontal: 5 }}
            emptyStar={'shield-checkmark-outline'}
            fullStar={'shield-checkmark-sharp'}
            iconSet={'Ionicons'}
            maxStars={3}
            rating={averageSafetyRating}
            fullStarColor={Colors.blue}
          />
        </View>
        <View style={styles.starsSafety}>
          <AirbnbRating
            count={5}
            defaultRating={averageRating}
            size={20}
            isDisabled={true}
            showRating={false}
          />
        </View>
      </View>
    </View>
  );
};

export default POIImageComponent;

const styles = StyleSheet.create({
  imageArea: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 20,
    borderRadius: 10,
  },
  imageBackdrop: {
    width: '100%',
    height: 200,
    borderRadius: 20,
  },
  titleView: {
    position: 'absolute',
    backgroundColor: Colors.green,
    borderRadius: 10,
    padding: 10,
    width: 'auto',
    top: 25,
    left: -10,
  },
  title: {
    color: Colors.white,
    fontSize: 20,
  },
  titleLocation: {
    color: Colors.white,
    fontSize: 12,
  },
  starsView: {
    position: 'absolute',
    paddingLeft: 5,
    bottom: 50,
    left: -160,
  },
  starsSafety: {
    position: 'absolute',
    paddingLeft: 5,
    bottom: 10,
    left: -160,
  },
});
