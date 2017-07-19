/* @flow */
import {
  keyPressHandler,
  refreshHandler,
  displayPopup,
  dismissPopupHandler,
} from '../Handlers';
import { dispatch } from 'tests/utils';

let win: HTMLElement;
const press = (key: string): Event => ({ target: { dataset: { key } } }: any);

describe('Calculator Handlers', () => {
  beforeEach(() => {
    ((document.body: any): HTMLElement).innerHTML = require('../index.pug');
    require('../index.js');
    dispatch(document, 'DOMContentLoaded');
    win = ((document.querySelector('.window'): any): HTMLElement);
  });

  afterEach(() => {
    jest.resetModules();
    keyPressHandler(win)(press('delete'));
  });

  it('dismissPopupHandler should toggle off .is-active on given element', () => {
    const el = document.createElement('div');
    el.classList.add('is-active');

    dismissPopupHandler(el)();

    expect(el.classList.contains('is-active')).toBe(false);
  });

  it('displayPopup should toggle .is-active on .modal element, and set given message as textContent on #error-modal', () => {
    document.body.innerHTML = `
      <div id="error-modal"></div>
      <div class="modal"></div>
    `;

    displayPopup('test');

    expect(document.querySelector('#error-modal').textContent).toBe('test');

    expect(
      document.querySelector('.modal').classList.contains('is-active'),
    ).toBe(true);
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
    const keypress = keyPressHandler(win);
    keypress(press('1'));
    keypress(press('+'));
    keypress(press('1'));
    keypress(press('='));
    expect(win.textContent).toBe('2');
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

  it('keyPressHandler should catch error message on parser', () => {
    document.body.innerHTML = `
      <div id="error-modal"></div>
      <div class="modal"></div>
    `;
    const errorMsg = 'Expected "(", [a-zA-Z], or real but "+" found.';

    const keypress = keyPressHandler(win);
    keypress(press('+'));
    keypress(press('='));

    expect(document.querySelector('#error-modal').textContent).toBe(errorMsg);
  });

  it('refreshHandler should update outputWindow textContent with msg', () => {
    const refresh = refreshHandler(win);
    refresh('test');

    expect(win.textContent).toBe('test');
  });

  it('refreshHandler should update  outputWindow textContent with Calculator if null | undefined message', () => {
    const refresh = refreshHandler(win);

    keyPressHandler(win)(press('1'));
    refresh();

    expect(win.textContent).toBe('1');
  });
});
