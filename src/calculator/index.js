/* @flow */
import { keyPressHandler } from './Handlers';
import { eventType } from 'common/js/utils';

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const outputWindow: HTMLElement = (document.querySelector(
      'h2.window',
    ): any);

    document.querySelectorAll('[data-key]').forEach(el => {
      el.addEventListener(eventType(), keyPressHandler(outputWindow));
    });
  });
}
