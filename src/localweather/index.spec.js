/* @flow */
import test from 'ava'
// import jsdom from 'jsdom-global/register'
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

// jsdom.jsdom( 
//   '<!DOCTYPE html>' + 
//   '<html>' +
//     '<body>' +
//       '<li class="cell">' +
//       '</li>' +
//     '</body>' + 
//   '</html>'
// )

// window = document.defaultView
// window.navigator = {
//   geolocation: {
//     getCurrentPosition: (success, error, options) => {
//       success({ coords: { latitude: 0,longitude: 0 } });
//     }
//   }
// }; 

// Object.keys(window).forEach(key => {
//   if (!(key in global)) {
//     global[key] = window[key];
//   }
// });

test.afterEach.always('after', t => {
  fetchMock.restore(); 
})
/*******************************END SETUP**************************************/

// CRASH NOTES 
// 11/29/16: Stubbing out await keyword yields this err msg
// $ ava --verbose **.spec.js 

// /Users/Trav/Projects/resume-static-aws/src/localweather/index.js:39
//   var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
//                                ^

// ReferenceError: regeneratorRuntime is not defined
//     at /Users/Trav/Projects/resume-static-aws/src/localweather/index.js:24:14
//     at Object.<anonymous> (/Users/Trav/Projects/resume-static-aws/src/localweather/index.js:24:14)
//     ...
//     at node.js:445:3

// In production, I use ? to manage the transpilation of the regeneratorRuntime
  // a polyfill on the webpack build module
// In testing, this doesn't work because: 
  // I need a polyfill
// Theory: using a polyfill would solve the error
 
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

test('main() obtains user coordinates and populates list elements', async t => {
  fetchMock.post(url, data);

  const time = 0
  const json = await main(time)
  console.log('json', json)

  // not sure what i'll be measuring yet
  t.pass()
});
