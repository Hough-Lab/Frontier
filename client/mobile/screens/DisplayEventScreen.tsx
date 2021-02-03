import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Colors from '../assets/colors';
import { AntDesign, Entypo, Ionicons, FontAwesome } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';

const DisplayEventScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text>date and time of the event</Text>
        <View style={styles.tagsContainer}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>tag 1</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>tag 1</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>tag 1</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>tag 1</Text>
          </View>
        </View>

        <View style={styles.uploadImageArea}>
          <TouchableOpacity style={styles.uploadImageBtn} onPress={() => {}}>
            <Entypo name="image" size={50} color="black" />
          </TouchableOpacity>
        </View>

        <MapView
          style={styles.uploadImageArea}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: 37.78825,
              longitude: -122.4324,
            }}
            title={'A place'}
            description={'Descriptions go here'}
          />
        </MapView>

        <View style={styles.address}>
          <Ionicons name="location-sharp" size={24} color="black" />
          <Text>here goes the address</Text>
        </View>

        <View style={styles.description}>
          <Text style={styles.descriptionText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure
          </Text>
        </View>

        <View>
          <Text>Going</Text>
          <Text>Interested</Text>
        </View>
      </ScrollView>

      <View style={styles.userStatusContainer}>
        <View style={styles.userStatus}>
          <AntDesign name="check" size={24} color={Colors.pink} />
          <Text>I'm going!</Text>
        </View>
        <View style={styles.userStatus}>
          <FontAwesome name="star-o" size={24} color={Colors.grey} />
          <Text>I'm interested</Text>
        </View>
      </View>
    </View>
  );
};

export default DisplayEventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: Colors.white,
  },
  tag: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: Colors.pink,
    height: 20,
    width: 'auto',
  },
  tagText: {
    color: Colors.white,
    padding: 10,
    fontSize: 10,
  },
  description: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: Colors.pink,
    height: 'auto',
    width: '100%',
  },
  descriptionText: {
    color: Colors.white,
    padding: 15,
    textAlign: 'justify',
  },
  tagsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
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
  address: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userStatus: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  userStatusContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
  },
});
