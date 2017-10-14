/* @flow */
/* eslint-env jest */

import { fetchWeather, processForecasts, stripDateIfRedundant } from '../Api';
import fetchJsonp from 'fetch-jsonp';
import { response, data, url } from './mockdata';

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

  it('processForecasts should set defaults', () => {
    const json = {
      dt: 1,
      main: {
        temp_min: 1,
        temp_max: 1,
        pressure: 1,
        sea_level: 1,
        grnd_level: 1,
        humidity: 1,
        temp_kf: 1,
      },
      weather: [
        {
          id: 1,
          icon: 'icon',
        },
      ],
      clouds: {},
      wind: {
        speed: 1,
        deg: 1,
      },
      rain: {},
      snow: {},
      sys: {
        pod: 'n',
      },
      dt_txt: '2016-12-15 06:00:00',
    };

    expect(processForecasts(json)).toEqual({
      icon: 'http://openweathermap.org/img/w/icon.png',
      rain: 0,
      snow: 0,
      description: '',
      weather: '',
      cloud: 0,
      temp: {
        celsius: -18,
        fahrenheit: '',
      },
      day: 'Wednesday, December 31th',
      time: '7:00',
    });
  });

  it('processForecasts should extract json', () => {
    const json = {
      dt: 1,
      main: {
        temp: 1,
        temp_min: 1,
        temp_max: 1,
        pressure: 1,
        sea_level: 1,
        grnd_level: 1,
        humidity: 1,
        temp_kf: 1,
      },
      weather: [
        {
          id: 1,
          main: 'main',
          description: 'description',
          icon: 'icon',
        },
      ],
      clouds: {
        all: 1,
      },
      wind: {
        speed: 1,
        deg: 1,
      },
      rain: {
        '3h': 1,
      },
      snow: {
        '3h': 1,
      },
      sys: {
        pod: 'n',
      },
      dt_txt: '2016-12-15 06:00:00',
    };

    expect(processForecasts(json)).toEqual({
      icon: 'http://openweathermap.org/img/w/icon.png',
      rain: 1,
      snow: 1,
      description: 'description',
      weather: 'main',
      cloud: 1,
      temp: {
        celsius: -17,
        fahrenheit: 1,
      },
      day: 'Wednesday, December 31th',
      time: '7:00',
    });
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
