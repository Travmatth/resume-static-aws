/* @flow */

import { dispatch } from 'tests/utils';
import * as Handlers from '../Handlers';
import * as Models from '../Models';

jest.mock('../Models', () => ({
  Simon: class Simon {},
  Timer: class Timer {},
  SoundManager: class SoundManager {},
}));

jest.mock('../Handlers', () => {
  const module = {};

  module.powerHandlerCallback = jest.fn();
  module.powerHandler = jest.fn(() => module.powerHandlerCallback);

  module.strictHandlerCallback = jest.fn();
  module.strictHandler = jest.fn(() => module.strictHandlerCallback);

  module.scoreHandlerCallback = jest.fn();
  module.scoreHandler = jest.fn(() => module.scoreHandlerCallback);

  module.clickHandlerCallback = jest.fn();
  module.clickHandler = jest.fn(() => module.clickHandlerCallback);

  module.ColorHandler = class ColorHandler {};

  return module;
});

describe('Simon page', () => {
  beforeEach(() => {
    //$FlowIgnore
    ((document.body: any): HTMLElement).innerHTML = require('../index.pug');
    require('../index.js');
    dispatch(document, 'DOMContentLoaded');
  });

  it('should have listener on power button', () => {
    ((document.getElementById('power'): any): HTMLButtonElement).click();
    //$FlowIgnore
    expect(Handlers.powerHandlerCallback).toHaveBeenCalled();
  });

  it('should have listener on strict button', () => {
    ((document.getElementById('strict'): any): HTMLButtonElement).click();
    //$FlowIgnore
    expect(Handlers.strictHandlerCallback).toHaveBeenCalled();
  });

  it('should have listener on color buttons', () => {
    ['red', 'yellow', 'green', 'blue'].forEach(color => {
      ((document.getElementById(color): any): HTMLButtonElement).click();
    });

    //$FlowIgnore
    expect(Handlers.clickHandlerCallback).toHaveBeenCalledTimes(4);
  });
});
