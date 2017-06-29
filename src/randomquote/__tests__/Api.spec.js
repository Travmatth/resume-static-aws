import { fetchQuote, createLink } from '../Api';
import { exampleResponse } from './mockdata';
import { json } from 'tests/utils';
import fetchJsonp from 'fetch-jsonp';

jest.mock('fetch-jsonp', () => require('jest-fetch-mock'));

const quote =
  'When you see a man of worth, think of how you may emulate him. ' +
  'When you see one who is unworthy, examine yourself.  ';

const author = 'Confucius';

describe('RandomQuote Api', () => {
  it('fetchQuote should return quote and author', async () => {
    fetch.mockResponseOnce(json(exampleResponse), { status: 200 });
    expect(await fetchQuote()).toEqual({ quote, author, error: null });
  });

  it('fetchQuote should return error on errors', async () => {
    fetch.mockResponseOnce(json({}), { status: 404 });
    const { error, quote, author } = await fetchQuote();
    expect(error).not.toBe(null);
  });

  it('createLink should create a url given a quote and author', () => {
    const url =
      'https://twitter.com/intent/tweet' +
      '?hashtags=quotes&related=freecodecamp&text=%22a%22%20~b';

    expect(createLink('a', 'b')).toEqual(url);
  });
});
