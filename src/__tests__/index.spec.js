/* @flow */

import { dispatch } from 'tests/utils';
import * as utils from 'common/js/utils';

jest.mock('common/js/utils', () => ({
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
    expect(utils.registerToggle).toHaveBeenCalled();
  });
});
