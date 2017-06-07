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
import { checkHeaders } from 'common/utils';

/*
  Libraries
*/

import {
  serialize,
  dateString,
  appendSuffix,
  ResponseError,
  convertFahrenheitToCelsius,
} from 'common/utils';
import { OPEN_WEATHER_APPID } from 'common/api_keys';
import { endpoint, openweatherApiParams } from './constants';

/*
  Network call
*/

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

     Should I use JSONP + validation, will this work?
     Or set up proxy on heroku?
  */

  const opts = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  // Stubbing out fetch while designing layout
  // const data = [JSON.stringify(MOCK.response)]
  // const blob = new Blob(data, { type: 'application/json' });
  // const stub = new Response(blob)

  // return await Promise.resolve(stub)
  return await fetch(url, opts)
    //.then(checkResponse)
    .then(checkHeaders)
    .then(processWeather)
    .catch(error => {
      throw error;
    });
};

/*
  Supporting Functions
*/

//const checkResponse = async (response: Response): Promise<FiveDayForecast> => {
//if (response.status < 200 || response.status >= 400) {
//throw new ResponseError('localweather fetch failed', response);
//}

//return await (response.json(): Promise<FiveDayForecast>);
//};

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

const parseTime = (time: number): { day: string, time: string } => {
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
  //checkResponse,
  processWeather,
  processForecasts,
  parseTime,
  stripDateIfRedundant,
};
