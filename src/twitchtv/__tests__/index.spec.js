/* @flow */
import * as Handlers from '../Handlers';
import { dispatch } from 'common/utils';

jest.mock('../Handlers', () => {
  const module = {};

  module.fetchHandlerCallback = jest.fn();
  module.fetchHandler = module.fetchHandlerCallback;

  return module;
});

describe('TwitchTV page', () => {
  beforeEach(() => {
    document.body.innerHTML = require('../index.pug');
    require('../index.js');
    dispatch(document, 'DOMContentLoaded');
  });

  it('should have a fetch button', () => {
    dispatch(document.querySelector('button'), 'click');
    expect(Handlers.fetchHandlerCallback).toHaveBeenCalled();
  });
});
