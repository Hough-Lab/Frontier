import React from 'react';
import MapComponent from '../../components/MapComponent/MapComponent';

interface IProps {
  userCoordinates: {
    lat: number;
    lng: number;
  };
}

function HomeScreen({ userCoordinates }: IProps) {
  console.log('userCoordinates in HomeScreen:>> ', userCoordinates);
  return (
    <div>
      <MapComponent
        userCoordinates={userCoordinates}
        style={{ minWidth: '340px', minHeight: '400px' }}
      />
    </div>
  );
}

export default HomeScreen;
