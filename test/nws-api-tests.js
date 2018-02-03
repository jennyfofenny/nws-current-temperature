import test from 'ava';

const nwsApi = require('../lib/nws-api');

test.cb('Check that NWS API returns temperature for latitude, longitude', t => {
  nwsApi.getNwsPointData(30.27, -97.74, temperature => {
    if (temperature === null) {
      t.fail();
    } else {
      t.pass();
    }

    t.end();
  });
});

test.cb('Check that NWS API returns temperature for latitude, longitude in Celsius', t => {
  nwsApi.getNwsPointData(30.27, -97.74, temperature => {
    if (temperature === null) {
      t.fail();
    } else {
      t.pass();
    }

    t.end();
  }, false);
});
