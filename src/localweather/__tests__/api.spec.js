/* @flow */

import { response, data, url } from './mockdata';
import { ResponseError, serialize } from 'common/utils';
import { OPEN_WEATHER_APPID } from 'common/api_keys';

import { fetchWeather, stripDateIfRedundant } from '../Api';
import contentLoadedListener from '../index';

import fetchJsonp from 'fetch-jsonp';
jest.mock('fetch-jsonp', () => fetch = require('jest-fetch-mock'));

describe('Localweather API', () => {
  afterEach(() => {
    fetch.resetMocks();
  });

  it('fetchWeather can return parsed json', async () => {
    fetch.mockResponseOnce(JSON.stringify(response), { status: 200 });

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

  it('stripDateIfRedundant should include first appearance of date', () => {
    const first = { day: 'a', foo: 'bar' };
    const second = { day: 'b', foo: 'bar' };

    const daily = stripDateIfRedundant(second, 1, [first, second]);
    expect(daily.day).toBe(second.day);
  });

  it('stripDateIfRedundant should ignore redunant dates', () => {
    const first = { day: 'a', foo: 'bar' };
    const second = { day: 'a', foo: 'bar' };

    const daily = stripDateIfRedundant(second, 1, [first, second]);
    expect(daily.day).toBe('');
  });
});
