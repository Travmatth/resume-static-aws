const fetch = require('jest-fetch-mock');

global.fetch = fetch;
global.Headers = fetch.Headers;
global.Response = fetch.Response;
global.Request = fetch.Request;
global.console.error = jest.fn();
global.console.warn = jest.fn();
