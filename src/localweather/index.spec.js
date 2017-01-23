/* @flow */

import test from 'ava'
import fetchMock from 'fetch-mock';
import { response, data } from './mockdata'
import { ResponseError } from '../common/utils'

/*
  Model under test
*/

import { 
  getWeather, 
  fetchWeather, 
  openweatherApiParams, 
  endpoint, 
  contentLoadedListener, 
  updateTableRows,
  toggleTempChange,
} from './index'

import { serialize, } from '../common/utils'
import { OPEN_WEATHER_APPID, } from '../common/api_keys';

/*
  Setup
*/

const url = 'http://api.openweathermap.org/' +
  'data/2.5/forecast?' +
  'lat=0&' + 
  'lon=0&' + 
  'units=imperial&' +
  'APPID=' + OPEN_WEATHER_APPID

test.before(() => {})

test.afterEach.always('after', t => {
  fetchMock.restore(); 
})

/*
  Test
*/

test('fetchWeather can return parsed json', async t => {
  fetchMock.post(url, response);

  const json = await fetchWeather(url)
  const { now: date, ...rest } = json
  const { now, ...object } = data

  t.deepEqual(rest, object)
  t.is(typeof date, 'number')
});

//I need to run .serial() to pass, why?
test.serial('fetchWeather throws appropriately', async t => {
  fetchMock.post(url, { status: 404, body: data });

  await t.throws(fetchWeather(url), ResponseError)
});

test('updateTableRows() populates given DOM element w/ correct data', async t => {
  const cells = document.querySelectorAll('.cell')
  const forecasts = [data.forecasts[0]]

  // Populate cells
  updateTableRows(cells, forecasts, 'celsius')

  const { icon, temp, day, time, weather, description, } = forecasts[0]

  const cell = cells.item(0)
  const dayElement = cell.children[0].textContent
  const timeElement = cell.children[1].textContent
  const temperatureElement = Number(cell.children[2].textContent)
  const imgElement = (cell.children[3].children[0]: any).src
  const descriptionElement = cell.children[4].textContent

  t.is(day, dayElement)
  t.is(time, timeElement)
  t.is(temp.celsius, temperatureElement)
  t.is(icon, imgElement)
  t.is(description, descriptionElement)
});

test('contentLoadedListener() obtains user coordinates and populates list elements', async t => {
  fetchMock.post(url, response);

  const json = await contentLoadedListener(10)

  // not sure what i'll be measuring yet
  t.pass()
});

test('toggleTempChange should switch temperature scale', async t => {
  const nodes = document.querySelectorAll('.measurement');

  t.is(nodes.item(0).textContent, '84');
  const json = await getWeather({ coords: { latitude: 0,longitude: 0 } })
  toggleTempChange('fffff')
  t.is(nodes.item(0).textContent, '28.74');
});
