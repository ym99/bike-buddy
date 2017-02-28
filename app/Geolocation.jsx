export function readGeoLocation(callback) {
  if (!navigator.geolocation) {
    return null;
  }

  navigator.geolocation.getCurrentPosition(callback);
}
