/* @flow */
import { keyPressHandler } from './Handlers';

if (document !== undefined) {
  document.addEventListener('DOMContentLoaded', () => {
    const outputWindow: HTMLElement = (document.querySelector(
      'h2.window',
    ): any);

    document.querySelectorAll('[data-key]').forEach(el => {
      const keyPress = keyPressHandler(outputWindow);
      el.addEventListener('click', keyPress);
      el.addEventListener('touchstart', keyPress, { passive: true });
    });
  });
}
