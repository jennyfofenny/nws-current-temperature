# nws-current-temperature
NWS-Current-Temperature is a library that provides functionality to obtain the current temperature in a location using zip code, city name, or address within the United States. It uses the [Google Geocoding Service](https://developers.google.com/maps/documentation/javascript/geocoding), as well as the [NWS Forecast Pages](https://forecast-v3.weather.gov/documentation?redirect=legacy). You will need to configure a Google API key for your application to use the library.

[![npm package](https://nodei.co/npm/nws-current-temperature.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/nws-current-temperature/)

[![Build Status](https://img.shields.io/travis/jennyfofenny/nws-current-temperature/master.svg)](https://travis-ci.org/jennyfofenny/nws-current-temperature)
[![Dependency Status](https://david-dm.org/jennyfofenny/nws-current-temperature.svg)](https://david-dm.org/jennyfofenny/nws-current-temperature)
[![Known Vulnerabilities](https://snyk.io/test/github/jennyfofenny/nws-current-temperature/badge.svg)](https://snyk.io/test/github/jennyfofenny/nws-current-temperature)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

## Installation

Use npm to install the nws-current-temperature library:

`npm install nws-current-temperature --save`


## Configuration

Use the [Google API Console](https://console.developers.google.com/flows/enableapi?apiid=maps_backend,geocoding_backend,directions_backend,distance_matrix_backend,elevation_backend,places_backend&reusekey=true) to create an API key for your application and update the value of the `geocodingApiKey` field in the `config.json` file located in `node_modules/nws-current-temperature`. Additionally, set the `nwsUserAgent` to the name of your application. Finally, the `temperatureDecimalPrecision` can be changed to adjust the precision of the temperature that is returned from the library.

## Usage

**nws-current-temperature** can be included as a reference.

```
const nwsCurrentTemperature = require('nws-current-temperature');

const location = 'Austin, TX';
nwsCurrentTemperature.getTemperatureFor(location, temperature => {
  console.log(location + ': ' + temperature + '°F');
});
```

## License

MIT © [Jennifer Rogers](http://www.jennifersemtner.com)