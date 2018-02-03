const https = require('https');
const config = require('../config');

const geocodingApi = 'https://maps.googleapis.com/maps/api/geocode/json';

function roundCoordinateForNws(coordinate) {
  return coordinate.toFixed(2);
}

module.exports = {
  getPointFromGeocoding: (address, callback) => {
    const urlEncodedAddress = encodeURIComponent(address);
    https.get(geocodingApi + '?address=' + urlEncodedAddress + '&key=' + config.geocodingApiKey, resp => {
      let data = '';

      resp.on('data', chunk => {
        data += chunk;
      });

      resp.on('end', () => {
        const jsonData = JSON.parse(data);
        if (jsonData.results === null || jsonData.results.length === 0) {
          throw new Error('An error occurred with the Geocoding API');
        }

        const location = jsonData.results[0].geometry.location;
        const lat = roundCoordinateForNws(location.lat);
        const lng = roundCoordinateForNws(location.lng);

        callback(lat, lng);
      });
    })
    .on('error', err => {
      throw new Error('An error occurred with the Geocoding API: ' + err);
    });
  }
};
