import { fetchQuote, createLink } from '../Api';
import { exampleResponse } from './mockdata';
import { json } from 'tests/utils';

const quote =
  'When you see a man of worth, think of how you may emulate him. ' +
  'When you see one who is unworthy, examine yourself.  ';

const author = 'Confucius ';

describe('RandomQuote Api', () => {
  it('fetchQuote should return quote and author', async () => {
    fetch.mockResponseOnce(JSON.stringify(exampleResponse), { status: 200 });
    expect(await fetchQuote()).toEqual({ quote, author });
  });

  it('fetchQuote should return null on errors', async () => {
    fetch.mockResponseOnce(json({}), { status: 404 });
    expect(await fetchQuote()).toBe(null);
  });

  it('createLink should create a url given a quote and author', () => {
    const url =
      'https://twitter.com/intent/tweet' +
      '?hashtags=quotes&related=freecodecamp&text=%22a%22%20~b';

    expect(createLink('a', 'b')).toEqual(url);
  });
});
