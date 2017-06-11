/* @flow */
import { fetchHandler } from './Handlers';

if (document !== undefined) {
  document.addEventListener('DOMContentLoaded', () => {
    const fetch = fetchHandler(document.querySelector('ul'));
    const btn = ((document.querySelector('button'): any): HTMLElement);
    btn.addEventListener('click', fetch);
  });
}
