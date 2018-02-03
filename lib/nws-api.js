const https = require('https');
const {URL} = require('url');
const config = require('../config');
const temperatureConversion = require('./temperature-conversion');

const nwsApiHostname = 'api.weather.gov';
const nwsApiHeaders = {
  'User-Agent': config.nwsUserAgent,
  Accept: 'application/vnd.noaa.dwml+xml;version=1'
};

function roundTemperatureDecimal(temperature) {
  return temperature.toFixed(config.temperatureDecimalPrecision);
}

function getNwsObservationStations(observationStationsUrl, callback, isFahrenheit) {
  const urlObj = new URL(observationStationsUrl);
  const nwsHttpsOptionsObservationStations = {
    hostname: nwsApiHostname,
    path: urlObj.pathname,
    headers: nwsApiHeaders
  };

  https.get(nwsHttpsOptionsObservationStations, resp => {
    let data = '';

    resp.on('data', chunk => {
      data += chunk;
    });

    resp.on('end', () => {
      const jsonData = JSON.parse(data);
      const observationStations = jsonData.observationStations;
      if (observationStations === null) {
        throw new Error('There are no observation stations for the location provided');
      }

      getNwsCurrentStationData(observationStations[0], callback, isFahrenheit);
    });
  }).on('error', err => {
    throw new Error('An error occurred getting observation stations with the NWS API: ' + err);
  });
}

function getNwsCurrentStationData(stationUrl, callback, isFahrenheit) {
  const urlObj = new URL(stationUrl);
  const nwsHttpsOptionsCurrentStation = {
    hostname: nwsApiHostname,
    path: urlObj.pathname + '/observations/current',
    headers: nwsApiHeaders
  };

  https.get(nwsHttpsOptionsCurrentStation, resp => {
    let data = '';

    resp.on('data', chunk => {
      data += chunk;
    });

    resp.on('end', () => {
      const jsonData = JSON.parse(data);
      const temperature = jsonData.properties.temperature.value;
      if (temperature === null) {
        throw new Error('There was no temperature data for the station provided');
      }

      if (isFahrenheit) {
        const currentDegreesF = temperatureConversion.celsiusToFahrenheit(temperature);
        callback(roundTemperatureDecimal(currentDegreesF));
      } else {
        callback(roundTemperatureDecimal(temperature));
      }
    });
  }).on('error', err => {
    throw new Error('An error occurred getting current station data with the NWS API: ' + err);
  });
}

module.exports = {
  getNwsPointData: (lat, lng, callback, isFahrenheit) => {
    const location = lat + ',' + lng;
    const nwsHttpsOptionsPoint = {
      hostname: nwsApiHostname,
      path: '/points/' + location,
      headers: nwsApiHeaders
    };

    https.get(nwsHttpsOptionsPoint, resp => {
      let data = '';

      resp.on('data', chunk => {
        data += chunk;
      });

      resp.on('end', () => {
        const jsonData = JSON.parse(data);
        if (jsonData.properties === null) {
          throw new Error('There was no data returned for the location provided');
        }

        const observationStationsUrl = jsonData.properties.observationStations;
        if (observationStationsUrl === null) {
          throw new Error('There are no observation stations for the location provided');
        }

        getNwsObservationStations(observationStationsUrl, callback, isFahrenheit);
      });
    }).on('error', err => {
      throw new Error('An error occurred getting point data with the NWS API: ' + err);
    });
  }
};
