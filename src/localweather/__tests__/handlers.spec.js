/* @flow */

import { response, data, url } from './mockdata';
import { ResponseError, serialize } from 'common/js/utils';
import { json } from 'tests/utils';
import OPEN_WEATHER_APPID from 'protected/localweather.key';

import {
  showScene,
  weatherHandler,
  updateTableRows,
  toggleMeasurement,
  tempScale,
  fetchHandler,
  TOGGLE_EVENT,
  dispatchToggleEvent,
} from '../Handlers';
import { openweatherApiParams } from '../Models';
import contentLoadedListener from '../index';

import fetchJsonp from 'fetch-jsonp';

jest.mock('fetch-jsonp', () => require('jest-fetch-mock'));

describe('Localweather Handlers', () => {
  afterEach(() => {
    fetch.resetMocks();
  });

  beforeEach(() => {
    global.navigator = global.navigator || {};
    global.navigator.geolocation = {};
    global.navigator.geolocation.getCurrentPosition = jest.fn();
    ((document.body: any): HTMLElement).innerHTML = require('../index.pug');
  });

  it('showScene should display loading element scene', () => {
    const error = document.createElement('div');
    const spinner = document.createElement('div');
    const table = document.createElement('div');

    showScene(error, spinner, table)('loading');

    expect(spinner.classList.contains('hidden')).toBe(false);
    expect(error.classList.contains('hidden')).toBe(true);
    expect(table.classList.contains('hidden')).toBe(true);
  });

  it('showScene should display error element scene', () => {
    const error = document.createElement('div');
    const spinner = document.createElement('div');
    const table = document.createElement('div');

    showScene(error, spinner, table)('error');

    expect(spinner.classList.contains('hidden')).toBe(true);
    expect(error.classList.contains('hidden')).toBe(false);
    expect(table.classList.contains('hidden')).toBe(true);
  });

  it('showScene should display table element scene', () => {
    const error = document.createElement('div');
    const spinner = document.createElement('div');
    const table = document.createElement('div');

    showScene(error, spinner, table)('table');

    expect(spinner.classList.contains('hidden')).toBe(true);
    expect(error.classList.contains('hidden')).toBe(true);
    expect(table.classList.contains('hidden')).toBe(false);
  });

  it('showScene should default to hiding all', () => {
    const error = document.createElement('div');
    const spinner = document.createElement('div');
    const table = document.createElement('div');

    showScene(error, spinner, table)();

    expect(spinner.classList.contains('hidden')).toBe(true);
    expect(error.classList.contains('hidden')).toBe(true);
    expect(table.classList.contains('hidden')).toBe(true);
  });

  it('fetchHandler should toggle spinner and call getCurrentPosition', () => {
    const show = jest.fn();
    const header = document.querySelector('.heading');
    const cells = document.querySelectorAll('.cell');
    const tempToggles = ((document.querySelectorAll('input'): any): NodeList<>);

    fetchHandler(show, header, cells, tempToggles)();
    expect(show).toHaveBeenCalledWith('loading');
    expect(global.navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
  });

  it('updateTableRows() populates given DOM element w/ correct data', async () => {
    const show = jest.fn();
    const tbody = document.createElement('tbody');
    const forecasts = [data.forecasts[0]];

    // Populate cells
    updateTableRows('celsius', tbody, forecasts, show);

    const { icon, temp, day, time, weather, description } = forecasts[0];

    const cell = tbody.children[0];
    const dayElement = cell.children[0].textContent;
    const timeElement = cell.children[1].textContent;
    const temperatureElement = Number(cell.children[2].textContent);
    const imgElement = (cell.children[3].children[0].children[0]: any).src;
    const descriptionElement = cell.children[4].textContent;

    expect(cell.classList.contains('hide')).toBe(false);
    expect(day).toBe(dayElement);
    expect(time).toBe(timeElement);
    expect(temp.celsius).toBe(temperatureElement);
    expect(icon).toBe(imgElement);
    expect(description).toBe(descriptionElement);
    expect(show).toHaveBeenCalledWith('table');
  });

  it('updateTableRows should store temperature data in nodes dataset', async () => {
    const show = jest.fn();
    const forecasts = [data.forecasts[0]];
    const { temp } = forecasts[0];
    const tbody = document.createElement('tbody');

    // Populate cells
    updateTableRows('celsius', tbody, forecasts, show);
    const temperatureElement = tbody.children[0].children[2];

    expect(temp.celsius).toBe(temperatureElement.dataset.celsius);
    expect(temp.fahrenheit).toBe(temperatureElement.dataset.fahrenheit);
  });

  it('weatherHandler should catch error if fetchWeather throws', async () => {
    fetch.mockResponseOnce(json({}), { status: 404 });
    const show = jest.fn();
    const tbody = document.querySelector('tbody');
    const span = document.createElement('span');

    const getWeather = weatherHandler(show, span, tbody);

    await getWeather(
      (({ coords: { latitude: 0, longitude: 0 } }: any): Position),
    );

    expect(show).toHaveBeenCalledWith('error');
  });

  it('tempScale should return state of radio buttons', () => {
    expect(tempScale()).toBe('fahrenheit');
  });

  it('toggleMeasurement should switch temperature scale', async () => {
    const target = document.createElement('div');
    target.dataset = {
      fahrenheit: 0,
      celsius: 1,
    };

    const event = (({
      target,
      detail: { measurement: 'celsius' },
    }: any): Event);

    toggleMeasurement(event);

    expect(target.textContent).toBe('1');
  });

  it('dispatchToggleEvent should dispatch TOGGLE_EVENT on elements', () => {
    const listener = jest.fn();
    document.body.innerHTML = '<div class="measurement"></div>';
    document
      .querySelector('.measurement')
      .addEventListener(TOGGLE_EVENT, listener);

    dispatchToggleEvent('celsius')();
    expect(listener).toHaveBeenCalledTimes(1);
  });
});
