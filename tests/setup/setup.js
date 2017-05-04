const fetch = require('jest-fetch-mock');

global.fetch = fetch;
global.Headers = fetch.Headers;
global.Response = fetch.Response;
global.Request = fetch.Request;
