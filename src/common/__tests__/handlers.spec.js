/* @flow */
/* eslint-env jest */

import { dispatch } from 'tests/utils';
import { registerToggle } from '../js/Handlers';

describe('Shared event handlers', () => {
  it('registerToggle should set a toggle on dropdown element', () => {
    document.body.innerHTML = `
      <body>
        <p id='projects-btn'></p>
        <p class='dropdown-custom'></p>
      </body>
    `;
    const button = document.getElementById('projects-btn');
    const target = document.querySelector('.dropdown-custom');

    registerToggle(button, target);
    dispatch(button, 'click');

    expect(target.classList.contains('is-open')).toBe(true);
  });
});
