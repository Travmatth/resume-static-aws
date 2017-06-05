/* @flow */

const endpoint = `https://en.wikipedia.org/w/api.php`;

const params = {
  format: 'json',
  action: 'query',
  generator: 'search',
  gsrnamespace: 0,
  gsrlimit: 10,
  prop: 'extracts',
  exintro: 1,
  explaintext: 1,
  exsentences: 10,
  exlimit: 20,
  gsrsearch: '',
  redirects: 1,
};

export { endpoint, params };
