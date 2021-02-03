import React from 'react';
import MapComponent from '../../components/MapComponent/MapComponent';

function HomeScreen() {
  return (
    <div>
      <MapComponent style={{ minWidth: '340px', minHeight: '400px' }} />
    </div>
  );
}

export default HomeScreen;
