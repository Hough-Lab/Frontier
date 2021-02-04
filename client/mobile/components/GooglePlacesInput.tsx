import React, { useRef, useState, useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { getLocation, geocodeLocationByName } from '../utils/locationService';
import { GoogleKey } from '../config';

import Colors from '../assets/colors';

const GooglePlacesInput = ({ getLocation }) => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      minLength={2}
      fetchDetails={true}
      onPress={(data, details) => {
        // 'details' is provided when fetchDetails = true
        // console.log('pressed');
        // console.log('DATA', data);
        // console.log('DETAILS', details);
        getLocation(
          details?.formatted_address,
          details?.geometry.location.lat,
          details?.geometry.location.lng,
        );
      }}
      enablePoweredByContainer={false}
      styles={{
        description: {
          color: Colors.green,
        },
        predefinedPlacesDescription: {
          color: Colors.pink,
        },
      }}
      query={{
        key: GoogleKey,
        language: 'en',
      }}
    />
  );
};

export default GooglePlacesInput;

const styles = StyleSheet.create({});
