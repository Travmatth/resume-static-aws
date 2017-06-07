/* @flow */
import { dispatch } from 'tests/utils';
import * as Pomodoro from '../Models';

jest.mock('../Models', () => {
  const mocks = {};

  mocks.resetCallback = jest.fn();
  mocks.toggleCallback = jest.fn();
  mocks.stepperCallback = jest.fn();

  class Pomodoro {
    reset() {
      return mocks.resetCallback;
    }
    toggle() {
      return mocks.toggleCallback;
    }
    stepper() {
      return mocks.stepperCallback;
    }
  }

  return { Pomodoro, mocks };
});

describe('Pomodoro page', () => {
  beforeEach(() => {
    document.body.innerHTML = require('../index.pug');
    require('../index.js');
    dispatch(document, 'DOMContentLoaded');
  });

  it('should have a listener able to increment work count', () => {
    dispatch('#work-inc', 'click');
    expect(Pomodoro.mocks.stepperCallback).toHaveBeenCalled();
  });

  it('should have a listener able to decrement work count', () => {
    dispatch('#work-dec', 'click');
    expect(Pomodoro.mocks.stepperCallback).toHaveBeenCalled();
  });

  it('should have a listener able to increment rest count', () => {
    dispatch('#rest-inc', 'click');
    expect(Pomodoro.mocks.stepperCallback).toHaveBeenCalled();
  });

  it('should have a listener able to decrement rest count', () => {
    dispatch('#rest-dec', 'click');
    expect(Pomodoro.mocks.stepperCallback).toHaveBeenCalled();
  });

  it('should have a listener able to reset pomodoro', () => {
    dispatch('#reset-btn', 'click');
    expect(Pomodoro.mocks.resetCallback).toHaveBeenCalled();
  });

  it('should have a listener able to start/stop pomodoro', () => {
    dispatch('#timer-btn', 'click');
    expect(Pomodoro.mocks.toggleCallback).toHaveBeenCalled();
  });
});
