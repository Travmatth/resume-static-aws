/* @flow */
import { fetchHandler } from './Handlers';

if (document !== undefined) {
  document.addEventListener('DOMContentLoaded', () => {
    const fetch = fetchHandler(document.querySelector('ul'));
    const btn = document.querySelector('button');
    btn.addEventListener('click', fetch);
  });
}
