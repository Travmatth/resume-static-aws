/* @flow */
import { dispatch } from 'tests/utils';
import * as Handlers from '../Handlers';
import * as handlers from 'common/js/handlers';

jest.mock('common/js/handlers', () => ({
  registerToggle: jest.fn(),
}));

jest.mock('../Handlers', () => {
  const module = {};

  module.fetchQuoteHandlerCallback = jest.fn();
  module.fetchQuoteHandler = module.fetchQuoteHandlerCallback;

  return module;
});

describe('RandomQuote page', () => {
  beforeEach(() => {
    ((document.body: any): HTMLElement).innerHTML = require('../index.pug');
    require('../index.js');
    dispatch(document, 'DOMContentLoaded');
  });

  it('page should register toggle handler', async () => {
    expect(handlers.registerToggle).toHaveBeenCalled();
  });

  it('should have a button to fetch next quote', () => {
    dispatch(document.querySelector('#refresh'), 'click');
    //$FlowIgnore
    expect(Handlers.fetchQuoteHandlerCallback).toHaveBeenCalled();
  });
});
