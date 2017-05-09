/* @flow */
'use strict';

import { response, data, url } from './mockdata';
import { ResponseError, serialize } from 'common/utils';
import { OPEN_WEATHER_APPID } from 'common/api_keys';

/*
  Model under test
*/

import {
  getWeatherHandler,
  fetchWeather,
  openweatherApiParams,
  endpoint,
  updateTableRows,
  toggleTempChangeHandler,
} from '../Handlers';
import contentLoadedListener from '../index';

/*
  Test
*/
describe('Localweather Model', () => {
  afterEach(() => {
    fetch.resetMocks();
  });

  it('fetchWeather can return parsed json', async () => {
    fetch.mockResponseOnce(JSON.stringify(response));

    const json = await fetchWeather(url);
    const { now: date, ...rest } = json;
    const { now, ...object } = data;

    expect(rest).toEqual(object);
  });

  it('fetchWeather throws appropriately', async () => {
    fetch.mockResponseOnce(JSON.stringify(data), { status: 404 });

    try {
      await fetchWeather(url);
    } catch (err) {
      expect(err.response.status).toBe(404);
    }
  });
});
