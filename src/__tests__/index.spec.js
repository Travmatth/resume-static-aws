/* @flow */
/* eslint-env jest */

import { dispatch } from 'tests/utils';

describe('Home index page', () => {
  beforeEach(() => {
    document.body.innerHTML = require('../index.pug');
    require('../index');
    dispatch(document, 'DOMContentLoaded');
  });

  it('stub', () => expect(true).toBe(true));
});
