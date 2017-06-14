/* @flow */

import { OPEN_WEATHER_APPID } from 'common/js/api_keys';

const endpoint = 'http://api.openweathermap.org/data/2.5/forecast';
const openweatherApiParams = (lat: number, lon: number) => ({
  lat: lat,
  lon: lon,
  units: 'imperial',
  APPID: OPEN_WEATHER_APPID,
});

export { endpoint, openweatherApiParams };
