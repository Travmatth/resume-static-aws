/* @flow */

import { trim } from 'common/js/utils';
import OPEN_WEATHER_APPID from 'protected/localweather.key';

const ENDPOINT = 'http://api.openweathermap.org/data/2.5/forecast';
const openweatherApiParams = (lat: number, lon: number) => ({
  lat,
  lon,
  units: 'imperial',
  APPID: trim(OPEN_WEATHER_APPID),
});

export { ENDPOINT, openweatherApiParams };
