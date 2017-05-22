import { dispatch } from 'common/utils';
import * as Handlers from '../Handlers';

jest.mock('../Handlers', () => {
  const module = {};

  module.fetchQuoteHandlerCallback = jest.fn();
  module.fetchQuoteHandler = module.fetchQuoteHandlerCallback;

  return module;
});

describe('RandomQuote page', () => {
  beforeEach(() => {
    document.body.innerHTML = require('../index.pug');
    require('../index.js');
    dispatch(document, 'DOMContentLoaded');
  });

  it('should have a button to fetch next quote', () => {
    dispatch(document.querySelector('.refresh'), 'click');
    expect(Handlers.fetchQuoteHandlerCallback).toHaveBeenCalled();
  });
});
