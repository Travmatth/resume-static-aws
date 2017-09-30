/* @flow */
/* eslint-env jest */

import { dispatch } from 'tests/utils';
import * as Handlers from '../Handlers';
import * as Models from '../Models';

jest.mock('../Models', () => ({
  //Simon: class Simon {},
  timerState: () => ({}),
  simonState: () => ({}),
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

  module.startHandlerCallback = jest.fn();
  module.startHandler = jest.fn(() => module.startHandlerCallback);

  return module;
});

describe('Simon page', () => {
  beforeEach(() => {
    ((document.body: any): HTMLElement).innerHTML = require('../index.pug');
    require('../index.js');
    dispatch(document, 'DOMContentLoaded');
  });

  it('should have listener on power button', () => {
    dispatch(document.getElementById('power'), 'click');
    //$FlowIgnore
    expect(Handlers.powerHandlerCallback).toHaveBeenCalled();
  });

  it('should have listener on strict button', () => {
    dispatch(document.getElementById('strict'), 'click');
    //$FlowIgnore
    expect(Handlers.strictHandlerCallback).toHaveBeenCalled();
  });

  it('should have listener on color buttons', () => {
    ['red', 'yellow', 'green', 'blue'].forEach(color =>
      dispatch(document.getElementById(color), 'click'),
    );

    //$FlowIgnore
    expect(Handlers.clickHandlerCallback).toHaveBeenCalledTimes(4);
  });
});
