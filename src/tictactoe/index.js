/* @flow */

import { Game } from './Models';
import { Side, scenes } from './tictactoe.types';
import { eventType } from 'common/js/utils';
import {
  // Helpers
  showScene,
  update,
  // Starting View
  startGameHandler,
  chooseTurnHandler,
  // Game View
  playerAction,
  rollbackHandler,
  // Score View
  resetGameHandler,
  restartGameHandler,
} from './Handlers';

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    const type = eventType();
    const rowLength = 3;
    let tile: HTMLElement;
    const tiles = document.querySelectorAll('.game-tile');
    const refresh = update(tiles);

    // Start View Setup
    document.querySelectorAll('.select-btn').forEach(el => {
      if (!el.dataset) el.dataset = {};

      el.dataset.glyph = el.textContent.includes('X') ? Side.X : Side.O;

      el.addEventListener('click', chooseTurnHandler(game));
    });

    const start = startGameHandler(game, refresh, showScene);
    document.querySelector('.start').addEventListener(type, start);

    // Game View Setup
    for (let x of Array(3).keys()) {
      for (let y of Array(3).keys()) {
        tile = tiles.item(x * rowLength + y);
        if (!tile.dataset) tile.dataset = {};

        tile.dataset.x = `${x}`;
        tile.dataset.y = `${y}`;

        const action = playerAction(game, refresh, showScene);
        tile.addEventListener(type, action);
      }
    }

    document
      .querySelector('#undo')
      .addEventListener(type, rollbackHandler(game, refresh));

    // Score View Setup
    document.querySelector('#restart', restartGameHandler(game, showScene));
    document.querySelector('#reset', resetGameHandler(game, showScene));

    // Start scenes by making first visible
    showScene(scenes.start);
  });
}
