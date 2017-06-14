/* @flow */

import { response, data, url } from './mockdata';
import { ResponseError, serialize } from 'common/utils';
import { json } from 'tests/utils';
import { OPEN_WEATHER_APPID } from 'common/api_keys';

import {
  getWeatherHandler,
  updateTableRows,
  toggleTempChangeHandler,
  tempScale,
} from '../Handlers';
import { openweatherApiParams, endpoint } from '../Models';
import contentLoadedListener from '../index';

import fetchJsonp from 'fetch-jsonp';

jest.mock('fetch-jsonp', () => require('jest-fetch-mock'));

describe('Localweather Handlers', () => {
  afterEach(() => {
    fetch.resetMocks();
  });

  beforeEach(() => {
    //$FlowIgnore
    ((document.body: any): HTMLElement).innerHTML = require('../index.pug');
  });

  it('updateTableRows() populates given DOM element w/ correct data', async () => {
    const cells = ((document.body: any): HTMLElement).querySelectorAll('.cell');
    const forecasts = [data.forecasts[0]];

    // Populate cells
    updateTableRows(cells, forecasts, 'celsius');

    const { icon, temp, day, time, weather, description } = forecasts[0];

    const cell = cells.item(0);
    const dayElement = cell.children[0].textContent;
    const timeElement = cell.children[1].textContent;
    const temperatureElement = Number(cell.children[2].textContent);
    const imgElement = (cell.children[3].children[0]: any).src;
    const descriptionElement = cell.children[4].textContent;

    expect(day).toBe(dayElement);
    expect(time).toBe(timeElement);
    expect(temp.celsius).toBe(temperatureElement);
    expect(icon).toBe(imgElement);
    expect(description).toBe(descriptionElement);
  });

  it('updateTableRows should store temperature data in nodes dataset', async () => {
    expect(true).toBe(false);
  });

  it('getWeatherHandler should catch error if fetchWeather throws', async () => {
    fetch.mockResponseOnce(json({}), { status: 404 });

    const node: HTMLElement = (document.querySelector('.measurement'): any);
    const nodes = document.querySelectorAll('.measurement');

    const cells = document.querySelectorAll('.cell');
    const getWeather = getWeatherHandler(
      ((document.querySelectorAll('.heading'): any): HTMLElement),
      cells,
      document.querySelectorAll('input'),
    );

    await getWeather(
      (({ coords: { latitude: 0, longitude: 0 } }: any): Position),
    );

    expect(node.textContent).toBe('');
  });

  it('tempScale should return state of radio buttons', () => {
    expect(tempScale()).toBe('fahrenheit');
  });

  it('toggleTempChange should switch temperature scale', async () => {
    fetch.mockResponseOnce(json(response), { status: 200 });
    const node: HTMLElement = (document.querySelector('.measurement'): any);
    const nodes = document.querySelectorAll('.measurement');

    const cells = document.querySelectorAll('.cell');
    const getWeather = getWeatherHandler(
      ((document: any): Document).querySelector('.heading'),
      cells,
      document.querySelectorAll('input'),
    );

    await getWeather(
      (({ coords: { latitude: 0, longitude: 0 } }: any): Position),
    );

    expect(node.textContent).toBe('28.74');
    const toggleTempChange = toggleTempChangeHandler(nodes);
    const temps = [{ celsius: 28.74, fahrenheit: 84 }];
    ((document.querySelector(
      '.celsius',
    ): any): HTMLInputElement).checked = true;
    //toggleTempChange(temps);
    const event = {};
    toggleTempChange(event);
    expect(node.textContent).toBe('84');
  });
});
