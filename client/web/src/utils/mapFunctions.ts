export const checkLocationEnabled = () => {
  let pos = { lat: 48.856613, lng: 2.352222 };
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("position :>> ", position.coords.latitude);
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      },
      (err) => {
        alert(`Error (${err.code}): ${err.message}`);
      }
    );
    console.log(pos);
    console.log(navigator.geolocation.getCurrentPosition);
  } else {
    alert("Geolocation is not supported by your browser.");
  }
  return pos;
};
