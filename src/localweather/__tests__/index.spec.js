/* @flow */
/* eslint-env jest */

import { dispatch } from 'tests/utils';
import * as Handlers from '../Handlers';

jest.mock('../Handlers', () => {
  const module = {};

  module.showScene = jest.fn();
  module.dispatchToggleEventCallback = jest.fn();
  module.dispatchToggleEvent = jest.fn(
    () => module.dispatchToggleEventCallback,
  );
  module.fetchHandlerCallback = jest.fn();
  module.fetchHandler = jest.fn(() => module.fetchHandlerCallback);

  return module;
});

describe('Localweather App', () => {
  beforeEach(() => {
    ((document.body: any): HTMLElement).innerHTML = require('../index.pug');
    document.querySelectorAll('input').forEach(el => {
      el.dataset = {};
      el.dataset.type = 'celsius';
    });

    require('../index');
    dispatch(document, 'DOMContentLoaded');
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('should call fetchHandler on fetch button click', () => {
    dispatch('#fetch-btn', 'click');
    expect(Handlers.fetchHandlerCallback).toHaveBeenCalled();
  });

  it('should set event listeners on temperature radio buttons', () => {
    const buttons = document.querySelectorAll('input');

    buttons.forEach(btn => dispatch(btn, 'click'));

    expect(Handlers.dispatchToggleEvent).toHaveBeenCalled();
    //$FlowIgnore
    expect(Handlers.dispatchToggleEventCallback).toHaveBeenCalledTimes(2);
  });
});
