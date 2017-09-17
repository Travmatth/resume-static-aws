/* @flow */
import {
  fetchQuoteHandler,
  showError,
  showScene,
  dismissError,
} from '../Handlers';
import { dispatch } from 'tests/utils';
import * as Api from '../Api';

jest.mock('../Api', () => {
  const module = {};

  module.fetchQuote = jest.fn(() => ({
    quote: 'a',
    author: 'b',
  }));
  module.createLink = jest.fn(() => 'stub');

  return module;
});

describe('RandomQuote Handlers', () => {
  beforeEach(() => {
    ((document.body: any): HTMLElement).innerHTML = require('../index.pug');
  });

  it('fetchQuoteHandler should fill in quote, author, and twitter link', async () => {
    const quoteElement = document.createElement('div');
    const authorElement = document.createElement('div');
    const tweetLink = document.createElement('div');
    const showError = jest.fn();
    const show = jest.fn();
    const ev = (({}: any): Event);

    await fetchQuoteHandler(
      quoteElement,
      authorElement,
      tweetLink,
      showError,
      show,
    )(ev);

    expect(quoteElement.textContent).toBe('a');
    expect(authorElement.textContent).toBe('b');
    expect(tweetLink.href).toBe('stub');
  });

  it('showScene should set loading state correctly', () => {
    const quoteBox = document.createElement('div');
    const spinner = document.createElement('div');

    const show = showScene(quoteBox, spinner);
    show('loading');

    expect(spinner.classList.contains('hidden')).toBe(false);
    expect(quoteBox.classList.contains('hidden')).toBe(true);
  });

  it('showScene should set quote state correctly', () => {
    const quoteBox = document.createElement('div');
    const spinner = document.createElement('div');

    const show = showScene(quoteBox, spinner);
    show('quote');

    expect(spinner.classList.contains('hidden')).toBe(true);
    expect(quoteBox.classList.contains('hidden')).toBe(false);
  });

  it('showScene should set default state correctly', () => {
    const quoteBox = document.createElement('div');
    const spinner = document.createElement('div');

    const show = showScene(quoteBox, spinner);
    show('');

    expect(quoteBox.classList.contains('hidden')).toBe(true);
    expect(spinner.classList.contains('hidden')).toBe(true);
  });

  it('dismissError should set is-active class to false', () => {
    const modal = document.createElement('div');

    dismissError(modal)();
    expect(modal.classList.contains('is-active')).toBe(false);
  });

  it('showError should set is-active class to true', () => {
    const modal = document.createElement('div');

    showError(modal)();
    expect(modal.classList.contains('is-active')).toBe(true);
  });
});
