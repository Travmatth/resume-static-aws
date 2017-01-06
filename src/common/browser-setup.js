require('babel-register')({
  env: 'ava'
})

global.document = require('jsdom').jsdom(
  '<body>' +
    '<table>' +
      '<tbody>' +
        '<tr class="cell hide">' +
          '<td class="day"/>' +
          '<td class="time"/>' +
          '<td class="measurement"/>' +
          '<td class="icon">' + 
            '<img/>' + 
            '<td class="weather"/>' +
          '</td>' +
        '<tr>' +
      '</tbody>' +
    '</table>' +
  '</body>'
)

global.window = document.defaultView
// global.navigator = window.navigator
global.navigator = {
  geolocation: {
    getCurrentPosition: (success, error, options) => {
      success({ coords: { latitude: 0,longitude: 0 } });
    }
  }
}; 
// global.navigator = window.navigator