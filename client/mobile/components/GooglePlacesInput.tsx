import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GoogleKey } from '../config';

import Colors from '../assets/colors';

const GooglePlacesInput = ({ getLocation }: { getLocation: Function }) => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      minLength={2}
      fetchDetails={true}
      onPress={(data, details) => {
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
        textInput: {
          backgroundColor: '#f5f3f4',
          borderRadius: 8,
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
