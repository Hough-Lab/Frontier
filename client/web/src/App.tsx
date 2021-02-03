import React, { useState, useEffect } from 'react';

import HomeScreen from './screens/HomeScreen/HomeScreen';

const queryClient = new QueryClient();

function App() {
  const [userCoordinates, setUserCoordinates] = useState({
    lat: 48.856613,
    lng: 2.352222,
  });

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('position :>> ', position);
          setUserCoordinates({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          console.log(
            `Lat: ${position.coords.latitude} Lng: ${position.coords.longitude}`,
          );
        },
        (err) => alert(`Error (${err.code}): ${err.message}`),
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  }, [setUserCoordinates]);

  return (
    <div className="App">
      <HomeScreen userCoordinates={userCoordinates} />
    </div>
  );
}

export default App;
