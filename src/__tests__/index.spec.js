/* @flow */

import { dispatch } from 'tests/utils';
import * as handlers from 'common/js/handlers';

jest.mock('common/js/handlers', () => ({
  registerToggle: jest.fn(),
}));

describe('Home index page', () => {
  beforeEach(() => {
    document.body.innerHTML = require('../index.pug');
    require('../index');
    dispatch(document, 'DOMContentLoaded');
  });

  it('page should register toggle handler', () => {
    dispatch(document.getElementById('projects-btn'), 'click');
    expect(handlers.registerToggle).toHaveBeenCalled();
  });
});
