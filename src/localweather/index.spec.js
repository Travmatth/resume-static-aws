/* @flow */
import { expect, } from 'chai'
import fetchMock from 'fetch-mock';
import { data } from './mockdata.spec'
import { describe, it, beforeEach } from 'mocha'
import jsdom from 'jsdom'

//Model under test
import { fetchWeather, params, endpoint, main } from './index'
import { serialize } from '../common/utils'

const url = 'http://api.openweathermap.org/data/2.5/forecast?lat=0&lon=0&units=imperial&APPID=c26ef1df98c449f37f8f199738ce74c7'

describe.only('fetchWeather', () => {
  beforeEach(() => {
    if (typeof document !== 'undefined') {
      return
    }

    global.document = jsdom.jsdom('<!DOCTYPE html><html><body><li class="cell"></li></body></html>')
    global.window = global.document.defaultView
    global.navigator = {
      geolocation: {
        getCurrentPosition: (success, error, options) => {
          success({ coords: { latitude: 0,longitude: 0 } });
        }
      }
    }; 
  })

  afterEach(() => { 
    fetchMock.restore(); 
  });

  it('fetchWeather can return parsed json', async () => {
    fetchMock.post(url, data);

    const json = await fetchWeather(serialize(endpoint, params(0, 0)))
    console.log(json)
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

  it('main() obtains user coordinates and populates list elements', done => {
    fetchMock.post(url, data);

    const time = 0

    //call function
    main(time)

    setTimeout(() => {
      done()
    }, time);
  })
});

// global.document = jsdom('');
// global.window = document.defaultView;
// Object.keys(document.defaultView).forEach((property) => {
//   if (typeof global[property] === 'undefined') {
//     exposedProperties.push(property);
//     global[property] = document.defaultView[property];
//   }
// });
