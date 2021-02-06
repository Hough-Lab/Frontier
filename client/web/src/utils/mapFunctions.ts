import { store } from '../index';
import { updateCoords } from '../actions/coordinatesActions';

export const checkLocationEnabled = () => {
  let pos = { lat: 48.856613, lng: 2.352222 };
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        console.log('pos before dispatch:', pos);
        store.dispatch(updateCoords(pos));
      },
      (err) => {
        alert(`Error (${err.code}): ${err.message}`);
      },
    );
  } else {
    alert('Geolocation is not supported by your browser.');
  }
};
