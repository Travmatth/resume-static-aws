/* @flow */
import * as Handlers from '../Handlers';
import { dispatch } from 'common/utils';

const glyphs = [
  'SIN',
  'COS',
  'TAN',
  'LOG',
  'E',
  'PI',
  'LN2',
  'RAND',
  '9',
  '8',
  '7',
  '6',
  '5',
  '4',
  '3',
  '2',
  '1',
  '0',
  '(',
  ')',
  '^',
  '/',
  '*',
  '+',
  '-',
  '.',
  '=',
  'delete',
  'clear',
];

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
    document.body.innerHTML = require('../index.pug');
    require('../index.js');
    dispatch(document, 'DOMContentLoaded');
  });

  afterEach(() => Handlers.keyPressHandlerCallback.mockReset());

  it('calculator buttons should be responsive to click events', () => {
    glyphs.forEach((glyph: string) => {
      dispatch(`button[data-key="${glyph}"]`, 'click');
    });

    expect(Handlers.keyPressHandlerCallback).toHaveBeenCalledTimes(29);
  });

  it('calculator buttons should be responsive to touchstart events', () => {
    glyphs.forEach((glyph: string) => {
      dispatch(`button[data-key="${glyph}"]`, 'click');
    });
    expect(Handlers.keyPressHandlerCallback).toHaveBeenCalledTimes(29);
  });
});
