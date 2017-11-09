/* @flow */

import {
  keypressHandler,
  searchHandler,
  randomHandler,
  showScene,
} from './Handlers';
import { eventType } from 'common/js/Utils';

if (typeof document !== 'undefined')
  document.addEventListener('DOMContentLoaded', () => {
    // Anchor point for appending the result tiles
    const node = document.querySelector('#content');
    const type = eventType();

    const spinner = document.querySelector('.spinner');
    const content = document.querySelector('#content');
    const error = document.querySelector('.error');
    const show = showScene(content, spinner, error);

    document.querySelector('input').onkeypress = keypressHandler(node, show);

    document
      .getElementById('random-btn')
      .addEventListener(type, randomHandler(window));

    document
      .getElementById('search-btn')
      .addEventListener(type, searchHandler(node, show));
  });
