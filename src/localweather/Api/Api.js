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
import { ENDPOINT, openweatherApiParams } from '../Models';

const fetchOpts = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 5000,
};

const parseTime = (time: number) => {
  const duration = new Date(time * 1000);
  const hours = duration.getHours() % 12;
  const minutes = duration.getMinutes();

  return { day: dateString(duration), time: `${hours}:${minutes}0` };
};

const processForecasts = (outlook: Forecast): DailyForecast => ({
  icon: `http://openweathermap.org/img/w/${outlook.weather[0].icon}.png`,
  rain: (outlook.rain && outlook.rain['3h']) || 0,
  snow: (outlook.snow && outlook.snow['3h']) || 0,
  description: (outlook.weather[0] && outlook.weather[0].description) || '',
  weather: (outlook.weather[0] && outlook.weather[0].main) || '',
  cloud: (outlook.clouds && outlook.clouds.all) || 0,
  temp: {
    celsius: convertFahrenheitToCelsius(outlook.main.temp),
    fahrenheit: (outlook.main && outlook.main.temp) || '',
  },
  ...parseTime(outlook.dt),
});

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

const processWeather = (data: FiveDayForecast): Weather => ({
  error: false,
  city: data.city.name,
  forecasts: data.list.map(processForecasts).map(stripDateIfRedundant),
});

const fetchWeather = async (coords: Coordinates): Promise<Weather> => {
  const { latitude: lat, longitude: lon } = coords;
  const url: string = serialize(ENDPOINT, openweatherApiParams(lat, lon));

  /* Request header field content-type is not allowed
       by Access-Control-Allow-Headers in preflight response.
     using JSONP to bypass
  */
  return await fetchJsonp(url, fetchOpts)
    .then(checkHeaders)
    .then(processWeather)
    .catch(thrown => ({
      city: 'GET WEATHER',
      error: true,
      thrown,
    }));
};

export {
  fetchWeather,
  processWeather,
  processForecasts,
  parseTime,
  stripDateIfRedundant,
};
