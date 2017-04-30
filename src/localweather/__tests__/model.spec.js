/* @flow */
'use strict';

import { response, data } from './mockdata';
import { ResponseError } from '../../common/utils';

/*
  Model under test
*/

import {
  getWeatherHandler,
  fetchWeather,
  openweatherApiParams,
  endpoint,
  updateTableRows,
  toggleTempChange,
} from '../Handlers';
import contentLoadedListener from '../index';

import { serialize } from '../../common/utils';
import { OPEN_WEATHER_APPID } from '../../common/api_keys';

/*
  Setup
*/

const url =
  'http://api.openweathermap.org/' +
  'data/2.5/forecast?' +
  'lat=0&' +
  'lon=0&' +
  'units=imperial&' +
  'APPID=' +
  OPEN_WEATHER_APPID;

afterEach(() => {
  fetch.resetMocks();
});

/*
  Test
*/

test('fetchWeather can return parsed json', async () => {
  fetch.mockResponseOnce(JSON.stringify(response));

  const json = await fetchWeather(url);
  const { now: date, ...rest } = json;
  const { now, ...object } = data;

  expect(rest).toEqual(object);
  //t.is(typeof date, 'number');
});

//I need to run .serial() to pass, why?
test('fetchWeather throws appropriately', async () => {
  fetch.mockResponseOnce(JSON.stringify(data), { status: 404 });

  try {
    await fetchWeather(url);
  } catch (err) {
    expect(err.response.status).toBe(404);
  }
});

test.only(
  'updateTableRows() populates given DOM element w/ correct data',
  async () => {
    document.body.innerHtml =
      '<tr class="cell hide">' +
      '<td class="day"></td>' +
      '<td class="time"></td>' +
      '<td class="measurement"></td>' +
      '<td class="icon"><img/></td>' +
      '<td class="weather"></td>' +
      '</tr>';

    const cells = document.querySelectorAll('.cell');
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
  },
);

test('contentLoadedListener() obtains user coordinates and populates list elements', async done => {
  //fetchMock.post(url, response);

  //const json = await contentLoadedListener(10);

  // not sure what i'll be measuring yet
  done.fail();
});

test('toggleTempChange should switch temperature scale', async done => {
  //const nodes = document.querySelectorAll('.measurement');

  //t.is(nodes.item(0).textContent, '84');
  //const json = await getWeatherHandler(
  //(({ coords: { latitude: 0, longitude: 0 } }: any): Position),
  //);
  //toggleTempChange('fffff');
  //t.is(nodes.item(0).textContent, '28.74');
  done.fail();
});
