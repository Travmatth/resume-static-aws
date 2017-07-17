/* @flow */

import { dispatch } from 'tests/utils';
import * as Handlers from '../Handlers';

jest.mock('../Handlers', () => {
  const module = {};

  module.toggleTempChangeHandlerCallback = jest.fn();
  module.toggleTempChangeHandler = jest.fn(
    () => module.toggleTempChangeHandlerCallback,
  );
  module.fetchHandler = jest.fn();
  return module;
});

describe('Localweather App', () => {
  beforeEach(() => {
    ((document.body: any): HTMLElement).innerHTML = require('../index.pug');

    require('../index');
    dispatch(document, 'DOMContentLoaded');
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('should call fetchHandler on fetch click', () => {
    dispatch('#fetch-btn', 'click');
    expect(Handlers.fetchHandler).toHaveBeenCalled();
  });

  it('should set event listeners on temperature radio buttons', () => {
    const buttons = document.querySelectorAll('input');

    buttons.forEach(btn => dispatch(btn, 'click'));

    expect(Handlers.toggleTempChangeHandler).toHaveBeenCalled();
    //$FlowIgnore
    expect(Handlers.toggleTempChangeHandlerCallback).toHaveBeenCalledTimes(2);
  });
});
