import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';

import { Navigation } from '../interfaces/interfaces';
import Colors from '../assets/colors';

const DisplayPOIScreen = ({ navigation }: { navigation: Navigation }) => {
  return (
    <View style={styles.container}>
      {/* Image section */}
      <View style={styles.imageArea}>
        <Image
          style={styles.imageBackdrop}
          source={require('../assets/images/placeholder.jpg')}
        />
        <View style={styles.titleView}>
          <Text style={styles.title}>PostgreSQL Party</Text>
          <Text style={styles.titleLocation}>
            23 Long Road, London, AB12 3CD
          </Text>
        </View>
      </View>

      {/* Events and Tips buttons */}
      <View style={styles.eventsTipsBtnsContainer}>
        <TouchableOpacity style={styles.eventsBtn}>
          <Text style={styles.eventsBtnText}>Events</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tipsBtn}>
          <Text style={styles.tipsBtnText}>Travel Tips</Text>
        </TouchableOpacity>
      </View>

      {/* Event or Tips LIST section */}
      <ScrollView style={styles.eventsTipsListContainer}>
        <View style={StyleSheet.listItemView}></View>
      </ScrollView>
    </View>
  );
};

export default DisplayPOIScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  imageArea: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.grey,
    marginVertical: 40,
    borderRadius: 10,
  },
  imageBackdrop: {
    width: '100%',
    height: 200,
    borderRadius: 20,
  },
  titleView: {
    position: 'absolute',
    backgroundColor: Colors.blue,
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
  eventsTipsBtnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  eventsBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.pink,
    height: 50,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  eventsBtnText: {
    fontSize: 20,
  },
  tipsBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.pink,
    height: 50,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tipsBtnText: {
    fontSize: 20,
  },
  eventsTipsListContainer: {
    flex: 1,
    backgroundColor: Colors.pink,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  listItemView: {
    backgroundColor: Colors.white,
  },
});
