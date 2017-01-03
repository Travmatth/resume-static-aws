require('babel-register')({
  env: 'ava'
})

global.document = require('jsdom').jsdom('<body><div id="one"></div></body>')
global.window = document.defaultView
global.navigator = window.navigator