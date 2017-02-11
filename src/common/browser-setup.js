require('babel-register')({ env: 'ava' })

import { Headers, Request, Response } from 'node-fetch';

global.Headers = Headers
global.Response  = Response 
global.Request = Request

global.document = require('jsdom').jsdom(
  '<body>' +
    '<h1 class="heading"/>' +
    '<input class="celsius" name="temp" type="radio" />' +
    '<input class="fahrenheit" name="temp" type="radio" checked="true"/>' +
    '<table>' +
      '<tbody>' +
        '<tr class="cell hide">' +
          '<td class="day"/>' +
          '<td class="time"/>' +
          '<td class="measurement"/>' +
          '<td class="icon">' + 
            '<img/>' + 
          '</td>' +
          '<td class="weather"/>' +
        '<tr>' +
      '</tbody>' +
    '</table>' +
  '</body>'
)

global.window = document.defaultView

global.navigator = {
  geolocation: {
    getCurrentPosition: (success, error, options) => {
      success({ coords: { latitude: 0,longitude: 0 } });
    }
  }
}; 

global.temperatures = [
  { celsius: 0,  fahrenheit: 1, }
];
