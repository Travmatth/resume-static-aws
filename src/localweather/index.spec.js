/* @flow */
import test from 'ava'
import jsdom from 'jsdom-global/register'
import fetchMock from 'fetch-mock';
import { response, data } from './mockdata'
// import { serializeDocument } from 'jsdom'
import ResponseError from '../common/utils'

//Model under test
import { fetchWeather, openweatherApiParams , endpoint, main } from './index'
import { serialize } from '../common/utils'

/***********************************SETUP**************************************/
const url = 'http://api.openweathermap.org/' +
  'data/2.5/forecast?' +
  'lat=0&' + 
  'lon=0&' + 
  'units=imperial&' +
  'APPID=c26ef1df98c449f37f8f199738ce74c7'

jsdom.jsdom( 
  '<!DOCTYPE html>' + 
  '<html>' +
    '<body>' +
      '<li class="cell">' +
      '</li>' +
    '</body>' + 
  '</html>'
)

window = document.defaultView
// window.navigator = {
//   geolocation: {
//     getCurrentPosition: (success, error, options) => {
//       success({ coords: { latitude: 0,longitude: 0 } });
//     }
//   }
// }; 

Object.keys(window).forEach(key => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});

test.afterEach.always('after', t => {
  fetchMock.restore(); 
})
/*******************************END SETUP**************************************/

test('fetchWeather can return parsed json', async t => {
  fetchMock.post(url, response);

  const url = serialize(endpoint, openweatherApiParams (0, 0))
  const json = await fetchWeather(url)
  const { now: date, ...rest } = json
  const { now, ...object } = data

  t.deepEqual(rest, object)
  t.is(date, 'number')
});

test('fetchWeather throws appropriately', async t => {
  fetchMock.post(url, { status: 404, body: data });

  const url = serialize(endpoint, params(0, 0))
  const error = await t.throws(fetchWeather(url))

  t.is(error.response.url, url)
});

test('main() obtains user coordinates and populates list elements', async t => {
  fetchMock.post(url, data);

  const time = 0
  const json = await main(time)

  // not sure what i'll be measuring yet
  t.pass()
});
