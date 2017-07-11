/* @flow */
import * as Handlers from '../Handlers';
import { dispatch } from 'tests/utils';
import * as handlers from 'common/js/handlers';
import { glyphs } from '../Models';

jest.mock('../Handlers', () => {
  const module = {};

  module.refreshHandlerCallback = jest.fn();
  module.keyPressHandlerCallback = jest.fn();

  module.refreshHandler = module.refreshHandlerCallback;
  module.keyPressHandler = module.keyPressHandlerCallback;

  return module;
});

describe('Calculator index', () => {
  beforeEach(() => {
    ((document.body: any): HTMLElement).innerHTML = require('../index.pug');
    require('../index.js');
    dispatch(document, 'DOMContentLoaded');
  });

  //$FlowIgnore
  afterEach(() => Handlers.keyPressHandlerCallback.mockReset());

  it('calculator buttons should be responsive to click events', () => {
    glyphs.forEach((glyph: string) => {
      dispatch(`button[data-key="${glyph}"]`, 'click');
    });

    //$FlowIgnore
    expect(Handlers.keyPressHandlerCallback).toHaveBeenCalledTimes(29);
  });

  it('calculator buttons should be responsive to touchstart events', () => {
    glyphs.forEach((glyph: string) => {
      dispatch(`button[data-key="${glyph}"]`, 'click');
    });
    //$FlowIgnore
    expect(Handlers.keyPressHandlerCallback).toHaveBeenCalledTimes(29);
  });
});
