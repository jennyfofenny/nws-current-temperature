'use strict';

const geoCodingApi = require('./lib/geo-coding-api');
const nwsApi = require('./lib/nws-api');

function getTemperatureFor(address, callback, isFahrenheit = true) {
  if (!callback) {
    throw new Error('Callback must be set to receive the temperature result.');
  }

  geoCodingApi.getPointFromGeocoding(address, (lat, lng) => {
    nwsApi.getNwsPointData(lat, lng, callback, isFahrenheit);
  }, isFahrenheit);
}

module.exports = getTemperatureFor;
