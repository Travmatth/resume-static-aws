/* @flow */
/* eslint-env jest */

import { dispatch } from 'tests/utils';
import * as Pomodoro from '../Handlers';

jest.mock('../Handlers', () => {
  const module = {};

  module.setFill = jest.fn();
  module.resetCallback = jest.fn();
  module.toggleCallback = jest.fn();
  module.stepperCallback = jest.fn();
  module.resetHandler = jest.fn(() => module.resetCallback);
  module.toggleHandler = jest.fn(() => module.toggleCallback);
  module.stepperHandler = jest.fn(() => module.stepperCallback);

  return module;
});

describe('Pomodoro page', () => {
  beforeEach(() => {
    ((document.body: any): HTMLElement).innerHTML = require('../index.pug');
    require('../index.js');
    dispatch(document, 'DOMContentLoaded');
  });

  it('should have a listener able to increment work count', () => {
    dispatch('#work-inc', 'click');
    //$FlowIgnore
    expect(Pomodoro.stepperCallback).toHaveBeenCalled();
  });

  it('should have a listener able to decrement work count', () => {
    dispatch('#work-dec', 'click');
    //$FlowIgnore
    expect(Pomodoro.stepperCallback).toHaveBeenCalled();
  });

  it('should have a listener able to increment rest count', () => {
    dispatch('#rest-inc', 'click');
    //$FlowIgnore
    expect(Pomodoro.stepperCallback).toHaveBeenCalled();
  });

  it('should have a listener able to decrement rest count', () => {
    dispatch('#rest-dec', 'click');
    //$FlowIgnore
    expect(Pomodoro.stepperCallback).toHaveBeenCalled();
  });

  it('should have a listener able to reset pomodoro', () => {
    dispatch('#reset-btn', 'click');
    //$FlowIgnore
    expect(Pomodoro.resetCallback).toHaveBeenCalled();
  });

  it('should have a listener able to start/stop pomodoro', () => {
    dispatch('#timer-btn', 'click');
    //$FlowIgnore
    expect(Pomodoro.toggleCallback).toHaveBeenCalled();
  });
});
