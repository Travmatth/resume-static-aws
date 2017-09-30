/* @flow */
/* eslint-env jest */

import * as Handlers from '../Handlers';
import { dispatch } from 'tests/utils';

jest.mock('../Handlers', () => {
  const modules = {};

  modules.showSceneCallback = jest.fn();
  modules.showScene = () => modules.showSceneCallback;

  modules.searchHandlerCallback = jest.fn();
  modules.searchHandler = () => modules.searchHandlerCallback;

  modules.keypressHandlerCallback = jest.fn();
  modules.keypressHandler = () => modules.keypressHandlerCallback;

  modules.randomHandlerCallback = jest.fn();
  modules.randomHandler = () => modules.randomHandlerCallback;

  return modules;
});

describe('WikiViewer DOM', () => {
  beforeEach(() => {
    ((document.body: any): HTMLElement).innerHTML = require('../index.pug');
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
    //$FlowIgnore
    expect(Handlers.keypressHandlerCallback).toHaveBeenCalled();
  });

  it('search should have a click handler', () => {
    dispatch(document.getElementById('search-btn'), 'click');
    //$FlowIgnore
    expect(Handlers.searchHandlerCallback).toHaveBeenCalled();
  });

  it('random should have a click handler', () => {
    dispatch(document.getElementById('random-btn'), 'click');
    //$FlowIgnore
    expect(Handlers.randomHandlerCallback).toHaveBeenCalled();
  });
});
