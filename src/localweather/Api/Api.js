/* @flow */

import type {
  ApiParams,
  Forecast,
  DailyTemperature,
  DailyForecast,
  Daily,
  Weather,
  FiveDayForecast,
} from '../localweather.types';

import {
  serialize,
  dateString,
  appendSuffix,
  ResponseError,
  convertFahrenheitToCelsius,
} from 'common/js/utils';

import fetchJsonp from 'fetch-jsonp';
import { checkHeaders } from 'common/js/utils';
import { openweatherApiParams } from '../Models';
import OPEN_WEATHER_APPID from 'protected/localweather.key';

const fetchWeather = async (url: string): Promise<Weather> => {
  /* Fetch initial resource after delay, direct fetching leads to:

     Fetch API cannot load
       http://api.openweathermap.org/data/2.5/forecast?
       lat=40.247796099999995&
       lon=-75.64445769999999&
       units=imperial&
       APPID=c26ef1df98c449f37f8f199738ce74c7.

     Request header field content-type is not allowed
     by Access-Control-Allow-Headers in preflight response.

     "The server (that the POST request is sent to) needs to include the
       Access-Control-Allow-Headers header (etc) in its response."

     i.e., since the server doesn't allow CORS, we're out of luck
     http://stackoverflow.com/
     questions/25727306/
     request-header-field-access-control-allow-headers-is-not-allowed-by-access-contr

     using JSONP + validation to bypass
  */

  const opts = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  return await fetchJsonp(url, opts)
    .then(checkHeaders)
    .then(processWeather)
    .catch(error => {
      //console.error('fetchJsonp failed', error);
      return null;
    });
};

const processWeather = (data: FiveDayForecast): Weather => ({
  city: data.city.name,
  now: Date.now(),
  forecasts: data.list.map(processForecasts).map(stripDateIfRedundant),
});

const processForecasts = (outlook: Forecast): DailyForecast => ({
  icon: `http://openweathermap.org/img/w/${outlook.weather[0].icon}.png`,
  rain: (outlook.rain && outlook.rain['3h']) || 0,
  snow: (outlook.snow && outlook.snow['3h']) || 0,
  description: outlook.weather[0].description,
  weather: outlook.weather[0].main,
  cloud: outlook.clouds.all,
  temp: {
    celsius: convertFahrenheitToCelsius(outlook.main.temp),
    fahrenheit: outlook.main.temp,
  },
  ...parseTime(outlook.dt),
});

const parseTime = (time: number) => {
  const duration = new Date(time * 1000);
  const hours = duration.getHours() % 12;
  const minutes = duration.getMinutes();

  return { day: dateString(duration), time: `${hours}:${minutes}0` };
};

const stripDateIfRedundant = (
  today: Daily,
  index: number,
  seq: Array<Daily>,
): Daily => {
  const { day, ...rest } = today;
  const dateRedundant = index > 0 && seq[index - 1].day === day;

  if (dateRedundant) return { day: '', ...rest };
  return { day, ...rest };
};

export {
  fetchWeather,
  processWeather,
  processForecasts,
  parseTime,
  stripDateIfRedundant,
};
