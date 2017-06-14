/* @flow */
import * as Handlers from '../Handlers';
import { dispatch } from 'tests/utils';

jest.mock('../Handlers', () => {
  const module = {};

  module.playerAction = jest.fn();
  module.makeAction = jest.fn();

  module.startGameHandlerCallback = jest.fn();
  module.startGameHandler = jest.fn(() => module.startGameHandlerCallback);

  module.chooseTurnHandlerCallback = jest.fn();
  module.chooseTurnHandler = jest.fn(() => module.chooseTurnHandlerCallback);

  module.resetGameHandlerCallback = jest.fn();
  module.resetGameHandler = jest.fn(() => module.resetGameHandlerCallback);

  module.restartGameHandlerCallback = jest.fn();
  module.restartGameHandler = jest.fn(() => module.restartGameHandlerCallback);

  module.startGameHandlerCallback = jest.fn();
  module.startGameHandler = jest.fn(() => module.startGameHandlerCallback);

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

  it('should render start view as initial view', () => {
    dispatch('.start', 'click');
    dispatch('.select:nth-child(1)', 'click');
    dispatch('.select:nth-child(2)', 'click');

    expect(Handlers.startGameHandlerCallback).toHaveBeenCalled();
    expect(Handlers.chooseTurnHandlerCallback).toHaveBeenCalledTimes(2);
  });
});
