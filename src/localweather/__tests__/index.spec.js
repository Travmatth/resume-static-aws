/* @flow */
'use strict';

import { syntheticDispatch } from 'common/utils';
import * as Handlers from '../Handlers';

describe.only('Localweather App', () => {
  beforeEach(() => {
    global.navigator = global.navigator || {};
    global.navigator.geolocation = {};
    global.navigator.geolocation.getCurrentPosition = jest.fn();
    document.body.innerHTML = require('../index.pug');
  });

  it('should call getCurrentPosition to handler on DOMContentLoaded', () => {
    require('../index');
    syntheticDispatch(document, 'DOMContentLoaded');
    expect(global.navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
  });

  it('should set event listeners on temperature radio buttons', () => {
    const mock = jest.fn();
    Handlers.toggleTempChangeHandler = jest.fn(() => mock);
    Handlers.getWeatherHandler = jest.fn(() => mock);

    const buttons = document.querySelectorAll('input');

    require('../index');
    syntheticDispatch(document, 'DOMContentLoaded');

    buttons.forEach(btn => syntheticDispatch(btn, 'click'));

    expect(Handlers.toggleTempChangeHandler).toHaveBeenCalledTimes(2);
    expect(Handlers.getWeatherHandler).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledTimes(2);
  });
});
