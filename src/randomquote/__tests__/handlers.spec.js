/* @flow */
import { fetchQuoteHandler } from '../Handlers';
import { dispatch } from 'common/utils';
import * as Api from '../Api';

jest.mock('../Api', () => {
  const module = {};

  module.fetchQuote = jest.fn(() => ({ quote: 'a', author: 'b' }));
  module.createLink = jest.fn(() => 'stub');

  return module;
});

describe('RandomQuote Handlers', () => {
  beforeEach(() => {
    document.body.innerHTML = require('../index.pug');
  });

  it('fetchQuoteHandler should fill in quote, author, and twitter link', async () => {
    const container = document.querySelector('.quotebox');
    const tweet = document.querySelector('.tweet');
    await fetchQuoteHandler(container, tweet)();
    expect(container.children[0].textContent).toBe('a');
    expect(container.children[1].textContent).toBe('b');
    expect(tweet.textContent).toBe('stub');
  });
});
