/* @flow */
import jsdom from 'jsdom-global/register'
import fetchMock from 'fetch-mock';
import { response, data } from './mockdata.spec'
import { serializeDocument } from 'jsdom'

//Model under test
import { fetchWeather, openweatherApiParams , endpoint, main } from './index'
import { serialize } from '../common/utils'

// test.before([title], () => {})

// test.after.always('after', () => {})

// test.afterEach('afterEach', () => {})
// test.beforeEach([title], () => {})

// test(t => {
    // regular test
// });

// macro.title = (providedTitle, input, expected) => `${providedTitle} ${input} === ${expected}`.trim();

// test(macro, '2 + 2', 4);
// test(macro, '2 * 3', 6);
// test('providedTitle', macro, '3 * 3', 9);

const url = 'http://api.openweathermap.org/' +
  'data/2.5/forecast?' +
  'lat=0&' + 
  'lon=0&' + 
  'units=imperial&' +
  'APPID=c26ef1df98c449f37f8f199738ce74c7'

.only('fetchWeather', () => {
  (() => {
    if (typeof document !== 'undefined') return

    document = jsdom.jsdom( 
      '<!DOCTYPE html>' + 
      '<html>' +
        '<body>' +
          '<li class="cell">' +
          '</li>' +
        '</body>' + 
      '</html>'
    )

    window = document.defaultView
    navigator = {
      geolocation: {
        getCurrentPosition: (success, error, options) => {
          success({ coords: { latitude: 0,longitude: 0 } });
        }
      }
    }; 

    Object.keys(window).forEach((key) => {
      if (!(key in global)) {
        global[key] = window[key];
      }
    });
  })

  afterEach(() => { 
    fetchMock.restore(); 
  });

  ('fetchWeather can return parsed json', async () => {
    fetchMock.post(url, response);

    const json = await fetchWeather(serialize(endpoint, openweatherApiParams (0, 0)))
    const { now: date, ...rest } = json
    const { now, ...object } = data

    (rest).to.eql(object)
    (date).to.be.a.number
  });

  ('fetchWeather throws appropriately', async () => {
    fetchMock.post(url, { status: 404, body: data });

    try {
      const call = async () => await fetchWeather(serialize(endpoint, params(0, 0)))
      (call).to.throw()
      // done() 
    } catch(err) {
      // done() 
    }
  });

  ('main() obtains user coordinates and populates list elements', async () => {
    fetchMock.post(url, data);

    const time = 0

    //call function
    const t = await main(time)
    (t).to.be.true
    // console.log(window.querySelectorAll)

    // setTimeout(() => {
      // done()
    // }, time);
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
