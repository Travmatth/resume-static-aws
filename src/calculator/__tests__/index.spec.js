/* @flow */
import * as Handlers from '../Handlers';
import { dispatch } from 'tests/utils';
import * as handlers from 'common/js/handlers';
import { GLYPHS } from '../Models';

jest.mock('../Handlers', () => ({
  dismissPopupHandler: jest.fn(),
  refreshHandlerCallback: jest.fn(),
  keyPressHandlerCallback: jest.fn(),
  get refreshHandler() {
    return this.refreshHandlerCallback;
  },
  get keyPressHandler() {
    return this.keyPressHandlerCallback;
  },
}));

describe('Calculator index', () => {
  beforeEach(() => {
    ((document.body: any): HTMLElement).innerHTML = require('../index.pug');
    require('../index.js');
    dispatch(document, 'DOMContentLoaded');
  });

  //$FlowIgnore
  afterEach(() => Handlers.keyPressHandlerCallback.mockReset());

  it('calculator buttons should be responsive to click events', () => {
    GLYPHS.forEach((glyph: string) => {
      dispatch(`button[data-key="${glyph}"]`, 'click');
    });

    //$FlowIgnore
    expect(Handlers.keyPressHandlerCallback).toHaveBeenCalledTimes(29);
  });

  it('calculator buttons should be responsive to touchstart events', () => {
    GLYPHS.forEach((glyph: string) => {
      dispatch(`button[data-key="${glyph}"]`, 'click');
    });
    //$FlowIgnore
    expect(Handlers.keyPressHandlerCallback).toHaveBeenCalledTimes(29);
  });
});
