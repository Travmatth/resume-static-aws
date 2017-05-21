/* @flow */

import * as Handlers from '../Handlers';
import { ResponseError, dispatch } from 'common/utils';

jest.mock('../Handlers', () => {
  const modules = {};

  modules.searchHandlerCallback = jest.fn();
  modules.searchHandler = () => modules.searchHandlerCallback;

  modules.keypressHandlerCallback = jest.fn();
  modules.keypressHandler = () => modules.keypressHandlerCallback;

  modules.randomHandlerCallback = jest.fn();
  modules.randomHandler = () => modules.randomHandlerCallback;

  modules.typeHandlerCallback = jest.fn();
  modules.typeHandler = () => modules.typeHandlerCallback;

  return modules;
});

describe('WikiViewer DOM', () => {
  beforeEach(() => {
    document.body.innerHTML = require('../index.pug');
    require('../index.js');
    dispatch(document, 'DOMContentLoaded');
  });

  afterEach(() => {
    // last 3 tests won't pass when this is present, bug?
    // poss. interaction btw setting document.body.innerHTML and ???
    //jest.resetModules();
    jest.clearAllMocks();
  });

  it('searchText should have an onkeypress handler', () => {
    dispatch(
      document.getElementById('search-text'),
      new KeyboardEvent('keypress', { key: 'Enter', bubbles: true }),
    );
    expect(Handlers.keypressHandlerCallback).toHaveBeenCalled();
  });

  it('searchText should have an onchange handler', () => {
    dispatch(document.getElementById('search-text'), 'change');
    expect(Handlers.typeHandlerCallback).toHaveBeenCalled();
  });

  it('search should have a click handler', () => {
    dispatch(document.getElementById('search-btn'), 'click');
    expect(Handlers.searchHandlerCallback).toHaveBeenCalled();
  });

  it('random should have a click handler', () => {
    document.getElementById('random-btn').click();
    expect(Handlers.randomHandlerCallback).toHaveBeenCalled();
  });
});
