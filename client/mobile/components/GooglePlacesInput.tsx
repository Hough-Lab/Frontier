import React, { useRef, useState, useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { getLocation, geocodeLocationByName } from '../utils/locationService';
import { GoogleKey } from '../configExemple';

const GooglePlacesInput = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      fetchDetails={true}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log('DATA', data);
        console.log('DETAILS', details);
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
