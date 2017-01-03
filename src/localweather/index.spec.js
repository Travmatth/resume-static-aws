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
  contentLoadedListener 
} from './index'

import { serialize } from '../common/utils'

/*
  Setup
*/

const url = 'http://api.openweathermap.org/' +
  'data/2.5/forecast?' +
  'lat=0&' + 
  'lon=0&' + 
  'units=imperial&' +
  'APPID=c26ef1df98c449f37f8f199738ce74c7'

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

test('contentLoadedListener() obtains user coordinates and populates list elements', async t => {
  fetchMock.post(url, data);

  const time = 0
  // const nodes = document.createDocumentFragment()
  // for (var i = 2; i >= 0; i--) {
  //   nodes.appendChild(document.createElement('li'))
  // }

  // console.log(nodes.childNodes)
  const nodes = {
    forEach() {}
  }

  const json = await contentLoadedListener(nodes, time)

  // not sure what i'll be measuring yet
  t.pass()
});
