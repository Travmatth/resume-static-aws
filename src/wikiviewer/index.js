/* @flow */

import { keypressHandler, searchHandler, randomHandler } from './Handlers';
import { eventType } from 'common/js/utils';

if (typeof document !== 'undefined')
  document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = ((document.getElementById(
      'search-btn',
    ): any): HTMLButtonElement);
    const randomBtn = ((document.getElementById(
      'random-btn',
    ): any): HTMLButtonElement);

    const input = document.querySelector('input');
    // Anchor point for appending the result tiles
    const node = document.querySelector('#content');

    input.onkeypress = keypressHandler(node);
    randomBtn.addEventListener(eventType(), randomHandler(window));
    searchBtn.addEventListener(eventType(), searchHandler(node));
  });
