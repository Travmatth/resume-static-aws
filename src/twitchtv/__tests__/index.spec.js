/* @flow */
import * as Handlers from '../Handlers';
import { dispatch } from 'tests/utils';

jest.mock('../Handlers', () => {
  const module = {};

  module.fetchHandlerCallback = jest.fn();
  module.fetchHandler = jest.fn(() => module.fetchHandlerCallback);

  module.toggleFilterCallback = jest.fn();
  module.toggleFilter = jest.fn(() => module.toggleFilterCallback);

  module.showSceneCallback = jest.fn();
  module.showScene = jest.fn(() => module.showSceneCallback);

  return module;
});

describe('TwitchTV page', () => {
  beforeEach(() => {
    ((document.body: any): HTMLElement).innerHTML = require('../index.pug');
    require('../index.js');
    dispatch(document, 'DOMContentLoaded');
  });

  afterEach(() => jest.clearAllMocks());

  it('should have filter all button', () => {
    dispatch(document.querySelector('#filter-all'), 'click');
    expect(Handlers.toggleFilterCallback).toHaveBeenCalledTimes(1);
  });

  it('should have filter online button', () => {
    dispatch(document.querySelector('#filter-online'), 'click');
    expect(Handlers.toggleFilterCallback).toHaveBeenCalledTimes(1);
  });

  it('should have filter offline button', () => {
    dispatch(document.querySelector('#filter-offline'), 'click');
    expect(Handlers.toggleFilterCallback).toHaveBeenCalledTimes(1);
  });

  it('should have a fetch button', () => {
    dispatch(document.querySelector('.fetch-streams'), 'click');
    expect(Handlers.fetchHandlerCallback).toHaveBeenCalled();
  });
});
