/* @flow */
/* eslint-env jest */

import {
  keyPressHandler,
  refreshHandler,
  displayPopup,
  dismissPopupHandler,
} from '../Handlers';
import { dispatch } from 'tests/utils';
import type { Calculator } from '../Models';

let calculator: Calculator;
let keypress: Event => void;
let refresh: any => void;
let display: any => void;

const press = (key: string): Event => ({ target: { dataset: { key } } }: any);

describe('Calculator Handlers', () => {
  beforeEach(() => {
    refresh = jest.fn();
    display = jest.fn();
    calculator = (({
      clear: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      compute: jest.fn(),
    }: any): Calculator);

    keypress = keyPressHandler(calculator, refresh, display);
  });

  it('dismissPopupHandler should toggle off .is-active on given element', () => {
    const el = document.createElement('div');
    el.classList.add('is-active');

    dismissPopupHandler(el)();

    expect(el.classList.contains('is-active')).toBe(false);
  });

  it('displayPopup should toggle .is-active on .modal element, and set given message as textContent on #error-modal', () => {
    const modal = document.createElement('div');
    const error = document.createElement('div');
    displayPopup(modal, error)('test');

    expect(error.textContent).toBe('test');
    expect(modal.classList.contains('is-active')).toBe(true);
  });

  it('keyPressHandler should update state on number keys', () => {
    keypress(press('1'));
    expect(calculator.update).toHaveBeenCalled();
  });

  it('keyPressHandler should update state on function keys', () => {
    keypress(press('SIN'));
    expect(calculator.update).toHaveBeenCalled();
  });

  it("keyPressHandler should refresh window on '=' key", () => {
    keypress(press('1'));
    keypress(press('+'));
    keypress(press('1'));
    keypress(press('='));
    expect(calculator.update).toHaveBeenCalledTimes(3);
    expect(calculator.compute).toHaveBeenCalledTimes(1);
  });

  it("keyPressHandler should clear logic & refresh on 'clear' key", () => {
    keypress(press('1'));
    keypress(press('2'));
    keypress(press('clear'));

    expect(calculator.update).toHaveBeenCalledTimes(2);
    expect(calculator.clear).toHaveBeenCalledTimes(1);
  });

  it("keyPressHandler should delete logic & refresh on 'delete' key", () => {
    keypress(press('1'));
    keypress(press('2'));
    keypress(press('delete'));

    expect(calculator.update).toHaveBeenCalledTimes(2);
    expect(calculator.delete).toHaveBeenCalledTimes(1);
  });

  it('keyPressHandler should catch error message on parser', () => {
    const refresh = jest.fn();
    const display = jest.fn();
    const calculator = (({
      update: jest.fn(),
      compute: jest.fn(() => {
        throw new Error();
      }),
    }: any): Calculator);

    const keypress = keyPressHandler(calculator, refresh, display);
    keypress(press('+'));
    keypress(press('='));

    expect(display).toHaveBeenCalled();
  });

  it('refreshHandler should update outputWindow textContent with msg', () => {
    const output = document.createElement('div');
    const refresh = refreshHandler(calculator, output);
    refresh('test');

    expect(output.textContent).toBe('test');
  });

  it('refreshHandler should update  outputWindow textContent with Calculator if null | undefined message', () => {
    const output = document.createElement('div');
    calculator.getExpression = jest.fn(() => 'test');
    const refresh = refreshHandler(calculator, output);

    refresh();

    expect(output.textContent).toBe('test');
  });
});
