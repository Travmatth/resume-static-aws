/* @flow */

import type {
  Forecast,
  DailyForecast,
  Weather,
  FiveDayForecast,
} from '../localweather.types';
import {
  serialize,
  dateString,
  convertFahrenheitToCelsius,
} from 'common/js/utils';
import fetchJsonp from 'fetch-jsonp';
import { checkHeaders } from 'common/js/utils';
import OPEN_WEATHER_APPID from 'protected/localweather.key';
import { ENDPOINT, OPENWEATHER_API_PARAMS } from '../Models';

const fetchOpts = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

/* fetchWeather uses given Coordinates to fetch weather data
 */
const fetchWeather = async (coords: Coordinates): Promise<Weather> => {
  const { latitude: lat, longitude: lon } = coords;
  const url: string = serialize(ENDPOINT, OPENWEATHER_API_PARAMS(lat, lon));

  /* Request header field content-type is not allowed
       by Access-Control-Allow-Headers in preflight response.
     using JSONP to bypass
  */
  return await fetchJsonp(url, fetchOpts)
    .then(res => res.json())
    .then(processWeather)
    .catch(thrown => ({
      error: true,
      thrown,
    }));
};

/* processWeather normalizes response into object
 */
const processWeather = (data: FiveDayForecast): Weather => ({
  error: false,
  city: data.city.name,
  forecasts: data.list.map(processForecasts).map(stripDateIfRedundant),
});

/* processForecasts strips unneeded props or provides defaults for others
 */
const processForecasts = (outlook: Forecast): DailyForecast => ({
  icon: `http://openweathermap.org/img/w/${outlook.weather[0].icon}.png`,
  rain: (outlook.rain && outlook.rain['3h']) || 0,
  snow: (outlook.snow && outlook.snow['3h']) || 0,
  description: (outlook.weather[0] && outlook.weather[0].description) || '',
  weather: (outlook.weather[0] && outlook.weather[0].main) || '',
  cloud: (outlook.clouds && outlook.clouds.all) || '',
  temp: {
    celsius: convertFahrenheitToCelsius(outlook.main.temp),
    fahrenheit: (outlook.main && outlook.main.temp) || '',
  },
  ...parseTime(outlook.dt),
});

/* processForecasts uses Date returns time related strings
 */
const parseTime = (time: number) => {
  const duration = new Date(time * 1000);
  const hours = duration.getHours() % 12;
  const minutes = duration.getMinutes();

  return { day: dateString(duration), time: `${hours}:${minutes}0` };
};

/* stripDateIfRedundant filters out redundant dates from forecasts
 */
const stripDateIfRedundant = (
  today: Daily,
  index: number,
  seq: Array<Daily>,
): Daily => {
  const { day, ...rest } = today;
  const dateIsRedundant = index > 0 && seq[index - 1].day === day;

  if (dateIsRedundant) return { day: '', ...rest };
  return { day, ...rest };
};

export {
  fetchWeather,
  processWeather,
  processForecasts,
  parseTime,
  stripDateIfRedundant,
};
