/* @flow */
/* eslint-env jest */

import { dispatch } from 'tests/utils';
import { registerToggle } from '../js/handlers';

describe('Shared event handlers', () => {
  it('registerToggle should set a toggle on dropdown element', () => {
    document.body.innerHTML = `
      <body>
        <p id="projects-btn"></p>
        <p class="dropdown"></p>
      </body>
    `;
    const button = document.getElementById('projects-btn');
    const target = document.querySelector('.dropdown');

    registerToggle(button, target);
    dispatch(button, 'click');

    expect(target.classList.contains('is-open')).toBe(true);
  });
});
