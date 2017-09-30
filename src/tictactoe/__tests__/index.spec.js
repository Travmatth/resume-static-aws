/* @flow */
/* eslint-env jest */

import * as Handlers from '../Handlers';
import { dispatch } from 'tests/utils';

jest.mock('../Handlers', () => {
  const module = {};

  module.playerAction = jest.fn();
  module.makeAction = jest.fn();

  module.chooseTurnHandlerCallback = jest.fn();
  module.chooseTurnHandler = jest.fn(() => module.chooseTurnHandlerCallback);

  module.resetGameHandlerCallback = jest.fn();
  module.resetGameHandler = jest.fn(() => module.resetGameHandlerCallback);

  module.playerActionCallback = jest.fn();
  module.playerAction = jest.fn(() => module.playerActionCallback);
  module.updateCallback = jest.fn();
  module.update = jest.fn(() => module.updateCallback);

  module.restartGameHandlerCallback = jest.fn();
  module.restartGameHandler = jest.fn(() => module.restartGameHandlerCallback);

  module.rollbackHandlerCallback = jest.fn();
  module.rollbackHandler = jest.fn(() => module.rollbackHandlerCallback);

  return module;
});

describe('TicTacToe page', () => {
  beforeEach(() => {
    ((document.body: any): HTMLElement).innerHTML = require('../index.pug');
    require('../index.js');
    dispatch(document, 'DOMContentLoaded');
  });

  describe('Start View', () => {
    it('select buttons should have event listeners', () => {
      document
        .querySelectorAll('.select-btn')
        .forEach(el => dispatch(el, 'click'));

      expect(Handlers.chooseTurnHandlerCallback).toHaveBeenCalledTimes(2);
    });

    it('undo button should have event listeners', () => {
      dispatch('#undo', 'click');
      expect(Handlers.rollbackHandlerCallback).toHaveBeenCalled();
    });
  });

  describe('Play View', () => {
    it('should create game squares and event listener', () => {
      const tiles = document.querySelectorAll('.game-tile');

      for (let column of Array(3).keys()) {
        for (let row of Array(3).keys()) {
          const index = column * 3 + row;
          const tile = tiles.item(index);
          const { x, y } = tile.dataset;
          dispatch(tile, 'click');

          expect(x).toBe(`${column}`);
          expect(y).toBe(`${row}`);
        }
      }

      expect(Handlers.playerActionCallback).toHaveBeenCalledTimes(9);
    });

    it('undo button should have attached event listener', () => {
      dispatch('#undo', 'click');
      expect(Handlers.rollbackHandlerCallback).toHaveBeenCalled();
    });
  });

  describe('Score View', () => {
    it('should create restart and reset buttons with attached handler', () => {
      dispatch('#restart', 'click');
      dispatch('#reset', 'click');
      expect(Handlers.rollbackHandlerCallback).toHaveBeenCalledTimes(2);
    });
  });
});
