import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import ViewMoreText from 'react-native-view-more-text';

import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import Colors from '../assets/colors';

const DisplayTipScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.uploadImageArea}>
        <TouchableOpacity style={styles.uploadImageBtn} onPress={() => {}}>
          <Entypo name="image" size={50} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.tipIntro}>
        <Ionicons name="location-sharp" size={24} color="black" />
        <Text>here goes the address</Text>
        <Text>need to add rating stars</Text>
      </View>

      <View>
        <Text style={styles.tipTitle}>Tip Title</Text>
        <ViewMoreText numberOfLines={3} style={{ width: '100%' }}>
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </Text>
        </ViewMoreText>

        <Text>xx other travellers found this tip helpful</Text>
        <View style={styles.helpfulTip}>
          <TouchableOpacity onPress={() => {}}>
            <AntDesign name="like2" size={30} color={Colors.blue} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
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
  helpfulTip: {
    flexDirection: 'row',
  },
  tipIntro: {
    flexDirection: 'row',
  },
  tipTitle: {
    fontWeight: 'bold',
  },
  moreTipsBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: Colors.green,
    height: 45,
    width: 100,
  },
});
