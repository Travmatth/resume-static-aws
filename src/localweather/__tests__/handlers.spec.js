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

test('Localweather Handlers', () => {
  afterEach(() => {
    fetch.resetMocks();
  });

  beforeAll(() => {
    document.body.innerHTML = require('../index.pug');
  });

  it('updateTableRows() populates given DOM element w/ correct data', async () => {
    //const node = document.createElement('div')
    const cells = document.body.querySelectorAll('.cell');
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

  it('toggleTempChange should switch temperature scale', async () => {
    fetch.mockResponseOnce(JSON.stringify(response), { status: 200 });
    const node = document.querySelector('.measurement');
    const nodes = document.querySelectorAll('.measurement');

    const cells = document.querySelectorAll('.cell');
    const getWeather = getWeatherHandler(
      document.querySelectorAll('.heading'),
      cells,
      document.querySelectorAll('input'),
    );

    const json = await getWeather(
      (({ coords: { latitude: 0, longitude: 0 } }: any): Position),
    );

    expect(node.textContent).toBe('28.74');
    const toggleTempChange = toggleTempChangeHandler(nodes);
    const temps = [{ celsius: 28.74, fahrenheit: 84 }];
    document.querySelector('.celsius').checked = true;
    toggleTempChange(temps);
    expect(node.textContent).toBe('84');
  });
});
