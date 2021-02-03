import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

import { Navigation } from '../interfaces/interfaces';
import Colors from '../assets/colors';
import POIImageComponent from '../components/POIImageComponent';

const DisplayPOIScreen = ({ navigation }: { navigation: Navigation }) => {
  const [eventsTab, setEventsTab] = useState(true);

  return (
    <View style={styles.container}>
      <POIImageComponent />

      {/* Events and Tips buttons */}
      <View style={styles.eventsTipsBtnsContainer}>
        <TouchableOpacity
          style={styles.eventsBtn}
          activeOpacity={0.7}
          onPress={() => setEventsTab(true)}
        >
          <Text style={styles.eventsBtnText}>Events</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tipsBtn}
          activeOpacity={0.7}
          onPress={() => setEventsTab(false)}
        >
          <Text style={styles.tipsBtnText}>Travel Tips</Text>
        </TouchableOpacity>
      </View>

      {/* Event or Tips LIST section */}
      <ScrollView
        style={
          eventsTab ? styles.eventsListContainer : styles.tipsListContainer
        }
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
          <View key={index} style={styles.listItemView}>
            <Image
              style={styles.imageListItem}
              source={require('../assets/images/placeholder.jpg')}
            />
            <Text style={styles.listItemText}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy...
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default DisplayPOIScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 0,
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
    backgroundColor: Colors.blue,
    height: 50,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tipsBtnText: {
    fontSize: 20,
    color: Colors.white,
  },
  eventsListContainer: {
    flex: 1,
    backgroundColor: Colors.pink,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingTop: 10,
  },
  tipsListContainer: {
    flex: 1,
    backgroundColor: Colors.blue,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingTop: 10,
  },
  listItemView: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    padding: 10,
    margin: 15,
    marginTop: 0,
    borderRadius: 10,
  },
  listItemText: {
    paddingHorizontal: 10,
    flexShrink: 1,
  },
  imageListItem: {
    height: 75,
    width: 75,
  },
});
