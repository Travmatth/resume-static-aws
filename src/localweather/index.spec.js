/* @flow */
import test from 'ava'
import fetchMock from 'fetch-mock';
import { response, data } from './mockdata'
import ResponseError from '../common/utils'

/*
  Model under test
*/
import { 
  fetchWeather, 
  openweatherApiParams, 
  endpoint, 
  contentLoadedListener, 
  updateDOM,
} from './index'

import { serialize } from '../common/utils'
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

test.before(() => {
//   // tr.cell.hide
//   // const table = 
//   const node = document.createElement('tr')
//   // document.body.appendChild(node)
//   node.classList.add('cell')
//   node.classList.add('hide')

//   // td.day
//   const day = node.insertCell()
//   day.classList.add('day')

//   // td.time
//   const time = node.insertCell()
//   time.classList.add('time')

//   // td.measurement
//   const measurement = node.insertCell()
//   measurement.classList.add('measurement')

//   // td.icon 
//   const icon = node.insertCell()
//   icon.classList.add('icon')

//   const img = document.createElement('img')
//   img.classList.add('img')
//   icon.appendChild(img)
//   //Will check source in test
//   //   img key={icon} src={`${icon}`}
//   // img.src = 
  
//   //   td.weather
//   const weather = document.createElement('div')
//   weather.classList.add('weather')
//   icon.appendChild(weather)
})

test.afterEach.always('after', t => {
  fetchMock.restore(); 
})

/*
  Test
*/

test('globals Test', t => {
  t.pass()
});

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

test('updateDOM() populates given DOM element w/ correct data', async t => {
  const json = updateDOM()
  // not sure what i'll be measuring yet
  t.pass()
});

test('contentLoadedListener() obtains user coordinates and populates list elements', async t => {
  fetchMock.post(url, response);

  const json = await contentLoadedListener(10)

  // not sure what i'll be measuring yet
  t.pass()
});
