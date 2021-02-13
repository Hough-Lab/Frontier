import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  UIManager,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';

import { AntDesign, MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Navigation } from '../interfaces/interfaces';
import { applyAnimation } from '../utils/generalFunctions';

const BottomTabBar = ({ navigation }: { navigation: Navigation }) => {
  const [plusPressed, setPlusPressed] = useState(false);

  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('MainStackNavigator', {
              screen: 'HomeScreen',
            })
          }
        >
          <MaterialIcons name="home-filled" size={35} color="black" />
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          style={[styles.plusBtn, plusPressed && styles.plusBtnPressed]}
          activeOpacity={0.7}
          onPress={() => {
            setPlusPressed(!plusPressed);
            applyAnimation();
          }}
        >
          <AntDesign name="pluscircle" size={50} color="black" />
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('MainStackNavigator', {
              screen: 'UserProfileScreen',
            })
          }
        >
          <Ionicons name="person-circle" size={35} color="black" />
        </TouchableOpacity>
      </View>

      {plusPressed && (
        <>
          <TouchableWithoutFeedback
            style={styles.dismissArea}
            onPress={() => {
              setPlusPressed(!plusPressed);
              applyAnimation();
            }}
          >
            <View style={styles.dismissArea}></View>
          </TouchableWithoutFeedback>
          <View
            style={[
              styles.animatedBtnView,
              plusPressed && styles.eventExpanded,
            ]}
          >
            <TouchableOpacity
              style={styles.eventBtn}
              onPress={() => {
                navigation.navigate('EventNavigator', {
                  screen: 'CreateEventScreen',
                });
                setPlusPressed(!plusPressed);
                applyAnimation();
              }}
            >
              <MaterialIcons name="event" size={30} color={Colors.white} />
            </TouchableOpacity>
          </View>

          <View
            style={[styles.animatedBtnView, plusPressed && styles.tipExpanded]}
          >
            <TouchableOpacity
              style={styles.eventBtn}
              onPress={() => {
                navigation.navigate('TipNavigator', {
                  screen: 'CreateTipScreen',
                });
                setPlusPressed(!plusPressed);
                applyAnimation();
              }}
            >
              <Entypo name="star" size={30} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default BottomTabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    padding: 10,
    height: 50,
  },
  plusBtn: {
    position: 'relative',
    top: -30,
    backgroundColor: Colors.white,
    borderRadius: 50,
    elevation: 5,
  },
  plusBtnPressed: {
    transform: [{ rotate: '45deg' }],
  },
  animatedBtnView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black,
    borderRadius: 50,
    width: 50,
    height: 50,
    elevation: 5,
    left: 170,
    top: -20,
    opacity: 0,
    transform: [{ scale: 0 }],
  },
  dismissArea: {
    position: 'absolute',
    width: 600,
    height: 1000,
    bottom: 0,
    left: 0,
  },
  eventExpanded: {
    transform: [{ translateX: -100 }, { translateY: -100 }, { scale: 1 }],
    opacity: 1,
  },
  tipExpanded: {
    transform: [{ translateX: 100 }, { translateY: -100 }, { scale: 1 }],
    opacity: 1,
  },
  eventBtn: {},
});
