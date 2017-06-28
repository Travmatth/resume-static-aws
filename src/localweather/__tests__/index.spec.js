/* @flow */

import { dispatch } from 'tests/utils';
import * as Handlers from '../Handlers';
import * as handlers from 'common/js/handlers';
import { glyphs } from '../Models';

jest.mock('common/js/handlers', () => ({
  registerToggle: jest.fn(),
}));

jest.mock('../Handlers', () => {
  const module = {};
  const mock = jest.fn();
  module.toggleTempChangeHandlerCallback = jest.fn();

  module.toggleTempChangeHandler = jest.fn(
    () => module.toggleTempChangeHandlerCallback,
  );
  module.getWeatherHandler = jest.fn();
  return module;
});

describe('Localweather App', () => {
  beforeEach(() => {
    global.navigator = global.navigator || {};
    global.navigator.geolocation = {};
    global.navigator.geolocation.getCurrentPosition = jest.fn();
    ((document.body: any): HTMLElement).innerHTML = require('../index.pug');
  });

  it('page should register toggle handler', () => {
    dispatch(document.getElementById('projects-btn'), 'click');
    expect(handlers.registerToggle).toHaveBeenCalled();
  });

  it('should call getCurrentPosition to handler on DOMContentLoaded', () => {
    require('../index');
    dispatch(document, 'DOMContentLoaded');
    expect(global.navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
  });

  it('should set event listeners on temperature radio buttons', async () => {
    const buttons = document.querySelectorAll('input');

    require('../index');
    await dispatch(document, 'DOMContentLoaded');

    buttons.forEach(btn => dispatch(btn, 'click'));

    expect(Handlers.toggleTempChangeHandler).toHaveBeenCalledTimes(2);
    expect(Handlers.getWeatherHandler).toHaveBeenCalled();
    //$FlowIgnore
    expect(Handlers.toggleTempChangeHandlerCallback).toHaveBeenCalledTimes(2);
  });
});
