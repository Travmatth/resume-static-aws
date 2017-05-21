/* @flow */
import { keyPressHandler, refreshHandler } from '../Handlers';
import { dispatch } from 'common/utils';

let win: HTMLElement;
const err = 'Expected "(", [a-zA-Z], or real but end of input found.';
const press = (key: string) => ({ target: { dataset: { key } } });

describe('Calculator Handlers', () => {
  beforeEach(() => {
    document.body.innerHTML = require('../index.pug');
    require('../index.js');
    dispatch(document, 'DOMContentLoaded');
    win = document.querySelector('.window');
  });

  afterEach(() => {
    jest.resetModules();
    keyPressHandler(win)(press('delete'));
  });

  it('keyPressHandler should update state on number keys', () => {
    keyPressHandler(win)(press('1'));
    expect(win.textContent).toBe('1');
  });

  it('keyPressHandler should update state on function keys', () => {
    keyPressHandler(win)(press('SIN'));
    expect(win.textContent).toBe('SIN(');
  });

  it("keyPressHandler should refresh window on '=' key", () => {
    keyPressHandler(win)(press('='));
    expect(win.textContent).toBe(err);
  });

  it("keyPressHandler should clear logic & refresh on 'clear' key", () => {
    const keyPress = keyPressHandler(win);
    keyPress(press('1'));
    keyPress(press('2'));
    keyPress(press('clear'));

    expect(win.textContent).toBe('1');
  });

  it("keyPressHandler should delete logic & refresh on 'delete' key", () => {
    const keyPress = keyPressHandler(win);
    keyPress(press('1'));
    keyPress(press('2'));
    keyPress(press('delete'));

    expect(win.textContent).toBe('');
  });

  it('refreshHandler should allow for a null outputWindow', () => {
    const refresh = refreshHandler();
    refresh();

    expect(win.textContent).toBe('');
  });

  it('refreshHandler should update outputWindow textContent with msg', () => {
    const refresh = refreshHandler(win);
    refresh('test');

    expect(win.textContent).toBe('test');
  });

  it('refreshHandler should update  outputWindow textContent with LogicUnit if null | undefined message', () => {
    const refresh = refreshHandler(win);

    keyPressHandler(win)(press('1'));
    refresh();

    expect(win.textContent).toBe('1');
  });
});
