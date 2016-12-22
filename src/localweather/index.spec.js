/* @flow */
import { expect, } from 'chai'
import { describe, it, beforeEach } from 'mocha'
import fetchMock from 'fetch-mock';

import { data } from './mockdata.spec'

//Model under test
import { fetchWeather, params, endpoint } from './index'
import { serialize } from '../common/utils'

const url = 'http://api.openweathermap.org/data/2.5/forecast?lat=0&lon=0&units=imperial&APPID=c26ef1df98c449f37f8f199738ce74c7'

describe.only('fetchWeather', () => {
  afterEach(() => { 
    fetchMock.restore(); 
  });

  it('fetchWeather can return parsed json', async () => {
    fetchMock.post(url, data);

    const json = await fetchWeather(serialize(endpoint, params(0, 0)))
    expect(json).to.eql(data)
  });

  it('fetchWeather throws appropriately', async () => {
    fetchMock.post(url, { status: 404, body: data });

    try {
      const call = async () => await fetchWeather(serialize(endpoint, params(0, 0)))
      expect(call).to.throw()
    } 
    catch(err) {}
  });
});

// global.document = jsdom('');
// global.window = document.defaultView;
// Object.keys(document.defaultView).forEach((property) => {
//   if (typeof global[property] === 'undefined') {
//     exposedProperties.push(property);
//     global[property] = document.defaultView[property];
//   }
// });
