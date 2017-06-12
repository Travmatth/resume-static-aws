/* @flow */
import { keyPressHandler } from './Handlers';
import { eventType } from 'common/utils';

if (document !== undefined) {
  document.addEventListener('DOMContentLoaded', () => {
    const outputWindow: HTMLElement = (document.querySelector(
      'h2.window',
    ): any);

    document.querySelectorAll('[data-key]').forEach(el => {
      el.addEventListener(eventType(), keyPressHandler(outputWindow));
    });
  });
}
