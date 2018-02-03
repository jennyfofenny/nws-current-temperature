import test from 'ava';

const geoCodingApi = require('../lib/geo-coding-api');

test.cb('Check that Geocoding API returns latitude and longitude for City, State', t => {
  geoCodingApi.getPointFromGeocoding('Austin, TX', (lat, lng) => {
    if (lat === null || lng === null) {
      t.fail();
    } else {
      t.pass();
    }

    t.end();
  });
});

test.cb('Check that Geocoding API returns latitude and longitude for zip code', t => {
  geoCodingApi.getPointFromGeocoding('78705', (lat, lng) => {
    if (lat === null || lng === null) {
      t.fail();
    } else {
      t.pass();
    }

    t.end();
  });
});

test.cb('Check that Geocoding API returns latitude and longitude for address', t => {
  geoCodingApi.getPointFromGeocoding('110 Inner Campus Drive. Austin, TX 78705', (lat, lng) => {
    if (lat === null || lng === null) {
      t.fail();
    } else {
      t.pass();
    }

    t.end();
  });
});
